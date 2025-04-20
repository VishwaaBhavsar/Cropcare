import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = "gemini-2.0-flash"; // For image + text
const textOnlyModelName = "gemini-2.0-flash"; // For text-only

// System instruction for the regional crop advisor
const getSystemInstruction = () => [
  {
    role: 'user',
    parts: [{ 
      text: "You are Cropcare, a specialized agricultural AI assistant focusing on region-specific crop recommendations across different parts of India. Your expertise includes understanding different agricultural zones, climate patterns, soil types, and traditional farming practices throughout India. When asked about crops suitable for any specific region in India, you provide precise, accurate information tailored to that location's unique growing conditions. You format your output as clean, valid JSON when requested. Your responses are practical, scientifically accurate, and incorporate both modern agricultural science and traditional farming knowledge."
    }]
  },
  {
    role: 'model',
    parts: [{ 
      text: "I understand my role as Cropcare, a specialized agricultural assistant for India. I'll provide location-specific crop recommendations formatted as clean JSON when requested, considering each region's unique climate, soil conditions, and traditional farming practices. My responses will be scientifically accurate while respecting traditional agricultural knowledge."
    }]
  }
];

async function generateResponse(model, userMessage, history = [], image = null) {
  try {
    // Start with the system instruction
    const chatHistory = getSystemInstruction();
    
    // Add conversation history if needed
    if (history && history.length > 0) {
      for (const msg of history) {
        // Skip the initial greeting message
        if (msg.type === 'initial') continue;
        
        chatHistory.push({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      }
    }
    
    // Create the current user message parts
    const userMessageParts = [];
    
    // Add the text prompt
    if (userMessage && userMessage.trim()) {
      userMessageParts.push({ text: userMessage });
    } else if (image) {
      // Default text if only an image is provided
      userMessageParts.push({ text: "Please analyze this plant image." });
    }
    
    // Add the image if provided
    if (image) {
      if (!image.startsWith("data:image/")) {
        throw new Error("Invalid image format");
      }

      const imageData = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      userMessageParts.push({
        inlineData: {
          mimeType,
          data: imageData,
        }
      });
    }
    
    // Add the user message to chat history
    chatHistory.push({
      role: 'user',
      parts: userMessageParts
    });
    
    // Configure generation parameters for more consistent JSON output
    const generationConfig = {
      temperature: 0.1, // Very low temperature for consistent, structured output
      topK: 20,
      topP: 0.85,
      maxOutputTokens: 2048,
    };
    
    // Generate content
    const result = await model.generateContent({
      contents: chatHistory,
      generationConfig,
    });
    
    const response = result.response;
    
    // Extract text from response
    if (response && response.text && typeof response.text === 'function') {
      return response.text();
    }
    
    if (response?.candidates?.[0]?.content?.parts) {
      return response.candidates[0].content.parts.map(part => part.text).join('');
    }
    
    console.warn("Empty or unexpected response from Gemini");
    return "Sorry, I couldn't generate a helpful response at this time. Please try again.";
  } catch (error) {
    console.error("Error generating content:", error.message);
    return "Sorry, there was an error processing your request. Please try again later.";
  }
}

export async function POST(request) {
  try {
    const { prompt, history, image } = await request.json();
    
    // Check if the prompt includes JSON request keywords (for better handling)
    const isJsonRequest = prompt.toLowerCase().includes('json') || 
                          prompt.toLowerCase().includes('array');
    
    // Choose the appropriate model
    const model = image 
      ? genAI.getGenerativeModel({ model: modelName })
      : genAI.getGenerativeModel({ model: textOnlyModelName });
    
    // Generate response
    const responseText = await generateResponse(model, prompt, history, image);
    
    // For JSON requests, try to extract and validate JSON
    if (isJsonRequest) {
      try {
        // Check if we can extract valid JSON from the response
        const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (jsonMatch) {
          // Try parsing to validate
          JSON.parse(jsonMatch[0]);
          // If valid, just return the response as is
          return NextResponse.json({ response: responseText });
        }
      } catch (jsonError) {
        console.warn('JSON validation failed, returning raw response');
      }
    }
    
    // Return the regular response
    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response', details: error.message },
      { status: 500 }
    );
  }
}