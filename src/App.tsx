import React, { useEffect } from 'react';
import { DatePicker } from 'antd'
import './App.less'
import { getCurrentLocation } from './utils'


function App(): JSX.Element {
  const userLocation: string | null = sessionStorage.getItem('location');


  // get users current location
  useEffect(() => {
    getCurrentLocation()
    return () => {
    }
  }, [userLocation])


  return (
    <div className="App">
      <div className="App">
        <h1>antd version</h1>
        <DatePicker />
      </div>,
    </div>
  );
}

export default App;
