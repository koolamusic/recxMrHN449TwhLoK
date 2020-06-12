import React, { Suspense } from 'react'
import Fuse from 'fuse.js'
import { Avatar, Card } from 'antd';
import { Rate } from 'antd'
import { Row } from 'antd'
import { PhoneTwoTone, EllipsisOutlined, PushpinFilled } from '@ant-design/icons';
const { Meta } = Card;


export interface ICardData {
    icon: string
    place_id: string
    business_status: string
    id: string
    vicinity: string
    name: string
    types: Array<string>
    rating: number
    opening_hours: {
        open_now: boolean
    }
    photos?: Array<object>
    plus_code?: {
        compound_code: string,
        global_code: string
    }
    geometry?: {
        location: object
    }
    reference?: string
    user_ratings_total?: number

}

interface IResultCard {
    data: Array<ICardData>,
    display: boolean,
    query: string // search query
}
const ResultCard: React.FC<IResultCard> = ({ data, display, query }): JSX.Element => {
    // Initialize Fuse with the Options key for fuzzy search
    const fuse = new Fuse(data, {
        keys: ['name', 'vicinity', 'types'],
        includeScore: true
    })

    const result: Fuse.FuseResult<ICardData[]> | any = fuse.search(query).slice(0, 12)
    console.log(result)

    return (
        <>
            <Row justify="center">
                {result.length > 1 ? result.map((res, idx) => {
                    return (

                        <Card
                            key={[res.item.id, res.item.place_id, idx].join('_')}
                            style={{ minWidth: '320px', width: 320, margin: '.3rem', boxShadow: "11px 2px 21px rgba(0,0,0,0.031)", cursor: 'pointer' }}
                            loading={display}
                            actions={[
                                <PhoneTwoTone key="call" />,
                                <a target="_blank" href={`https://www.google.com/maps/place/${res.item.name}/@${res.item.geometry.location.lat},${res.item.geometry.location.lng}`}><PushpinFilled key="pin" /></a>,
                                <a target="_blank" href={`https://www.google.com/maps/place/${res.item.name}/@${res.item.geometry.location.lat},${res.item.geometry.location.lng}`}><EllipsisOutlined key="text" /></a>
                            ]}

                        >
                            <Meta
                                avatar={
                                    <Avatar src={res.item.icon} />
                                }
                                title={res.item.name}
                                description={
                                    <>
                                        <Rate disabled count={5} defaultValue={res.item.rating} />
                                        <p>{res.item.vicinity}</p>
                                        <h4>{res.item.types[0]}</h4>
                                        <p>{res.item.plus_code.compound_code}</p>
                                        <br />
                                        {/* <code>{Object.entries(place.geometry.location)}</code> */}
                                        {/* <p>{JSON.stringify(place.opening_hours)}</p> */}
                                        {/* <p>{JSON.stringify(place)}</p> */}
                                    </>
                                }
                            />

                        </Card>
                    )
                }) : data.map((place, idx) => {
                    return (

                        <Card
                            key={[place.id, place.place_id, idx].join('_')}
                            style={{ minWidth: '320px', width: 320, margin: '.3rem', boxShadow: "11px 2px 21px rgba(0,0,0,0.031)", cursor: 'pointer' }}
                            loading={display}
                        // actions={[
                        //     <PhoneTwoTone key="call" />,
                        //     <a target="_blank" href={`https://www.google.com/maps/place/${place.name}/@${place.geometry.location.lat},${place.geometry.location.lng}`}><PushpinFilled key="pin" /></a>,
                        //     <a target="_blank" href={`https://www.google.com/maps/place/${place.name}/@${place.geometry.location.lat},${place.geometry.location.lng}`}><EllipsisOutlined key="text" /></a>
                        // ]}

                        >
                            <Meta
                                // avatar={
                                //     <Avatar src={place.icon} />
                                // }
                                title={place.name}
                                description={
                                    <>
                                        <Rate disabled count={5} defaultValue={place.rating} />
                                        <p>{place.vicinity}</p>
                                        <h4>{place.types[0]}</h4>
                                        <p>{place.plus_code.compound_code}</p>
                                        <code>{Object.entries(place.geometry.location)}</code>

                                    </>
                                }
                            />

                        </Card>
                    )
                })}
            </Row>
        </>
    );
}


export default ResultCard