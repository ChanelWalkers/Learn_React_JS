import { ArrowRightOutlined } from "@ant-design/icons";
import { Form, Input, Row, Col, Button, Divider, notification, message } from "antd";
import { Link } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {

    const [form] = Form.useForm();

    const [isPending, setIsPending] = useState(false);

    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const onFinish = async (values) => {
        setIsPending(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            // notification.success({
            //     message: 'Login Success',
            //     description: 'Login Successfully'
            // })
            message.success('Login Successfully')
            localStorage.setItem('access_token', res.data.access_token);
            setUser(res.data.user);
            navigate('/')
        } else {
            notification.error({
                message: 'Login Failed',
                description: JSON.stringify(res.message)
            })
        }
        setIsPending(false);
    }
    return (
        // <div>login page</div>
        <Row justify={'center'} style={{ marginTop: '30px' }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: '15px',
                    margin: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                }}>
                    <legend>Login</legend>
                    <Form
                        onFinish={onFinish}
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email',
                                },
                                {
                                    pattern: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
                                    message: "Email wrong format",
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={"Password"}
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password'
                                }
                            ]}
                        >
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === 'Enter')
                                    form.submit();
                            }} />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                    loading={isPending}
                                >
                                    Login
                                </Button>
                                <Link to={'/'}>Go to homepage <ArrowRightOutlined /> </Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>Don't have any account? &nbsp;
                        <Link to={'/register'}>Register here</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;