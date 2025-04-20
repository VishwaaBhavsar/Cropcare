"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, Image, X } from 'lucide-react';
import { marked } from 'marked';

const Chat = () => {
    const InitialMsg = {
        type: 'bot',
        content: 'Hello, I am a virtual assistant for farming, how can I help you today?',
    };

    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [chatHistory, setChatHistory] = useState([InitialMsg]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!message.trim() && !image) return;

        setChatHistory(prev => [...prev, {
            type: 'user',
            content: message,
            image: image
        }]);

        setIsLoading(true);

        try {
            const response = await fetch('/api/response', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: message.trim(),
                    history: chatHistory,
                    image: image
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            setChatHistory(prev => [...prev, {
                type: 'bot',
                content: data.response
            }]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory(prev => [...prev, {
                type: 'bot',
                content: "Sorry, I encountered an error. Please try again."
            }]);
        } finally {
            setIsLoading(false);
            setMessage('');
            setImage(null);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="w-full max-w-6xl mx-auto h-screen md:h-[90vh] relative bg-white rounded-lg shadow-2xl overflow-hidden mb-8">
            {/* Chat Messages */}
            <div
                ref={chatContainerRef}
                className="h-full p-4 pb-24 overflow-y-auto bg-gradient-to-b from-green-50 to-white"
            >
                {chatHistory.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-green-600 font-medium">Ask Cropcare about your plant issues</p>
                    </div>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div key={index} className={`mb-4 ${chat.type === 'user' ? 'text-right' : ''}`}>
                            <div
                                className={`inline-block p-4 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
                                    chat.type === 'user'
                                        ? 'bg-green-100 text-green-800 rounded-tr-none shadow-md'
                                        : 'bg-green-700 text-white rounded-tl-none shadow-md'
                                }`}
                            >
                                {chat.image && (
                                    <div className="mb-3">
                                        <img
                                            src={chat.image}
                                            alt="Uploaded plant"
                                            className="max-w-full rounded-lg shadow-sm"
                                        />
                                    </div>
                                )}
                                {chat.type === 'bot' ? (
                                    <div
                                        className="text-sm md:text-base leading-relaxed prose prose-sm prose-invert prose-p:my-1 max-w-full"
                                        dangerouslySetInnerHTML={{ __html: marked(chat.content) }}
                                    />
                                ) : (
                                    <p className="text-sm md:text-base leading-relaxed">{chat.content}</p>
                                )}
                            </div>
                            <div className={`text-xs text-gray-500 mt-1 ${chat.type === 'user' ? 'text-right mr-2' : 'ml-2'}`}>
                                {chat.type === 'user' ? 'You' : 'Cropcare'}
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-green-700 text-white p-3 rounded-lg rounded-tl-none shadow-md">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-12">
                <div className="flex flex-col">
                    {/* Image Preview */}
                    <div className={`image-preview-container mb-2 ${image ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'} transition-all duration-300`}>
                        {image && (
                            <div className="relative inline-block bg-white p-1 rounded-lg shadow-md">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="h-16 w-auto object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => setImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                                    aria-label="Remove image"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Input Field */}
                    <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-lg border border-green-200">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask Cropcare about your plants..."
                            className="flex-1 bg-transparent outline-none text-green-800 placeholder-green-600"
                        />
                        <button
                            onClick={triggerFileInput}
                            className="ml-2 bg-green-50 rounded-full p-2 text-green-700 hover:bg-green-100 transition-colors"
                            title="Upload plant image"
                        >
                            <Image size={16} />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!message.trim() && !image}
                            className={`ml-2 rounded-full p-2 text-white transition-colors ${
                                message.trim() || image
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-green-400 cursor-not-allowed'
                            }`}
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
