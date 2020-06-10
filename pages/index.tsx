import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Input, Row, Col, Slider, Button, InputNumber } from 'antd'
import './index.less'
import MainLayout from '../layouts/main'
import { getCurrentLocation, getLocationFromStorage } from '../utils/index'

interface ISchema {
    lat?: number,
    lng?: number,
    radius?: number
}


export default function Home(): JSX.Element {
    const [inputValue, setInputValue] = useState<number>(5);
    const [schema, setSchema] = useState<ISchema>({})
    const router = useRouter()

    fetch('/api').then((res) => {
        res.json().then((data) => console.log(data)).catch(err => console.error(err))
    })


    console.log("SCHEMA BOIZ /page/index L22", schema)
    // get users current location

    useEffect(() => {
        getCurrentLocation().then((data: ISchema) => setSchema(data))
        return () => {
        }
    }, [])

    const handlePersonalization = (): void => {
        router.push({
            pathname: '/example',
            query: { ...schema }
        })
    }



    // const savedLocation: string | null = getLocationFromStorage()
    // console.log("SAVE", savedLocation)
    // latitude: 5.5836672
    // longitude: -0.1769472
    // altitude: null
    // accuracy: 30041


    const onChange = value => {
        setInputValue(value)
        setSchema(Object.assign(schema, { radius: value }))
    };

    return (
        <MainLayout>
            <div style={{ marginTop: '10rem' }}></div>
            <h1>Find a Hospital Near you</h1>

            <Row gutter={2}>
                {/* <h6>How many kilometers far should we search:</h6> */}
                <h6>Tell us how much distance to cover</h6>
                <Col span={24}>
                    {/* <Input placeholder="20 KM" /> */}
                    <Row>
                        <Col span={12}>
                            <Slider
                                min={1}
                                max={25}
                                defaultValue={[0, 5]}
                                onChange={onChange}
                                value={typeof inputValue === 'number' ? inputValue : 0}
                            />
                        </Col>
                        <Col span={3}>
                            <InputNumber
                                min={1}
                                max={25}
                                style={{ margin: '0 16px' }}
                                value={inputValue}
                                onChange={onChange}
                            />
                        </Col>
                        <Col span={3}>
                            <Button onClick={handlePersonalization} type="primary">Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </MainLayout>

    )
}

type Data = any
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    console.log(ctx)
    const res = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=5.6364025,-0.1670703&radius=10000&type=hospital&key=AIzaSyB01cSQiXTGE7IorUIw0nOQ_TbEXN5fpqU')
    const data: Data = await res.json()

    // console.log(data)

    return {
        props: {
            data
        }
    }

}


