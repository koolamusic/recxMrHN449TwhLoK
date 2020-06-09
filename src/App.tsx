import React, { useEffect } from 'react';
import { Input, } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import request from 'request'

import './App.less'
import { getCurrentLocation, getLocationFromStorage } from './utils'
import { placesNearby } from './utils/placesnearby'
import { service } from './utils/places'

export const savedLocation: string | null = getLocationFromStorage()

function App(): JSX.Element {

  const accra = { lat: 5.6364025, lng: -0.1670703 };
  console.log(service)



  // get users current location
  // useEffect(() => {
  //   getCurrentLocation()
  //   return () => {
  //   }
  // }, [savedLocation])


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


