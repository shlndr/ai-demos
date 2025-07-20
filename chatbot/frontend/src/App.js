import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);
    setInput('');
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: 'bot', text: data.response }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Error: Could not reach backend.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ece9f7 0%, #cfd9df 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: 400, maxWidth: '90vw', padding: 32 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#4f4f4f', letterSpacing: 1 }}>💬 AI Chatbot</h2>
        <div style={{ minHeight: 240, maxHeight: 320, overflowY: 'auto', marginBottom: 16, padding: 8, background: '#f7f8fa', borderRadius: 8, border: '1px solid #ececec' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', margin: '8px 0' }}>
              <div style={{
                background: msg.from === 'user' ? '#6c63ff' : '#e0e7ff',
                color: msg.from === 'user' ? '#fff' : '#333',
                borderRadius: 16,
                padding: '10px 18px',
                maxWidth: '75%',
                fontSize: 15,
                boxShadow: msg.from === 'user' ? '0 2px 8px #6c63ff22' : '0 2px 8px #e0e7ff22'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '8px 0' }}>
              <div style={{ background: '#e0e7ff', color: '#333', borderRadius: 16, padding: '10px 18px', maxWidth: '75%', fontSize: 15, fontStyle: 'italic', opacity: 0.7 }}>
                <span className="typing-loader">
                  <span style={{ animation: 'blink 1s infinite' }}>Bot is typing</span>
                  <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                </span>
              </div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15, outline: 'none' }}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '0 24px', fontWeight: 600, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
          >
            Send
          </button>
        </div>
        <style>{`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default App; 