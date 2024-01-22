import {Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {serviceHust} from "../../../utils/service";
import {useNavigate} from "react-router-dom";
import {Input, Table} from "antd";
import {showToast} from "../../../utils/helper";

const { Search } = Input;

const ViewWithMajor = () => {
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [response, setResponse] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 5;
    const [pagination, setPagination] = useState({pageSize: 5, current: 1});

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên chuyên ngành',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a onClick={() => navigate("/major/" + text.id)}>{text.value}</a>,
        },
        {
            title: 'Mã chuyên ngành',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Trường',
            dataIndex: 'school',
            key: 'school',
        },
    ]

    useEffect(() => {
        serviceHust.findAllFaculty({
            name: name,
            pageSize: pageSize,
            pageIndex: pageIndex
        }).then(res => {
            setLoading(false);
            setResponse(res);
            const formattedData = res?.content?.map((entity, index) => ({
                index: index + 1,
                name: {
                    value: entity?.name,
                    id: entity?.id
                },
                code: entity?.code,
                school: entity?.school?.vnName,
            }));
            setFaculties(formattedData)
        }).catch(err => {
            setLoading(false);
            showToast({
                content: err?.message,
                status: 'error'
            });
        })
    }, [name, pageIndex, pageSize]);

    const onSearchSchool = (value) => {
        setLoading(true);
        setName(value);
        setPageIndex(1);
        setPagination({pageSize: 5, current: 1});
    }

    const handleTableChange = (pagination) => {
        setPageIndex(pagination);
        setPagination(pagination);
    };

    return (
        <Flex w={"100%"} flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
            <Search
                rootClassName={"_search_button_"}
                placeholder="Nhập tên chuyên ngành"
                enterButton="Tìm kiếm"
                size="large"
                loading={loading}
                onSearch={onSearchSchool}/>
            <Flex w={"100%"} mt={30}>
                <Table className={"_table_school_"}
                       pagination={{
                           total: response?.totalElements,
                           ...pagination,
                           onChange: handleTableChange, // Gọi hàm này khi người dùng thay đổi trang
                       }}
                       loading={loading}
                       columns={columns}
                       ataSource={faculties}/>
            </Flex>
        </Flex>
    )
}

export default ViewWithMajor;

