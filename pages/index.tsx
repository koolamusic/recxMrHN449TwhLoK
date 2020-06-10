import React from 'react'
import { GetServerSideProps } from 'next'
import { Input, Row, Col, Slider, Button, InputNumber } from 'antd'
import './index.less'
import MainLayout from '../layouts/main'

class IntegerStep extends React.Component {
    state = {
        inputValue: 5,
    };

    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };

    render() {
        const { inputValue } = this.state;
        return (
            <Row gutter={8}>
                <Col span={12}>
                    <Slider
                        min={1}
                        max={25}
                        defaultValue={[0, 5]}
                        onChange={this.onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={25}
                        style={{ margin: '0 16px' }}
                        value={inputValue}
                        onChange={this.onChange}
                    />
                </Col>
                <Col span={8}>
                    <Button type="primary">Search</Button>
                </Col>
            </Row>
        );
    }
}




export default function Home({ data }) {
    return (
        <MainLayout>
            <div style={{ marginTop: '10rem' }}></div>
            <h1>Integrate your Google Account</h1>
            {/* <h1>Find a {Hospital} Near you</h1> */}

            {/* <h6>How many kilometers far should we search:</h6> */}
            <Row>
                <h6>Tell us how much distance to cover</h6>
                <Col span={24}>
                    {/* <Input placeholder="20 KM" /> */}
                    <IntegerStep />


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


