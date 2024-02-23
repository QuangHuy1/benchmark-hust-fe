import {Button, Form, Input, Modal} from "antd";
import {useEffect, useState} from "react";
import {serviceHust} from "../../../../utils/service";
import {showToast} from "../../../../utils/helper";

const ModalCreateSchool = ({isModalOpen, setIsModalOpen, record, refresh, setRecord}) => {
    const [form] = Form.useForm();
    const [vnName, setVnName] = useState("");
    const [enName, setEnName] = useState("");
    const [abbreviations, setAbbreviations] = useState("");

    useEffect(() => {
        if (record) {
            form.setFieldsValue({
                vnName: record?.data?.content?.vnName
            })
            setVnName(record?.data?.content?.vnName);

            form.setFieldsValue({
                enName: record?.data?.content?.enName
            })
            setEnName(record?.data?.content?.enName);

            form.setFieldsValue({
                abbreviations: record?.data?.content?.abbreviations
            })
            setAbbreviations(record?.data?.content?.abbreviations);
        }
    }, [isModalOpen]);

    const handleCancel = () => {
        form.resetFields();
        setRecord({});
        setIsModalOpen(false);
    };

    const save = () => {
        if (record?.action === 'EDIT') {
            serviceHust.editSchool(form.getFieldValue(), record?.data?.content?.id)
                .then(() => {
                    showToast({
                        content: "Chỉnh sửa trường/viện thành công!",
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
            serviceHust.deleteSchool(form.getFieldValue(), record?.data?.content?.id)
                .then(() => {
                    showToast({
                        content: "Xóa trường/viện thành công!",
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
            serviceHust.addSchool(form.getFieldValue())
                .then(() => {
                    showToast({
                        content: "Thêm trường/viện thành công!",
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
        <Modal title={
            record?.action === 'DELETE' && "Xoá trường/viện"
            || record?.action === 'EDIT' && "Chỉnh sửa trường/viện"
            || "Thêm mới trường/viện"
        }
               open={isModalOpen}
               onCancel={handleCancel}
               width="100%"
               destroyOnClose
               footer={null}>
            <Form form={form} onFinish={save} style={{marginTop: 50}}>
                <Form.Item label="Mã trường/viện"
                           name="abbreviations"
                           rules={[{required: true, message: 'Vui lòng nhập mã trường/viện'}]}>
                    <Input disabled={record?.action === 'DELETE'} value={abbreviations}
                           onChange={onChangeAbbreviations}/>
                </Form.Item>
                <Form.Item label="Tên tiếng Việt"
                           name="vnName"
                           rules={[{required: true, message: 'Vui lòng nhập tên tiếng Việt'}]}>
                    <Input disabled={record?.action === 'DELETE'} value={vnName} onChange={onChangeVnName}/>
                </Form.Item>
                <Form.Item label="Tên tiếng Anh"
                           name="enName">
                    <Input disabled={record?.action === 'DELETE'} value={enName} onChange={onChangeEnName}/>
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