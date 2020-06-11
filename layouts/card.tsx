import React from 'react'
import { Avatar } from 'antd';
import { Card } from 'antd';
// import { Col } from 'antd'
import { Row } from 'antd'
import { Switch } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class ResultCard extends React.Component<any> {
    state = {
        loading: true,
    };

    onChange = checked => {
        this.setState({ loading: !checked });
    };

    render() {
        const { loading } = this.state;
        const { data } = this.props;

        return (
            <>
                <Switch checked={!loading} onChange={this.onChange} />
                <Row>
                    {data.map((place, idx) => {
                        return (

                            <Card
                                key={place.id}
                                style={{ width: 300, margin: '.1rem' }}
                                loading={loading}
                                actions={[
                                    <SettingOutlined key="call" />,
                                    <EditOutlined key="calendar" />,
                                    <EllipsisOutlined key="text" />,
                                ]}
                            // cover={
                            //     <img
                            //         alt="example"
                            //         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            //     />
                            // }
                            >
                                <Meta
                                    // avatar={
                                    //     <Avatar src={place.icon} />
                                    // }
                                    title={place.name}
                                    description={
                                        <>
                                            <p>{place.vicinity}</p>
                                            <p>{JSON.stringify(place)}</p>
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
