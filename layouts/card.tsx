import React, { Suspense } from 'react'
import { Avatar } from 'antd';
import { Card } from 'antd';
// import { Col } from 'antd'
import { Rate } from 'antd'
import { Row } from 'antd'
import { EditOutlined, PhoneTwoTone, EllipsisOutlined, PushpinFilled } from '@ant-design/icons';

const { Meta } = Card;

export default class ResultCard extends React.Component<any> {
    render() {
        const { data, display } = this.props;

        return (
            <>
                <Row justify="center">
                    {data.map((place, idx) => {
                        return (

                            <Card
                                key={[place.id, place.place_id, idx].join('_')}
                                style={{ minWidth: '320px', width: 320, margin: '.3rem', boxShadow: "11px 2px 21px rgba(0,0,0,0.031)", cursor: 'pointer' }}
                                loading={display}
                                actions={[
                                    <PhoneTwoTone key="call" />,
                                    <PushpinFilled key="pin" />,
                                    <a target="_blank" href={`ttps://www.google.com/maps/place/details/@${place.geometry.location.lat},${place.geometry.location.lng}`}><EllipsisOutlined key="text" /></a>
                                ]}

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
                                            {/* <p>{JSON.stringify(place.opening_hours)}</p> */}
                                            {/* <p>{JSON.stringify(place)}</p> */}
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
}
