import { Avatar } from 'antd';
import { Card } from 'antd';
import { Switch } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class ResultCard extends React.Component {
    state = {
        loading: true,
    };

    onChange = checked => {
        this.setState({ loading: !checked });
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                <Switch checked={!loading} onChange={this.onChange} />
                <Card
                    style={{ width: 300, marginTop: 16 }}
                    loading={loading}
                    actions={[
                        <SettingOutlined key="call" />,
                        <EditOutlined key="calendar" />,
                        <EllipsisOutlined key="text" />,
                    ]}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                >
                    <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description={
                            <p>"This is the description"</p>
                        }
                    />
                </Card>
            </>
        );
    }
}
