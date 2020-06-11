import { Input } from 'antd';
import { Row } from 'antd'
const { Search } = Input;


const SearchField: React.FC = (): JSX.Element => {
    return (
        <Row style={{
            width: '100vw',
            background: 'white',
            marginLeft: '-50px',
            padding: '50px',
            paddingTop: '60px',
            marginBottom: '50px',
            minHeight: '12rem'
        }}
            justify="center">

            <Search
                placeholder="Search for a Hospital"
                // style={{ maxWidth: 300 }}
                onSearch={value => console.log(value)}
                enterButton />
        </Row>
    )
}


export default SearchField