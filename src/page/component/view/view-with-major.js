import {Flex, Icon} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {serviceHust} from "../../../utils/service";
import {Input, Space, Table} from "antd";
import {showToast} from "../../../utils/helper";
import {MdDelete, MdEdit} from "react-icons/md";
import ModalCreateMajor from "../admin/major/modal-create-major";

const {Search} = Input;

const ViewWithMajor = ({isModalOpen, setIsModalOpen, isAdmin}) => {
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [response, setResponse] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const pageSize = 5;
    const [pagination, setPagination] = useState({pageSize: 5, current: 1});
    const [record, setRecord] = useState({});

    const columns = isAdmin ? [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên chuyên ngành',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a style={{fontWeight: 500, textDecoration: "underline"}}
                                 onClick={() => window.location.href = "/major/" + text.id}>{text.value}</a>,
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
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Icon className={"_icon_"} fontSize={20} cursor={"pointer"} onClick={() => {
                        setIsModalOpen(true);
                        setRecord({
                            action: 'EDIT',
                            data: record
                        });
                    }} as={MdEdit}/>
                    <Icon className={"_icon_"} fontSize={20} cursor={"pointer"} onClick={() => {
                        setIsModalOpen(true);
                        setRecord({
                            action: 'DELETE',
                            data: record
                        });
                    }} as={MdDelete}/>
                </Space>
            ),
        },
    ] : [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên chuyên ngành',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a style={{fontWeight: 500, textDecoration: "underline"}}
                                 onClick={() => window.location.href = "/major/" + text.id}>{text.value}</a>,
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
        }
    ]

    const findAllFaculty = () => {
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
                content: entity
            }));
            setFaculties(formattedData);
        }).catch(err => {
            setLoading(false);
            showToast({
                content: err?.message,
                status: 'error'
            });
        });
    }

    useEffect(() => {
        findAllFaculty();
    }, [name, pageIndex, pageSize]);

    const onSearchSchool = (value) => {
        if (name === value) return;
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
                       dataSource={faculties}/>
            </Flex>
            <ModalCreateMajor isModalOpen={isModalOpen}
                              record={record}
                              refresh={findAllFaculty}
                              setIsModalOpen={setIsModalOpen}/>
        </Flex>
    )
}

export default ViewWithMajor;

