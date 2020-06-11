import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Input, Row, Col, Slider, Button, InputNumber } from 'antd'
import './styles.less'
import MainLayout from '../layouts/main'
import { getCurrentLocation, getLocationFromStorage } from '../utils/index'

interface ISchema {
    lat?: number,
    lng?: number,
    radius?: number
}


export default function Home(): JSX.Element {
    const [inputValue, setInputValue] = useState<number>(2);
    const [schema, setSchema] = useState<ISchema>({})
    const router = useRouter()

    console.log("SCHEMA BOIZ /page/index L22", schema)
    // get users current location

    useEffect(() => {
        getCurrentLocation().then((data: ISchema) => setSchema(Object.assign(data, { radius: 200 })))
        return () => {
        }
    }, [])

    const handlePersonalization = (): void => {
        router.push({
            pathname: '/search',
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
        setSchema(Object.assign(schema, { radius: value * 100 }))
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
                                max={20}
                                defaultValue={[0, 2]}
                                onChange={onChange}
                                value={typeof inputValue === 'number' ? inputValue : 0}
                            />
                        </Col>
                        <Col span={3}>
                            <InputNumber
                                min={1}
                                max={20}
                                style={{ margin: '0 16px' }}
                                value={inputValue}
                                onChange={onChange}
                            />
                        </Col>
                        <Col span={6}>
                            <Button onClick={handlePersonalization} type="primary">Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </MainLayout>

    )
}


