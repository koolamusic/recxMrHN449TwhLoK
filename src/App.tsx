import React, { useEffect } from 'react';
import { Input, } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

import './App.less'
import { getCurrentLocation, getLocationFromStorage } from './utils'


function App(): JSX.Element {
  const savedLocation: string | null = getLocationFromStorage()

  // get users current location
  useEffect(() => {
    getCurrentLocation()
    return () => {
    }
  }, [savedLocation])


  return (
    <main>
      <div className="App">
        <h1>Integrate Google API</h1>
        <Input placeholder="large size" prefix={<SearchOutlined />} />
      </div>

    </main>
  );
}

export default App;


