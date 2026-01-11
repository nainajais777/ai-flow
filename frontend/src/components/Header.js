//Header.js
import React from 'react';
export default function Header({ runFlow, saveFlow, loading }) {
  return (
    <div style={{ 
      padding: '16px 24px',
      background: 'white',
      borderBottom: '1px solid #e8eaed',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '500', color: '#202124' }}>
           AI Flow Assistant
        </h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={runFlow}
            disabled={loading}
            style={{
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: '500',
              background: loading ? '#e8eaed' : '#1a73e8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 1px 3px rgba(26,115,232,0.3)'
            }}
            onMouseOver={(e) => { if (!loading) e.target.style.background = '#1557b0'; }}
            onMouseOut={(e) => { if (!loading) e.target.style.background = '#1a73e8'; }}
          >
            {loading ? '⏳ Running...' : '▶️ Run Flow'}
          </button>

          <button 
            onClick={saveFlow}
            disabled={loading}
            style={{
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: '500',
              background: 'white',
              color: '#1a73e8',
              border: '1px solid #1a73e8',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: loading ? 0.5 : 1
            }}
            onMouseOver={(e) => { if (!loading) e.target.style.background = '#e8f0fe'; }}
            onMouseOut={(e) => { e.target.style.background = 'white'; }}
          >
            💾 Save
          </button>
        </div>
      </div>
    </div>
  );
}
