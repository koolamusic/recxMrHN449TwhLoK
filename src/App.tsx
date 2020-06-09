import React from 'react';
import { DatePicker, Button } from 'antd'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App">
        <h1>antd version</h1>
        <DatePicker />
        <Button type="primary" style={{ marginLeft: 8 }}>
          Primary Button
    </Button>
      </div>,
    </div>
  );
}

export default App;
