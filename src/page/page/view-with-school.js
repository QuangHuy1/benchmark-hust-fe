import {Flex} from "@chakra-ui/react";
import {Input, Table} from 'antd';
import {useState} from "react";

const { Search } = Input;
const ViewWithSchool = () => {
    const [loading, setLoading] = useState(false);

    const onSearchSchool = (value) => {
        setLoading(false);
        console.log(value);
    }
    
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên trường',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mã trường',
            dataIndex: 'code',
            key: 'code',
        },
    ]
    
    const data = [
        {
            index: '1',
            name: "Trường Điện - Điện tử",
            code: 'ET',
        }
    ]

    return (
        <Flex w={"100%"} flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
            <Search
                rootClassName={"_search_button_"}
                placeholder="Nhập tên trường"
                enterButton="Tìm kiếm"
                size="large" loading={loading}
                onSearch={onSearchSchool}/>
            <Flex w={"100%"} mt={30}>
                <Table className={"_table_school_"} columns={columns} dataSource={data}/>
            </Flex>
        </Flex>
    )
}

export default ViewWithSchool;