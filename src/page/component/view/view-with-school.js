import {Flex, Icon} from "@chakra-ui/react";
import {Input, Space, Table} from 'antd';
import {useEffect, useState} from "react";
import {serviceHust} from "../../../utils/service";
import {useNavigate} from "react-router-dom";
import {MdDelete, MdEdit} from "react-icons/md";
import ModalCreateSchool from "../admin/school/modal-create-school";

const {Search} = Input;
const ViewWithSchool = ({isModalOpen, setIsModalOpen, isAdmin}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [record, setRecord] = useState({});

    const onSearchSchool = (value) => {
        setLoading(false);
        console.log(value);
    }

    const columns = isAdmin ? [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên trường (VI)',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a style={{fontWeight: 500, textDecoration: "underline"}}
                                 onClick={() => navigate("/school/" + text.id)}>{text.value}</a>,
        },
        {
            title: 'Tên trường (EN)',
            dataIndex: 'nameEn',
            key: 'nameEn',
        },
        {
            title: 'Mã trường',
            dataIndex: 'code',
            key: 'code',
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
            title: 'Tên trường (VI)',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a style={{fontWeight: 500, textDecoration: "underline"}}
                                 onClick={() => navigate("/school/" + text.id)}>{text.value}</a>,
        },
        {
            title: 'Tên trường (EN)',
            dataIndex: 'nameEn',
            key: 'nameEn',
        },
        {
            title: 'Mã trường',
            dataIndex: 'code',
            key: 'code',
        }
    ]

    useEffect(() => {
        findAllSchool();
    }, []);

    const findAllSchool = () => {
        serviceHust.findAllSchool().then(res => {
            const formattedData = res.map((entity, index) => ({
                index: index + 1,
                name: {
                    value: entity?.vnName,
                    id: entity?.id
                },
                nameEn: entity?.enName,
                code: entity?.abbreviations,
                content: entity
            }));
            setData(formattedData)
        });
    }

    return (
        <Flex w={"100%"} flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
            {/*<Search*/}
            {/*    rootClassName={"_search_button_"}*/}
            {/*    placeholder="Nhập tên trường"*/}
            {/*    enterButton="Tìm kiếm"*/}
            {/*    size="large" loading={loading}*/}
            {/*    onSearch={onSearchSchool}/>*/}
            <Flex w={"100%"} mt={30}>
                <Table pagination={{
                    ...{pageSize: 20, current: 1},
                }}
                       className={"_table_school_"} columns={columns} dataSource={data}/>
            </Flex>
            <ModalCreateSchool isModalOpen={isModalOpen}
                               record={record}
                               setRecord={setRecord}
                               refresh={findAllSchool}
                               setIsModalOpen={setIsModalOpen}/>
        </Flex>
    )
}

export default ViewWithSchool;