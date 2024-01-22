import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";
import {serviceHust} from "../../../../utils/service";
import {showToast} from "../../../../utils/helper";

const ModalCreateSchool = ({isModalOpen, setIsModalOpen}) => {
    const [form] = Form.useForm();
    const [vnName, setVnName] = useState("");
    const [enName, setEnName] = useState("");
    const [abbreviations, setAbbreviations] = useState("");

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

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

    return (
        <Modal title="Thêm mới trường/viện"
               open={isModalOpen}
               onCancel={handleCancel}
               width="100%"
               destroyOnClose
               footer={null}>
            <Form form={form} onFinish={save} style={{marginTop: 50}}>
                <Form.Item label="Mã trường/viện"
                           name="abbreviations"
                           rules={[{required: true, message: 'Vui lòng nhập mã trường/viện'}]}>
                    <Input value={abbreviations} onChange={onChangeAbbreviations}/>
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

export default ModalCreateSchool;