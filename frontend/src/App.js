// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // API call functions
  const runFlow = async () => {
    if (!prompt.trim()) { alert('Please enter a prompt!'); return; }
    setLoading(true); setAnswer('');
    try {
      const response = await fetch('http://localhost:5000/api/ask-ai', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({prompt}) });
      const data = await response.json();
      setAnswer(data.answer || 'No response received');
    } catch (error) { setAnswer('Error: '+error.message); }
    finally { setLoading(false); }
  };

  const saveFlow = async () => {
    if (!prompt.trim()) { alert('Enter prompt first!'); return; }
    if (!answer || loading) { alert('Run the flow first!'); return; }
    try {
      const response = await fetch('http://localhost:5000/api/save', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({prompt, answer}) });
      const data = await response.json();
      if (data.success) alert('Saved successfully!');
    } catch (error) { alert('Save failed: ' + error.message); }
  };

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column', background:'#f8f9fa' }}>
      <Header runFlow={runFlow} saveFlow={saveFlow} loading={loading} />
      <Canvas prompt={prompt} setPrompt={setPrompt} answer={answer} loading={loading} />
    </div>
  );
}

export default App;
