import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">AgentSaaS-Pro</h1>
        <p className="text-xl mb-8">Your AI-Powered SaaS Solution</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
