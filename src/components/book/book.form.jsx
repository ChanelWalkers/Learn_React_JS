import { Button, Cascader, Input, InputNumber, Modal, notification, Select, Form, message } from "antd";
import { useState } from "react";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";
import { useForm } from "antd/es/form/Form";

const BookForm = (props) => {
    const [mainText, setMainText] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("")
    const [thumbnail, setThumbnail] = useState("");

    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const { isAddModalOpen, setIsAddModalOpen } = props;


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // hinh anh luu tru trong memory trinh duyet
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const resetAndClose = () => {
        setIsAddModalOpen(false);
        // setAuthor("");
        // setQuantity(0);
        // setPrice(0);
        // setCategory("");
        form.resetFields();
        setPreview();
        setSelectedFile();
    }

    const handleSubmitBtn = async (values) => {
        const { mainText, author, price, quantity, category } = values;

        const resUpload = await uploadFileAPI(selectedFile, "book");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const res = await createBookAPI(mainText, author, price, quantity, category, newAvatar);
            if (res.data) {
                notification.success({
                    message: 'Success',
                    description: 'Create Book Successfully'
                })
                resetAndClose();
            } else {
                notification.error({
                    message: 'Error Create Book',
                    description: JSON.stringify(res.message),
                })
            }
        }
    }

    return (
        <div style={{ margin: '20px 20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <h3>Table Books</h3>
                <Button type="primary" onClick={() => setIsAddModalOpen(true)}>Create Book</Button>
            </div>

            <Modal
                open={isAddModalOpen}
                // onOk={}
                onCancel={() => resetAndClose()}
                onClose={() => resetAndClose()}
                maskClosable={false}
                onOk={() => form.submit()}
                okText={"CREATE"}
                title={"Create Book"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label={"Title"}
                        name={'mainText'}
                        rules={[
                            {
                                required: 'true',
                                message: 'Please input title'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Author"}
                        name={'author'}
                        rules={[
                            {
                                required: 'true',
                                message: 'Please input author'
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Price"}
                        name={'price'}
                        rules={[
                            {
                                required: 'true',
                                message: 'Please input price'
                            },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label={"Quantity"}
                        name={'quantity'}
                        rules={[
                            {
                                required: 'true',
                                message: 'Please input quantity'
                            },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label={"Category"}
                        name={'category'}
                        rules={[
                            {
                                required: 'true',
                                message: 'Please input category'
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },

                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },

                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },

                            ]}
                        />
                    </Form.Item>



                    <div>
                        <label htmlFor="btnUpload" style={style}>Upload Avatar</label>
                        <input type="file" hidden id="btnUpload" onChange={(e) => handleOnChangeFile(e)} style={{ display: 'none' }} />
                    </div>
                    {
                        preview &&

                        <>
                            <div style={{ marginTop: '10px', height: '100px', width: '150px', marginBottom: '15px' }}>
                                <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={preview} />
                            </div>
                            {/* <Button type="primary">Save</Button> */}
                        </>
                    }
                </Form>
            </Modal>

        </div>
    )
}

const style = {
    display: 'block',
    width: 'fit-content',
    marginTop: '15px',
    padding: '5px 10px',
    backgroundColor: 'orange',
    borderRadius: '5px',
    cursor: 'pointer',
}

export default BookForm;