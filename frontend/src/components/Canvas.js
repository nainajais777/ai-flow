import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export default function Canvas({ prompt, setPrompt, answer, loading }) {
  
  const nodes = [
    {
      id: '1',
      type: 'input',
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1a73e8' }}>
               Input Prompt
            </div>
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              style={{ width: '100%', padding: '5px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', outline: 'none', transition: 'border 0.3s' }}
              onFocus={(e) => e.target.style.border = '1px solid #1a73e8'}
              onBlur={(e) => e.target.style.border = '1px solid #ddd'}
            />
          </div>
        )
      },
      position: { x: 70, y: 100 }, 
      style: { background: 'white', border: '2px solid #1a73e8', padding: '16px', borderRadius: '8px', width: '280px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
    },
    {
      id: '2',
      type: 'output',
      data: { 
        label: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#34a853' }}>AI Response</div>
            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px', minHeight: '60px', maxHeight: '150px', overflow: 'auto', fontSize: '14px', lineHeight: '1.5', color: answer ? '#202124' : '#5f6368', textAlign: 'left' }}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', border: '2px solid #34a853', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  Thinking...
                </div>
              ) : answer ? answer : 'Your answer will appear here'}
            </div>
          </div>
        )
      },
      position: { x: 450, y: 100 },  
      style: { background: 'white', border: '2px solid #34a853', padding: '16px', borderRadius: '8px', width: '280px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
    }
  ];

  const edges = [{ id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#1a73e8', strokeWidth: 2 } }];

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition="bottom-left">
        <Background color="#e8eaed" gap={16} />
        <Controls style={{ button: { background: 'white', border: '1px solid #e8eaed' } }} />
      </ReactFlow>
    </div>
  );
}
