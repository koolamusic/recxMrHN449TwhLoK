import React, { useEffect } from 'react';
import { Input, } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
// import { Client, Status } from "@googlemaps/google-maps-services-js";
import { placesNearby } from './utils/gmaps/places/placesnearby'

import './App.less'
import { getCurrentLocation, getLocationFromStorage } from './utils'


function App(): JSX.Element {
  const savedLocation: string | null = getLocationFromStorage()

  // const client = new Client({})
  const accra = { lat: 5.6364025, lng: -0.1670703 };


  placesNearby({
    params: {
      type: 'hospital',
      location: accra,
      radius: 5000,
      key: "AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU",

    },
    timeout: 1000, // milliseconds
  })
    .then((r) => {
      if (r.data.status === 'OK') {
        console.log(r.data.results);
      } else {
        console.log(r.data.error_message);
      }
    })
    .catch((e) => {
      console.log(e);
    });

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


