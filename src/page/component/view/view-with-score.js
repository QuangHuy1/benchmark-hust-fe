import {
    Flex,
    FormControl, FormLabel, Icon,
} from "@chakra-ui/react";
import {Input, Select, Slider, Space, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {tokenState, typeState, typeTestState} from "../../recoil";
import {showToast} from "../../../utils/helper";
import {serviceHust} from "../../../utils/service";
import {useLocation} from "react-router-dom";
import {GROUP_TYPES, YEARS} from "../../../utils/const";
import {MdDelete, MdEdit} from "react-icons/md";
import ModalCreateScore from "../admin/score/modal-create-score";
import MarkChart from "./mark-chart";

const ViewWithScore = ({isModalOpen, setIsModalOpen, isAdmin}) => {
    const location = useLocation();
    const {pathname} = location;
    const arrPath = pathname.split('/');
    const currentRoute = arrPath[arrPath.length - 1];
    const [mark, setMark] = useState([0, 30]);
    const [max, setMax] = useState(30);
    const [group, setGroup] = useState("");
    const [year, setYear] = useState("2023");
    const years = YEARS;
    const [groups, setGroups] = useState([])
    const groupTypes = GROUP_TYPES;
    const [groupType, setGroupType] = useState(0);
    const pageSize = 5;
    const [pageIndex, setPageIndex] = useState(1);
    const [pagination, setPagination] = useState({pageSize: 5, current: 1});
    const [data, setData] = useState([]);
    const [response, setResponse] = useState({});
    const [facultyId, setFacultyId] = useState("");
    const [typeTest, setTypeTest] = useRecoilState(typeTestState)
    const type = useRecoilValue(typeState);
    const token = useRecoilValue(tokenState);
    const [record, setRecord] = useState({});
    const [expended, setExpended] = useState();
    const [facultyIds, setFacultyIds] = useState("");

    useEffect(() => {
        if (typeTest === 1) {
            setMark([0, 60]);
            setMax(60)
        } else {
            setMark([0, 30]);
            setMax(30)
        }
        serviceHust.findAllGroup({
            pageSize: 100,
            pageIndex: 1
        }).then(res => {
            const resultGroup = [{
                value: "",
                label: "Tất cả",
            }]
            res.map(data => {
                if (data.groupType === 'BASIC' && typeTest === 0) {
                    resultGroup.push({
                        value: data.code,
                        label: data.code,
                    })
                } else if (data.groupType === 'TSA' && typeTest === 1) {
                    resultGroup.push({
                        value: data.code,
                        label: data.code,
                    })
                }
            })
            setGroups(resultGroup);
            setGroup("");
        })
    }, [typeTest]);

    useEffect(() => {
        if (type === 3) {
            if (currentRoute === undefined) {
                return;
            }
            serviceHust.findAllFacultyBySchoolId(currentRoute).then(res => {
                let listIds = "";
                res?.faculties.map(data => {
                    listIds = data.id + "," + listIds
                })
                searchBenchmark(listIds);
            })
        } else if (type === 4) {
            searchBenchmark(currentRoute);
        } else {
            searchBenchmark();
        }
    }, [type, typeTest, facultyId, mark, year, group, pageIndex, pageSize]);

    useEffect(() => {
        console.log(facultyId)
        if (type === 3) {
            if (currentRoute === undefined) {
                return;
            }
            serviceHust.findAllFacultyBySchoolId(currentRoute).then(res => {
                let listIds = "";
                res?.faculties.map(data => {
                    listIds = data.id + "," + listIds
                })
                setFacultyId(listIds);
            })
        } else if (type === 4) {
            setFacultyId(currentRoute)
        }
    }, [type]);

    const searchBenchmark = (facultyId) => {
        serviceHust.searchBenchmark({
            groupType: typeTest === 0 ? 'BASIC' : 'TSA',
            facultyIds: facultyId,
            fromScore: mark[0],
            toScore: mark[1],
            years: year,
            groupCodes: group,
            pageSize: pageSize,
            pageIndex: pageIndex
        }).then(res => {
            setResponse(res);
            setData(res.content.map(((body, index) => ({
                key: body?.id,
                index: index + 1,
                major: body.faculty,
                mark: body.score,
                group: group !== "" ? [group] : body.groups,
                name: body?.school?.vnName,
                content: body
            }))))
        });
    }

    const columns = isAdmin ? [
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
            title: 'Điểm chuẩn',
            dataIndex: 'mark',
            key: 'mark',
            sorter: (a, b) => a.mark - b.mark,
            render: (text, record) => <Flex flexDir={"column"} justifyContent={"space-between"}>
                <Flex>
                    {text}
                </Flex>
                <Flex>
                    [<a onClick={() => {
                    setFacultyIds(record?.content?.facultyIds);
                    expend(record?.key);
                }}>{record?.key === expended ? "Ẩn thống kê" : "Xem thống kê"}</a>]
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
                                {tag}
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
            title: 'Tên ngành',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Điểm chuẩn',
            dataIndex: 'mark',
            key: 'mark',
            sorter: (a, b) => a.mark - b.mark,
            render: (text, record) => <Flex flexDir={"column"} justifyContent={"space-between"}>
                <Flex>
                    {text}
                </Flex>
                <Flex>
                    [<a onClick={() => {
                    setFacultyIds(record?.content?.facultyIds);
                    expend(record?.key);
                }}>{record?.key === expended ? "Ẩn thống kê" : "Xem thống kê"}</a>]
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
        }
    ]

    const handleChangeGroup = (value) => {
        setPageIndex(1);
        setPagination({pageSize: 5, current: 1});
        setGroup(value);
    }

    const handleChangeYear = (value) => {
        setPageIndex(1);
        setPagination({pageSize: 5, current: 1});
        setYear(value);
    }

    const handleMarkChange = (value) => {
        setPageIndex(1);
        setPagination({pageSize: 5, current: 1});
        setMark(value);
    };

    const handleMinInputChange = (e) => {
        setPageIndex(1);
        setPagination({pageSize: 5, current: 1});
        if (e.target.value.length === 0) {
            setMark([0, mark[1]]);
            return;
        }
        if (e.target.value > max) {
            showToast({
                content: 'Vui lòng chọn giá trị nhỏ hơn',
                status: 'error'
            });
            return;
        }
        if (e.target.value < 0) {
            setMark([0, mark[1]]);
            return;
        }
        setMark([e.target.value, mark[1]]);
    };

    const handleMaxInputChange = (e) => {
        setPageIndex(1);
        setPagination({pageSize: 5, current: 1});
        if (e.target.value.length === 0) {
            setMark([mark[0], 0]);
            return;
        }
        if (e.target.value < 0) {
            showToast({
                content: 'Vui lòng chọn giá trị lớn hơn',
                status: 'error'
            });
            return;
        }
        if (e.target.value > max) {
            setMark([mark[0], max]);
            return;
        }
        setMark([mark[0], e.target.value]);
    };

    const handleTableChange = (pagination) => {
        setPageIndex(pagination);
        setPagination(pagination);
    };

    const handleChangeGroupType = (value) => {
        setPageIndex(1);
        setPagination({pageSize: 5, current: 1});
        setGroupType(value);
        if (value === 'TSA') {
            setTypeTest(1);
        } else {
            setTypeTest(0);
        }
    }

    const OptionSelect = ({value, options, functionChange}) => {
        return (
            <Select style={{width: '100%'}} showSearch
                    value={value}
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

    const expend = (index) => {
        if (expended === index) setExpended(undefined);
        else setExpended(index);
    };

    return (
        <Flex w={"100%"} flexDir={"column"}>
            <Flex mb={30} w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                <Flex mr={30} w={"40%"}>
                    <Flex w={"100%"} flexDir={"column"}>
                        <FormControl mb={10}>
                            <FormLabel>Khoảng điểm</FormLabel>
                        </FormControl>
                        <Flex justifyContent='space-between' width='100%'>
                            <Input
                                rootClassName={"_input_mark_"}
                                type={'number'}
                                value={mark[0]}
                                onChange={handleMinInputChange}
                            />
                            <Slider className={"_range_mark_"}
                                    range
                                    max={max}
                                    min={0}
                                    value={mark}
                                    onChange={handleMarkChange}/>
                            <Input
                                rootClassName={"_input_mark_"}
                                type={'number'}
                                value={mark[1]}
                                onChange={handleMaxInputChange}
                            />
                        </Flex>
                    </Flex>
                </Flex>

                {isAdmin &&
                    <Flex mr={30} w={"20%"} flexDir={"column"}>
                        <FormControl mb={10}>
                            <FormLabel>Hình thức thi</FormLabel>
                        </FormControl>
                        <Flex width='100%'>
                            <OptionSelect value={groupType} options={groupTypes}
                                          functionChange={handleChangeGroupType}/>
                        </Flex>
                    </Flex>
                }

                <Flex mr={30} w={"20%"} flexDir={"column"}>
                    <FormControl mb={10}>
                        <FormLabel>Khối thi</FormLabel>
                    </FormControl>
                    <Flex width='100%'>
                        <Select
                            value={group}
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChangeGroup}
                            options={groups}
                        />
                    </Flex>
                </Flex>

                <Flex w={"20%"} flexDir={"column"}>
                    <FormControl mb={10}>
                        <FormLabel>Năm thi</FormLabel>
                    </FormControl>
                    <Flex width='100%'>
                        <Select
                            value={year}
                            style={{
                                width: "100%",
                            }}
                            onChange={handleChangeYear}
                            options={years}
                        />
                    </Flex>
                </Flex>
            </Flex>

            <Flex w={"100%"}>
                <Table className={"_table_school_"}
                       pagination={{
                           total: response.totalElements,
                           ...pagination,
                           onChange: handleTableChange, // Gọi hàm này khi người dùng thay đổi trang
                       }}
                       expandable={{
                           expandedRowRender: (record) => (
                               <Flex w={'100%'}>
                                   <MarkChart typeTest={typeTest} facultyIds={facultyIds}/>
                               </Flex>
                           ),
                       }}
                       expandedRowKeys={[expended]}
                       columns={columns}
                       dataSource={data}/>
            </Flex>
            <ModalCreateScore isModalOpen={isModalOpen}
                              record={record}
                              refresh={searchBenchmark}
                              setIsModalOpen={setIsModalOpen}/>
        </Flex>
    )
}

export default ViewWithScore;