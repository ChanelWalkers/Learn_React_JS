import { Form, Input, Button, notification, Col, Row, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAPI } from "../services/api.service";

const RegisterPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // console.log(">>> check values: ", values)
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (res.data) {
            notification.success({
                message: 'Register user',
                description: 'Register user successfully!'
            })
            navigate('/login')
        } else {
            notification.error({
                message: 'Error',
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        // <div>register page</div>
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: '30px' }}
        // onFinishFailed={onFinishFailed}
        >
            <h3 style={{ textAlign: 'center' }}>Register Account</h3>
            <Row justify={'center'}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={'center'}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={'center'}>
                <Col xs={24} md={6}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                // type: 'regexp',
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>


            <Row justify={'center'}>
                <Col xs={24} md={8}>
                    <div>
                        <Button
                            onClick={() => form.submit()}
                            type="primary">Register</Button>
                    </div>
                    <Divider />
                    <div>Already have account? <Link to={'/login'}>Login here</Link></div>
                </Col>
            </Row>
        </Form>
    )
}

export default RegisterPage;