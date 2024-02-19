import {Button, Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {serviceHust} from "../../../../utils/service";
import {showToast} from "../../../../utils/helper";

const ModalCreateMajor = ({isModalOpen, setIsModalOpen, record, refresh}) => {
    const [form] = Form.useForm();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [schools, setSchools] = useState([]);
    const [school, setSchool] = useState({});

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
        if (record) {
            form.setFieldsValue({
                name: record?.data?.content?.name
            })
            setName(record?.data?.content?.name);

            form.setFieldsValue({
                code: record?.data?.content?.code
            })
            setCode(record?.data?.content?.code);

            form.setFieldsValue({
                schoolId: record?.data?.content?.school?.id
            })
            setSchool(record?.data?.content?.school?.id);
        }
    }, [isModalOpen]);

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const OptionSelect = ({value, options, functionChange}) => {
        return (
            <Select showSearch
                    disabled={record?.action === 'DELETE'}
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

    const save = () => {
        console.log(record)
        if (record?.action === 'EDIT') {
            serviceHust.editFaculty(form.getFieldValue(), record?.data?.content?.id)
                .then(() => {
                    showToast({
                        content: "Chỉnh sửa chuyên ngành thành công!",
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
            serviceHust.deleteFaculty(form.getFieldValue(), record?.data?.content?.id)
                .then(() => {
                    showToast({
                        content: "Xoá chuyên ngành thành công!",
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
            serviceHust.addFaculty(form.getFieldValue())
                .then(() => {
                    showToast({
                        content: "Thêm chuyên ngành thành công!",
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

    const onChangeName = (e) => {
        const inputValue = e.target.value;
        form.setFieldsValue({
            name: inputValue
        })
        setName(inputValue);
    }

    const onChangeCode = (e) => {
        const inputValue = e.target.value;
        form.setFieldsValue({
            code: inputValue
        })
        setCode(inputValue);
    }

    const onChangeSchool = (value) => {
        form.setFieldsValue({
            schoolId: value
        })
        setSchool(value);
    }

    return (
        <Modal
            title={(record?.action === 'EDIT' && "Chỉnh sửa chuyên ngành") || (record?.action === 'DELETE' && "Xoá chuyên ngành") || "Thêm mới chuyên ngành"}
            open={isModalOpen}
            onCancel={handleCancel}
            width="100%"
            destroyOnClose
            footer={null}>
            <Form form={form} onFinish={save} style={{marginTop: 50}}>
                <Form.Item label="Trường/Viện"
                           name="schoolId"
                           rules={[{required: true, message: 'Vui lòng chọn trường cần thêm chuyên ngành'}]}>
                    <OptionSelect value={school} options={schools} functionChange={onChangeSchool}/>
                </Form.Item>
                <Form.Item label="Tên chuyên ngành"
                           name="name"
                           rules={[{required: true, message: 'Vui lòng nhập tên chuyên ngành'}]}>
                    <Input disabled={record?.action === 'DELETE'} value={name} onChange={onChangeName}/>
                </Form.Item>
                <Form.Item label="Mã chuyên ngành"
                           name="code"
                           rules={[{required: true, message: 'Vui lòng nhập mã chuyên ngành'}]}>
                    <Input disabled={record?.action === 'DELETE'} value={code} onChange={onChangeCode}/>
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

export default ModalCreateMajor;