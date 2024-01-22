import {Flex} from "@chakra-ui/react";
import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";
import {serviceHust} from "../../utils/service";
import {useSetRecoilState} from "recoil";
import {tokenState} from "../recoil";
import {showToast} from "../../utils/helper";

const Login = ({isModalOpen, setIsModalOpen}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setToken = useSetRecoilState(tokenState);
    const [form] = Form.useForm();

    const onChangeUsername = (e) => {
        form.setFieldsValue({
            username: e.target.value
        })
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        form.setFieldsValue({
            password: e.target.value
        })
        setPassword(e.target.value);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const onFinish = () => {
        serviceHust.login({
            username: username,
            password: password
        }).then(res => {
            setToken(res?.token);
            window.location.href = '/admin';
        })
            .catch(err => showToast({
                content: err?.message,
                status: 'error'
            }))
    }

    return (
        <Modal title="Đăng nhập"
               open={isModalOpen}
               onCancel={handleCancel}
               width="30%"
               destroyOnClose
               footer={null}>
            <Flex flexDir={"column"}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Username"
                               name="username"
                               rules={[{required: true, message: 'Vui lòng nhập username'}]}>
                        <Input placeholder="Vui lòng nhập username" onChange={onChangeUsername}>
                        </Input>
                    </Form.Item>
                    <Form.Item label="Password"
                               name="password"
                               rules={[{required: true, message: 'Vui lòng nhập password'}]}>
                        <Input type="password" placeholder="Vui lòng nhập password" onChange={onChangePassword}>
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <Button className={"_btn_submit_score_"} type="link" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </Modal>
    )
}

export default Login;