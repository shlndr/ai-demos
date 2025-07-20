import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trainStatus, setTrainStatus] = useState('');
  const [trainLoading, setTrainLoading] = useState(false);

  const handlePredict = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setPrediction(null);
    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input })
      });
      const data = await res.json();
      setPrediction(data.prediction || data.error || 'Error');
    } catch (e) {
      setPrediction('Error: Could not reach backend.');
    }
    setLoading(false);
  };

  const handleTrain = async () => {
    setTrainLoading(true);
    setTrainStatus('');
    try {
      const res = await fetch('http://localhost:8000/train', { method: 'POST' });
      const data = await res.json();
      setTrainStatus(data.status || data.error || 'Error');
    } catch (e) {
      setTrainStatus('Error: Could not reach backend.');
    }
    setTrainLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: 400, maxWidth: '95vw', padding: 32 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#2d3748', letterSpacing: 1 }}>📦 MLOps Spam Classifier</h2>
        <div style={{ marginBottom: 24 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter message to classify (spam or ham)"
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15, outline: 'none' }}
            disabled={loading}
            onKeyDown={e => e.key === 'Enter' && handlePredict()}
          />
          <button
            onClick={handlePredict}
            disabled={loading || !input.trim()}
            style={{ marginTop: 12, width: '100%', background: '#3182ce', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
        {prediction && (
          <div style={{ textAlign: 'center', marginBottom: 24, fontSize: 18 }}>
            <b>Prediction:</b> {prediction}
          </div>
        )}
        <button
          onClick={handleTrain}
          disabled={trainLoading}
          style={{ width: '100%', background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 15, cursor: trainLoading ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginBottom: 12 }}
        >
          {trainLoading ? 'Retraining...' : 'Retrain Model'}
        </button>
        {trainStatus && (
          <div style={{ textAlign: 'center', color: '#3182ce', fontSize: 15 }}>{trainStatus}</div>
        )}
        <div style={{ marginTop: 24, color: '#4f4f4f', fontSize: 15, textAlign: 'center', background: '#f7f8fa', borderRadius: 8, padding: 12, border: '1px solid #ececec' }}>
          <b>How it works:</b> Enter a message and click Predict to classify as spam or ham. Click Retrain Model to retrain and log a new model to MLflow.
        </div>
      </div>
    </div>
  );
}

export default App; 