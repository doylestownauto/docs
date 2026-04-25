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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '20px', fontFamily: 'sans-serif'}}>
      <div style={{backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%'}}>
        <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1e3a8a'}}>Doylestown Auto Content Engine</h1>
        <p style={{marginBottom: '24px', color: '#4b5563', fontSize: '14px'}}>Enter a repair topic to generate a Dan Kennedy style blog post for Audi/Porsche owners.</p>
        <input 
          type="text" 
          style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '16px', boxSizing: 'border-box'}} 
          placeholder="ex: Audi Q5 Timing Chain" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          style={{width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '4px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}
        >
          {loading ? 'Generating...' : 'Generate & Post to WordPress'}
        </button>
        {status && <p style={{marginTop: '16px', padding: '12px', backgroundColor: '#eff6ff', color: '#1e40af', fontSize: '12px', borderRadius: '4px', border: '1px solid #bfdbfe'}}>{status}</p>}
      </div>
    </div>
  );
}
