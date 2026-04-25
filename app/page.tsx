"use client";
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setStatus('Working... The "Local Scout" is drafting your content...');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setStatus(data.message || 'Success! Post sent to WordPress as a Draft.');
    } catch (e) {
      setStatus('Error connecting to the engine.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Doylestown Auto Content Engine</h1>
        <p className="mb-6 text-gray-600 text-sm">Enter a service (ex: Audi Q5 Timing Chain) to generate a Kennedy-style blog and post it to your site.</p>
        <input 
          type="text" 
          className="w-full p-3 border rounded mb-4 text-black" 
          placeholder="Service or Repair Topic..." 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate & Post to WordPress'}
        </button>
        {status && <p className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-200">{status}</p>}
      </div>
    </div>
  );
}
