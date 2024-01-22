import {Button, Form, Input, Modal, Select} from "antd";
import {useEffect, useState} from "react";
import {serviceHust} from "../../../../utils/service";
import {showToast} from "../../../../utils/helper";

const ModalCreateMajor = ({isModalOpen, setIsModalOpen}) => {
    const [form] = Form.useForm();
    const [vnName, setVnName] = useState("");
    const [enName, setEnName] = useState("");
    const [abbreviations, setAbbreviations] = useState("");
    const [schools, setSchools] = useState([]);
    const [school, setSchool] = useState("");

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

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

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

    const save = () => {
        serviceHust.addSchool(form.getFieldValue())
            .then(res => {
                showToast({
                    content: "Thêm trường/viện thành công!",
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

    const onChangeVnName = (e) => {
        const inputValue = e.target.value;
        form.setFieldsValue({
            vnName: inputValue
        })
        setVnName(inputValue);
    }

    const onChangeEnName = (e) => {
        const inputValue = e.target.value;
        form.setFieldsValue({
            enName: inputValue
        })
        setEnName(inputValue);
    }

    const onChangeAbbreviations = (e) => {
        const inputValue = e.target.value;
        form.setFieldsValue({
            abbreviations: inputValue
        })
        setAbbreviations(inputValue);
    }

    const onChangeSchool = (value) => {
        form.setFieldsValue({
            school: value
        })
        setSchool(value);
    }

    return (
        <Modal title="Thêm mới trường/viện"
               open={isModalOpen}
               onCancel={handleCancel}
               width="100%"
               destroyOnClose
               footer={null}>
            <Form form={form} onFinish={save} style={{marginTop: 50}}>
                <Form.Item label="Trường/Viện"
                           name="school"
                           rules={[{required: true, message: 'Vui lòng chọn trường cần thêm chuyên ngành'}]}>
                    <OptionSelect value={school} options={schools} functionChange={onChangeSchool}/>
                </Form.Item>
                <Form.Item label="Tên tiếng Việt"
                           name="vnName"
                           rules={[{required: true, message: 'Vui lòng nhập tên tiếng Việt'}]}>
                    <Input value={vnName} onChange={onChangeVnName}/>
                </Form.Item>
                <Form.Item label="Tên tiếng Anh"
                           name="enName">
                    <Input value={enName} onChange={onChangeEnName}/>
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