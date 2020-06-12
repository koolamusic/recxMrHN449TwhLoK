import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/main'
import ResultCard, { ICardData } from '../layouts/card'
import './styles.less'
import SearchField from '../layouts/searchfield'

/**
 * Initiatialize resource for maps service
 */
// Adapter.updateDefaults({ baseURL: 'http://localhost:3000' })

const ResultsCard = dynamic(() => import('../layouts/card'))

const Search: React.FC<any> = ({ data }): JSX.Element => {
    const [display, setDisplay] = useState(true);
    const [query, setQuery] = useState('')

    // Effect to manage the display for card items
    useEffect(() => {
        data !== undefined || data !== null ? setDisplay(false) : setDisplay(true)
    });


    const useFuse = (value: string): React.SetStateAction<string> => {
        setQuery(value)
        return value
    }
    const handleChange = (value: string): string => {
        setDisplay(true)
        useFuse(value)

        return value
    }
    // const result: Fuse.FuseResult<ICardData> | any = useFuse().then((data) => data)

    return (
        <MainLayout>
            <SearchField handleSearch={useFuse} handleChange={handleChange} />
            <ResultsCard data={data} display={display} query={query} />
        </MainLayout>
    )
}

interface Places<P> {
    results: Array<P[]>
}
// ICardData[]

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { query } = ctx

    // USE LINK
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${query.lat},${query.lng}&radius=${query.radius}&type=hospital&key=${process.env.GOOGLE_API_KEY}`);
    const places: Places<ICardData> = await res.json()

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