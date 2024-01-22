import {
    Flex,
    FormControl, FormLabel,
} from "@chakra-ui/react";
import {Input, Select, Slider, Table, Tag} from "antd";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {typeState, typeTestState} from "../../recoil";
import {showToast} from "../../../utils/helper";
import {serviceHust} from "../../../utils/service";
import {useLocation} from "react-router-dom";
import {GROUP_TYPES, YEARS} from "../../../utils/const";

const ViewWithScore = () => {
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

    useEffect(() => {
        if (typeTest === 1) {
            setMark([0, 40]);
            setMax(40)
        } else {
            setMark([0, 30]);
            setMax(30)
        }
        serviceHust.findAllGroup().then(res => {
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

    useEffect(() => {
        serviceHust.searchBenchmark({
            groupType: typeTest === 0 ? 'BASIC' : 'TSA',
            facultyIds: facultyId,
            fromScore: mark[0],
            toScore: mark[1],
            year: year,
            groupCodes: group,
            pageSize: pageSize,
            pageIndex: pageIndex
        }).then(res => {
            setResponse(res);
            setData(res.content.map(((body, index) => ({
                index: index + 1,
                major: body.faculty,
                mark: body.score,
                group: group !== "" ? [group] : body.groups,
                name: body.school
            }))))
        })
    }, [typeTest, facultyId, mark, year, group, pageIndex, pageSize]);

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
            title: 'Điểm chuẩn',
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

                <Flex mr={30} w={"20%"} flexDir={"column"}>
                    <FormControl mb={10}>
                        <FormLabel>Hình thức thi</FormLabel>
                    </FormControl>
                    <Flex width='100%'>
                        <OptionSelect value={groupType} options={groupTypes} functionChange={handleChangeGroupType}/>
                    </Flex>
                </Flex>

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
                       columns={columns}
                       dataSource={data}/>
            </Flex>

        </Flex>
    )
}

export default ViewWithScore;