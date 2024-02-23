import {Button, Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {serviceHust} from "../../../../utils/service";
import {GROUP_TYPES, YEARS} from "../../../../utils/const";
import {showToast} from "../../../../utils/helper";

const ModalCreateScore = ({isModalOpen, setIsModalOpen, record, refresh, setRecord}) => {
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
        if (record) {
            console.log(record);
            form.setFieldsValue({
                school: record?.data?.content?.school?.id
            })
            setSchool(record?.data?.content?.school?.id);

            form.setFieldsValue({
                facultyId: record?.data?.content?.id
            })
            setFaculty(record?.data?.content?.id);

            form.setFieldsValue({
                groupIds: record?.data?.content?.groupIds
            })
            setGroupId(record?.data?.content?.groupIds);

            form.setFieldsValue({
                year: record?.data?.content?.year
            })
            setYear(record?.data?.content?.year);

            form.setFieldsValue({
                groupType: record?.data?.content?.groupType
            })
            setGroupType(record?.data?.content?.groupType);

            form.setFieldsValue({
                score: record?.data?.content?.score
            })
            setBenchmark(record?.data?.content?.score);
        }
    }, [isModalOpen]);

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
        serviceHust.findAllGroup({
            pageSize: 100,
            pageIndex: 1,
            groupType: groupType
        }).then(res => {
            const formattedData = res?.map((entity) => ({
                code: entity?.code,
                name: entity?.code,
                id: entity?.id
            }));
            setGroupIds(formattedData);
        })

    }, [groupType]);

    useEffect(() => {
        if (school === undefined) {
            return;
        }
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
                    disabled={record?.action === 'DELETE' || record?.action === 'EDIT'}
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

    const OptionSelectMulti = ({value, options, functionChange}) => {
        return (
            <Select showSearch
                    mode="multiple"
                    value={value}
                    disabled={record?.action === 'DELETE'}
                    onChange={functionChange}
                    optionLabelProp="label"
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
        setGroupId([]);
        setRecord({});
        setIsModalOpen(false);
    };

    const save = () => {
        if (record?.action === 'EDIT') {
            const params = {
                year: form.getFieldValue()?.year,
                score: form.getFieldValue()?.score,
                groupType: form.getFieldValue()?.groupType,
                facultyId: form.getFieldValue()?.facultyId,
                groupIds: form.getFieldValue()?.groupIds?.join(",")
            };
            console.log(params);
            serviceHust.editBenchmark(form.getFieldValue(), record?.data?.content?.id)
                .then(() => {
                    showToast({
                        content: "Chỉnh sửa điểm thành công!",
                        status: 'success',
                    });
                    refresh();
                })
                .catch(err => {
                    showToast({
                        content: err?.message,
                        status: 'error'
                    });
                });
        } else if (record?.action === 'DELETE') {
            const params = {
                year: form.getFieldValue()?.year,
                score: form.getFieldValue()?.score,
                groupType: form.getFieldValue()?.groupType,
                facultyId: form.getFieldValue()?.facultyId,
                groupIds: form.getFieldValue()?.groupIds?.join(",")
            };
            console.log(params);
            serviceHust.deleteBenchmark(form.getFieldValue(), record?.data?.content?.id)
                .then(() => {
                    showToast({
                        content: "Xoá điểm điểm thành công!",
                        status: 'success',
                    });
                    refresh();
                })
                .catch(err => {
                    showToast({
                        content: err?.message,
                        status: 'error'
                    });
                });
        } else {
            const params = {
                year: form.getFieldValue()?.year,
                score: form.getFieldValue()?.score,
                groupType: form.getFieldValue()?.groupType,
                facultyId: form.getFieldValue()?.facultyId,
                groupIds: form.getFieldValue()?.groupIds?.join(",")
            };
            console.log(params);
            serviceHust.addBenchmark(form.getFieldValue())
                .then(() => {
                    showToast({
                        content: "Thêm điểm thành công!",
                        status: 'success',
                    });
                    refresh();
                })
                .catch(err => {
                    showToast({
                        content: err?.message,
                        status: 'error'
                    });
                });
        }
    }

    const onChangeSchool = (value) => {
        form.setFieldsValue({
            school: value
        })
        setSchool(value);
        form.setFieldsValue({
            facultyId: ""
        })
        setFaculty("");
    }

    const onChangeGroupIds = (value) => {
        form.setFieldsValue({
            groupIds: value
        })
        setGroupId(value);
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
        form.setFieldsValue({
            groupIds: []
        })
        setGroupId([]);
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
        <Modal title={
            record?.action === 'DELETE' && "Xoá điểm chuẩn"
            || record?.action === 'EDIT' && "Chỉnh sửa điểm chuẩn"
            || "Thêm điểm chuẩn"
        }
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
                <Form.Item label="Khối thi"
                           name="groupIds"
                           rules={[{required: true, message: 'Vui lòng chọn loại bài thi'}]}>
                    <OptionSelectMulti value={groupId} options={groupIds} functionChange={onChangeGroupIds}/>
                </Form.Item>
                <Form.Item label="Năm thi"
                           name="year"
                           rules={[{required: true, message: 'Vui lòng chọn năm thi'}]}>
                    <OptionSelect value={year} options={years} functionChange={onChangeYear}/>
                </Form.Item>
                <Form.Item label="Điểm chuẩn"
                           name="score"
                           rules={[{required: true, message: 'Vui lòng nhập điểm chuẩn'}]}>
                    <Input disabled={record?.action === 'DELETE'} value={benchmark} onChange={onChangeBenchmark}/>
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