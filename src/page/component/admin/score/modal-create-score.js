import {Button, Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {serviceHust} from "../../../../utils/service";
import {GROUP_TYPES, YEARS} from "../../../../utils/const";
import {showToast} from "../../../../utils/helper";
import {Flex} from "@chakra-ui/react";

const ModalCreateScore = ({isModalOpen, setIsModalOpen}) => {
    const [form] = Form.useForm();
    const [schools, setSchools] = useState([]);
    const [school, setSchool] = useState("");
    const [faculties, setFaculties] = useState([]);
    const [faculty, setFaculty] = useState("");
    const groupTypes = GROUP_TYPES;
    const [groupType, setGroupType] = useState("");
    const [groupIds, setGroupIds] = useState([]);
    const [groupId, setGroupId] = useState([]);
    const years = YEARS.slice().reverse();
    const [year, setYear] = useState("");
    const [benchmark, setBenchmark] = useState("");

    useEffect(() => {
        serviceHust.findAllSchool().then(res => {
            const formattedData = res?.map((entity) => ({
                code: entity?.abbreviations,
                name: entity?.vnName,
                id: entity?.id
            }));
            setSchools(formattedData);
        })

    }, []);

    useEffect(() => {
        serviceHust.findAllFacultyBySchoolId(school).then(res => {
            const formattedData = res?.faculties?.map((entity) => ({
                code: entity?.code,
                name: entity?.name,
                id: entity?.id
            }));
            setFaculties(formattedData);
        })

    }, [school]);

    const OptionSelect = ({value, options, functionChange}) => {
        return (
            <Select showSearch
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

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const save = () => {
        console.log(form.getFieldValue())
        serviceHust.addBenchmark(form.getFieldValue())
            .then(res => {
                showToast({
                    content: "Thêm điểm thành công!",
                    status: 'success',
                });
            })
            .catch(err => {
                showToast({
                    content: err?.message,
                    status: 'error'
                });
            })
    }

    const onChangeSchool = (value) => {
        form.setFieldsValue({
            school: value
        })
        setSchool(value)
        form.setFieldsValue({
            facultyId: ""
        })
        setFaculty("");
    }

    const onChangeFaculty = (value) => {
        form.setFieldsValue({
            facultyId: value
        })
        setFaculty(value);
    }

    const onChangeYear = (value) => {
        form.setFieldsValue({
            year: value
        })
        setYear(value);
    }

    const onChangeGroupType = (value) => {
        form.setFieldsValue({
            groupType: value
        })
        setGroupType(value);
    }

    const onChangeBenchmark = (e) => {
        const inputValue = e.target.value;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            form.setFieldsValue({
                score: inputValue
            })
            setBenchmark(inputValue);
        }

    }

    return (
        <Modal title="Nhập điểm chuẩn"
               open={isModalOpen}
               onCancel={handleCancel}
               width="100%"
               destroyOnClose
               footer={null}>
            <Form form={form} onFinish={save} style={{marginTop: 50}}>
                <Form.Item label="Trường/Viện"
                           name="school"
                           rules={[{required: true, message: 'Vui lòng chọn trường cần lên điểm'}]}>
                    <OptionSelect value={school} options={schools} functionChange={onChangeSchool}/>
                </Form.Item>
                <Form.Item label="Chuyên ngành"
                           name="facultyId"
                           rules={[{required: true, message: 'Vui lòng chọn chuyên ngành cần lên điểm'}]}>
                    <OptionSelect value={faculty} options={faculties} functionChange={onChangeFaculty}/>
                </Form.Item>
                <Form.Item label="Loại bài thi"
                           name="groupType"
                           rules={[{required: true, message: 'Vui lòng chọn loại bài thi'}]}>
                    <OptionSelect value={groupType} options={groupTypes} functionChange={onChangeGroupType}/>
                </Form.Item>
                <Form.Item label="Khối thi">
                    <Select>
                    </Select>
                </Form.Item>
                <Form.Item label="Năm thi"
                           name="year"
                           rules={[{required: true, message: 'Vui lòng chọn năm thi'}]}>
                    <OptionSelect value={year} options={years} functionChange={onChangeYear}/>
                </Form.Item>
                <Form.Item label="Điểm chuẩn"
                           name="score"
                           rules={[{required: true, message: 'Vui lòng nhập điểm chuẩn'}]}>
                    <Input value={benchmark} onChange={onChangeBenchmark}/>
                </Form.Item>

                <Form.Item>
                    <Button className={"_btn_submit_score_"} type="link" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ModalCreateScore;