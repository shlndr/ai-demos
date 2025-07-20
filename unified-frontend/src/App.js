import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import Classifier from './components/Classifier';
import Mlops from './components/Mlops';

const tabs = [
  { label: 'Chatbot', component: <Chatbot /> },
  { label: 'Predictive Dashboard', component: <Dashboard /> },
  { label: 'Medical Classifier', component: <Classifier /> },
  { label: 'MLOps Pipeline', component: <Mlops /> },
];

function App() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: 24 }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setSelected(i)}
            style={{
              padding: '16px 32px',
              border: 'none',
              borderBottom: selected === i ? '3px solid #6c63ff' : '3px solid transparent',
              background: 'none',
              fontWeight: selected === i ? 700 : 400,
              color: selected === i ? '#6c63ff' : '#333',
              cursor: 'pointer',
              fontSize: 18,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: 24 }}>{tabs[selected].component}</div>
    </div>
  );
}

export default App; 