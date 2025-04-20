import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCdvK6u78OrrLW_zq543elg_GpGqEt5V6M" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "How does AI work?",
  });
  console.log(response.text);
}

await main();