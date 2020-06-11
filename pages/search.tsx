import { GetServerSideProps } from 'next'
import React from 'react'
import MainLayout from '../layouts/main'
import ResultCard from '../layouts/card'
import Adapter from '../utils/api'


/**
 * Initiatialize resource for maps service
 */
// Adapter.updateDefaults({ baseURL: 'http://localhost:3000' })
class Places extends Adapter.createResource('http://localhost:3000/api') { }



const Search: React.FC<any> = ({ data }): JSX.Element => {
    console.log(data, "WE ==================")
    return (
        <MainLayout>
            Search
            <ResultCard data={data} />
        </MainLayout>
    )
}

type Data = any

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { query } = ctx

    // USE LINK
    const res: Data = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${query.lat},${query.lng}&radius=${query.radius}&type=hospital&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU`);
    const places = await res.json()

    // const payload = await {
    //     lat: query.lat,
    //     lng: query.lng,
    //     radius: query.radius
    // }
    // console.log(payload, "PAYLOAD HERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
    return {
        props: {
            data: places.results
        }
    }
}

export default Search