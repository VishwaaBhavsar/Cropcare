"use client";

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    // Scroll to bottom of chat whenever history changes
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        
        // Add user message to chat history
        setChatHistory(prev => [...prev, { type: 'user', content: message }]);
        
        // Clear input field
        setMessage('');
        
        // Simulate response (replace with your actual API call)
        setIsLoading(true);
        setTimeout(() => {
            // This is where you would integrate your actual chatbot API
            setChatHistory(prev => [...prev, { 
                type: 'bot', 
                content: "This is a sample response. Connect your actual chatbot API here."
            }]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg min-h-screen mt-5 bg-white">
            {/* Chat Header */}
            <div className="bg-green-700 text-white p-4 flex items-center">
                <div className="text-xl font-bold flex items-center">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M15 3L12 5L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Cropcare
                </div>
                <div className="ml-auto flex space-x-2">
                    <button className="text-white px-4 py-1 rounded">Home</button>
                    <button className="text-white px-4 py-1 rounded flex items-center">
                        About us
                        <div className="h-8 w-8 rounded-full bg-green-600 ml-2 overflow-hidden">
                            <div className="bg-yellow-500 h-2 w-8"></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Chat Messages */}
            <div 
                ref={chatContainerRef}
                className="h-80 p-4 overflow-y-auto bg-gray-50"
            >
                {chatHistory.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">Ask Cropcare about your plant issues</p>
                    </div>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div key={index} className={`mb-4 ${chat.type === 'user' ? 'text-right' : ''}`}>
                            <div 
                                className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${
                                    chat.type === 'user' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-green-700 text-white'
                                }`}
                            >
                                {chat.content}
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-green-700 text-white p-3 rounded-lg">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{animationDelay: '0.4s'}}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-gray-200 border-t border-gray-300">
                <div className="flex items-center bg-green-100 rounded-full px-4 py-2">
                    <svg className="w-6 h-6 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask Cropcare"
                        className="flex-1 bg-transparent outline-none text-green-800 placeholder-green-600"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="ml-2 bg-white rounded-full p-2 text-green-700 hover:bg-green-50"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;