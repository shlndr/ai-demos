import React, { useState } from 'react';

function Classifier() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const handleUpload = async (e) => {
    const f = e.target.files[0];
    setFile(f);
    setResult('');
    setImgUrl(URL.createObjectURL(f));
    setLoading(true);
    const formData = new FormData();
    formData.append('file', f);
    try {
      const res = await fetch('http://localhost:8003/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setResult(data.result || data.error || 'Error');
    } catch (e) {
      setResult('Error: Could not reach backend.');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', width: 400, maxWidth: '90vw', padding: 32, margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#2d3748', letterSpacing: 1 }}>🏥 Medical Image Classifier</h2>
      <input type="file" accept="image/*" onChange={handleUpload} style={{ marginBottom: 16 }} />
      {imgUrl && <img src={imgUrl} alt="Uploaded" style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />}
      {loading && <div style={{ textAlign: 'center', color: '#3182ce', marginBottom: 16 }}>Classifying...</div>}
      {result && !loading && (
        <div style={{ textAlign: 'center', marginBottom: 24, fontSize: 18 }}>
          <b>Prediction:</b> {result}
        </div>
      )}
      <div style={{ marginTop: 24, color: '#4f4f4f', fontSize: 15, textAlign: 'center', background: '#f7f8fa', borderRadius: 8, padding: 12, border: '1px solid #ececec' }}>
        <b>How it works:</b> Upload an X-ray image to classify it using a pre-trained model (ResNet18/ImageNet demo).
      </div>
    </div>
  );
}

export default Classifier; 