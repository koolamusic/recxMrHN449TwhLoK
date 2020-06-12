import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Fuse from 'fuse.js'
import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/main'
import ResultCard, { ICardData } from '../layouts/card'
import './styles.less'
import SearchField from '../layouts/searchfield'
import Adapter from '../utils/api'


/**
 * Initiatialize resource for maps service
 */
// Adapter.updateDefaults({ baseURL: 'http://localhost:3000' })
class Places extends Adapter.createResource('api') { }



const Search: React.FC<any> = ({ data }): JSX.Element => {
    const [display, setdisplay] = useState(true);
    const [query, setQuery] = useState('')

    // Effect to manage the display for card items
    useEffect(() => {
        data !== undefined || data !== null ? setdisplay(false) : setdisplay(true)
    });


    const useFuse = (value: string): React.SetStateAction<string> => {
        console.log(value, 'FROM CONSOLE')
        console.log(query, 'JUST AFTER VALUE FROM CONSLE')
        setQuery(value)
        return value
    }
    const handleChange = (value: string): string => {
        setdisplay(true)
        useFuse(value)

        return value
    }
    // const result: Fuse.FuseResult<ICardData> | any = useFuse().then((data) => data)


    console.log("DISPLA", display)
    console.log(data, "WE ==================")
    return (
        <MainLayout>
            <SearchField handleSearch={useFuse} handleChange={handleChange} />
            <ResultCard data={data} display={display} query={query} />
        </MainLayout>
    )
}

type Data = any

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { query } = ctx

    // USE LINK
    const res: Data = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${query.lat},${query.lng}&radius=${query.radius}&type=hospital&key=${process.env.GOOGLE_API_KEY}`);
    const places = await res.json()

    // const payload = await {
    //     lat: query.lat,
    //     lng: query.lng,
    //     radius: query.radius
    // }
    return {
        props: {
            data: places.results
        }
    }
}

export default Search