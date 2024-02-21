import {
    Flex,
    FormControl, FormLabel, Icon,
} from "@chakra-ui/react";
import {Button, Input, Select, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {showToast} from "../../../utils/helper";
import {serviceHust} from "../../../utils/service";
import {FaArrowRightLong} from "react-icons/fa6";
import {RedoOutlined} from "@ant-design/icons";

const ViewWithRecommend = () => {
    const [mark, setMark] = useState(0);
    const [group, setGroup] = useState([]);
    const [groups, setGroups] = useState([])
    const [schools, setSchools] = useState([]);
    const [school, setSchool] = useState([]);
    const [pagination, setPagination] = useState({pageSize: 10, current: 1});
    const [data, setData] = useState([]);
    const [response, setResponse] = useState({});
    const [level1, setLevel1] = useState("");
    const [level2, setLevel2] = useState("");
    const [level3, setLevel3] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingRecommend, setLoadingRecommend] = useState(false);
    const MARK = "Điểm chuẩn dự kiến";
    const SCHOOL = "Lĩnh vực mong muốn";
    const GROUP = "Khối thi";

    const [options, setOptions] = useState([
        {
            value: MARK,
            label: MARK,
        },
        {
            value: SCHOOL,
            label: SCHOOL
        },
        {
            value: GROUP,
            label: GROUP
        }
    ])

    useEffect(() => {
        serviceHust.findAllGroup({
            pageSize: 100,
            pageIndex: 1
        }).then(res => {
            const formattedData = res.map((entity, index) => ({
                value: entity.code,
                label: entity.code,
                index: index + 1,
                name: entity?.code,
                id: entity?.code
            }));
            setGroups(formattedData);
        })
    }, []);

    useEffect(() => {
        serviceHust.findAllSchool().then(res => {
            const formattedData = res.map((entity, index) => ({
                index: index + 1,
                name: entity?.vnName,
                id: entity?.id
            }));
            setSchools(formattedData);
        })
    }, []);

    const refresh = () => {
        setLoading(true);
        setTimeout(() => {
            setOptions([
                {
                    value: MARK,
                    label: MARK,
                },
                {
                    value: SCHOOL,
                    label: SCHOOL
                },
                {
                    value: GROUP,
                    label: GROUP
                }
            ]);
            setLevel1("");
            setLevel2("");
            setLevel3("");
            setData([])
            setLoading(false);
        }, 1000);
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên ngành',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Điểm chuẩn trung bình 3 năm gần nhất',
            dataIndex: 'mark',
            key: 'mark',
            render: (text) => <Flex flexDir={"column"} justifyContent={"space-between"}>
                <Flex>
                    {text}
                </Flex>
                <Flex>
                    [<a> Xem thống kê</a>]
                </Flex>
            </Flex>,
        },
        {
            title: 'Khối thi',
            dataIndex: 'group',
            key: 'group',
            render: (_, {group}) => (
                <>
                    {group.map((tag) => {
                        let color = 'darkred';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Tên trường',
            dataIndex: 'name',
            key: 'name',
        },
    ]

    const handleChangeGroup = (value) => {
        setPagination({pageSize: 10, current: 1});
        setGroup(value);
    }

    const handleMarkChange = (e) => {
        setPagination({pageSize: 10, current: 1});
        if (e.target.value < 0) {
            showToast({
                content: 'Vui lòng chọn giá trị lớn hơn',
                status: 'error'
            });
            return;
        }
        setMark(e.target.value);
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const handleChangeSchool = (value) => {
        setPagination({pageSize: 10, current: 1});
        setSchool(value);
    }

    const handleChangeLevel1 = (value) => {
        setPagination({pageSize: 10, current: 1});
        setLevel1(value);
        const updatedOptions = options.filter(option => option.value !== value);
        // Gán lại mảng đã lọc cho biến options
        setOptions(updatedOptions);
    }

    const handleChangeLevel2 = (value) => {
        setPagination({pageSize: 10, current: 1});
        setLevel2(value);
        const updatedOptions = options.filter(option => option.value !== value);
        // Gán lại mảng đã lọc cho biến options
        setOptions(updatedOptions);
    }

    const handleChangeLevel3 = (value) => {
        setPagination({pageSize: 10, current: 1});
        setLevel3(value);
        const updatedOptions = options.filter(option => option.value !== value);
        // Gán lại mảng đã lọc cho biến options
        setOptions(updatedOptions);
    }

    const OptionSelect = ({value, options, functionChange}) => {
        return (
            <Select style={{width: '100%'}} showSearch
                    value={value}
                    mode="multiple"
                    onChange={functionChange}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLocaleLowerCase('vi').includes(input.toLocaleLowerCase('vi'))}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLocaleLowerCase('vi').localeCompare((optionB?.label ?? '').toLocaleLowerCase('vi'))
                    }
                    options={options?.map(data => ({
                        value: data?.id,
                        label: data?.name,
                    }))}
            >
            </Select>
        )
    }

    const recommend = () => {
        if (level1 === "" || level2 === "" || level3 === "") {
            showToast({
                content: 'Vui lòng nhập đẩy đủ mức độ ưu tiên',
                status: 'warning'
            });
            return;
        }
        if (mark <= 0) {
            showToast({
                content: 'Vui lòng nhập điểm chuẩn lớn hơn 0',
                status: 'warning'
            });
            return;
        }
        if (school.length === 0) {
            showToast({
                content: 'Vui lòng chọn lĩnh vực mong muốn',
                status: 'warning'
            });
            return;
        }
        if (group.length === 0) {
            showToast({
                content: 'Vui lòng chọn khối thi mong muốn',
                status: 'warning'
            });
            return;
        }
        const lv1 = (level1 === MARK && {
            "fieldName": "avgBenchmark",
            "avgBenchmark": mark,
            "priorityPoint": 3
        }) || (level1 === GROUP && {
            "fieldName": "groupCode",
            "groupCode": group,
            "priorityPoint": 3
        }) || (level1 === SCHOOL && {
            "fieldName": "schoolId",
            "schoolId": school,
            "priorityPoint": 3
        });

        const lv2 = (level2 === MARK && {
            "fieldName": "avgBenchmark",
            "avgBenchmark": mark,
            "priorityPoint": 2
        }) || (level2 === GROUP && {
            "fieldName": "groupCode",
            "groupCode": group,
            "priorityPoint": 2
        }) || (level2 === SCHOOL && {
            "fieldName": "schoolId",
            "schoolId": school,
            "priorityPoint": 2
        });

        const lv3 = (level3 === MARK && {
            "fieldName": "avgBenchmark",
            "avgBenchmark": mark,
            "priorityPoint": 1
        }) || (level3 === GROUP && {
            "fieldName": "groupCode",
            "groupCode": group,
            "priorityPoint": 1
        }) || (level3 === SCHOOL && {
            "fieldName": "schoolId",
            "schoolId": school,
            "priorityPoint": 1
        });

        const params = [
            lv1, lv2, lv3
        ]
        serviceHust.suggest(params).then(res => {
            setResponse(res);
            setData(res.map(((body, index) => ({
                index: index + 1,
                major: body?.facultyName,
                mark: body?.avgBenchmark,
                group: body?.groupCode,
                name: body?.schoolName,
                content: body
            }))))
        }).catch(err => {
            console.log(err);
            showToast({
                content: err?.message,
                status: 'error'
            });
        })
    }

    return (
        <Flex w={"100%"} flexDir={"column"}>
            <Flex mb={30} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <Flex w={"100%"}>
                    <Flex w={"100%"} flexDir={"column"}>
                        <FormControl>
                            <FormLabel>Điểm chuẩn dự kiến</FormLabel>
                        </FormControl>
                        <Flex justifyContent='space-between' width='100%'>
                            <Input
                                type={'number'}
                                value={mark}
                                onChange={handleMarkChange}
                            />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex w={"15%"}></Flex>

                <Flex w={"100%"} flexDir={"column"}>
                    <FormControl>
                        <FormLabel>Lĩnh vực mong muốn</FormLabel>
                    </FormControl>
                    <Flex width='100%'>
                        <OptionSelect value={school} options={schools} functionChange={handleChangeSchool}/>
                    </Flex>
                </Flex>

                <Flex w={"15%"}></Flex>

                <Flex w={"100%"} flexDir={"column"}>
                    <FormControl>
                        <FormLabel>Khối thi</FormLabel>
                    </FormControl>
                    <Flex width='100%'>
                        <OptionSelect value={group} options={groups} functionChange={handleChangeGroup}/>
                    </Flex>
                </Flex>
            </Flex>

            <Flex mb={30} w="100%" flexDir={"column"}>
                <FormControl>
                    <FormLabel>
                        <Flex alignItems={"center"}>
                            <Flex mr={5}>
                                Thứ tự ưu tiên
                            </Flex>
                            <Button onClick={refresh} icon={<RedoOutlined/>} loading={loading}></Button>
                        </Flex>
                    </FormLabel>
                </FormControl>
                <Flex width={'100%'} justifyContent={"center"} alignItems={"center"}>
                    <Flex w={"100%"}>
                        <Select style={{
                            width: '100%',
                        }}
                                options={options}
                                value={level1}
                                onChange={handleChangeLevel1}/>
                    </Flex>
                    <Icon w={"5%"} fontSize={26} cursor={"pointer"} as={FaArrowRightLong}/>
                    <Flex w={"100%"}>
                        <Select style={{
                            width: '100%',
                        }}
                                options={options}
                                value={level2}
                                onChange={handleChangeLevel2}/>
                    </Flex>
                    <Icon w={"5%"} fontSize={26} cursor={"pointer"} as={FaArrowRightLong}/>
                    <Flex w={"100%"}>
                        <Select style={{
                            width: '100%',
                        }}
                                options={options}
                                value={level3}
                                onChange={handleChangeLevel3}/>
                    </Flex>
                </Flex>
            </Flex>

            <Flex mb={30} w={'100%'} justifyContent={"center"} alignItems={"center"}>
                <Button onClick={recommend} loading={loadingRecommend} style={{width: '30%', fontWeight: 1000}}>BẮT ĐẦU
                    GỢI Ý</Button>
            </Flex>

            <Flex w={"100%"}>
                <Table className={"_table_school_"}
                       pagination={{
                           total: response.totalElements,
                           ...pagination,
                           onChange: handleTableChange, // Gọi hàm này khi người dùng thay đổi trang
                       }}
                       columns={columns}
                       dataSource={data}/>
            </Flex>

        </Flex>
    )
}

export default ViewWithRecommend;