import React, { useState } from 'react';
import { sendAgentCommand } from '../lib/agentClient';

const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<string>('Hello! How can I help you today?');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse('Thinking...');
    try {
      const res = await sendAgentCommand(input);
      setResponse(res.response);
      setInput('');
    } catch (error) {
      console.error('Error sending command:', error);
      setResponse('Error: Could not process your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-80">
      <h2 className="text-xl font-bold mb-2">AI Chatbot</h2>
      <div className="border border-gray-300 p-3 h-32 overflow-y-auto mb-3 rounded-md bg-gray-50">
        <p className="text-sm text-gray-700">{response}</p>
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-r-md text-sm font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
