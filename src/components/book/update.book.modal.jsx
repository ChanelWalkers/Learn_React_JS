import { Modal, Input, InputNumber, Select, notification, message, Form } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI, uploadFileAPI } from "../../services/api.service";

const ModalUpdateBook = (props) => {
    const { dataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook } = props;

    const [thumbnail, setThumbnail] = useState();
    const [selectedFile, setSelectedFile] = useState();


    const [form] = Form.useForm();

    const resetAndCloseModal = () => {
        form.resetFields();
        setIsModalUpdateOpen(false);
    }



    const handleOk = async (values) => {
        const { id, author, category, price, quantity, mainText } = values;

        const data = {
            id: id,
            author: author,
            category: category,
            price: price,
            quantity: quantity,
            mainText: mainText,
        }

        if (!thumbnail && !selectedFile) {
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        let newThumbnail = "";

        if (!selectedFile && thumbnail) {
            newThumbnail = dataUpdate.thumbnail;
        } else {
            const resUpload = await uploadFileAPI(selectedFile, 'book');
            if (resUpload.data) {
                // console.log(resUpload.data.fileUploaded)
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }

        await updateBook(data, newThumbnail);

    };

    const updateBook = async (data, newThumbnail) => {
        const { id, author, category, price, quantity, mainText } = data;
        const res = await updateBookAPI(id, author, mainText, price, quantity, category, newThumbnail);
        if (res.data) {
            message.success('Update book successfully');
            resetAndCloseModal();
            await loadBook();
        } else {
            notification.error({
                message: 'Error Update Book',
                description: res.message,
            })
        }
    }

    const handleCancel = () => {
        setIsModalUpdateOpen(false);
    };


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setThumbnail(null);
            return;
        }

        // hinh anh luu tru trong memory trinh duyet
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setThumbnail(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            })
            setThumbnail(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate])

    return (
        <Modal
            title="Update Book - Controlled Component"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText={"Update"}>

            <Form
                layout="vertical"
                form={form}
                onFinish={handleOk}
            >


                <Form.Item
                    label="Id"
                    name={"id"}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name={"mainText"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input title'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Author"
                    name={"author"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input author'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Price"
                    name={"price"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input price'
                        }
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>


                <Form.Item
                    label="Quantity"
                    name={"quantity"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input quantity'
                        }
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>


                <Form.Item
                    label="Category"
                    name={"category"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input category'
                        }
                    ]}
                >
                    <Select
                        style={{ width: '100%' }}
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
                    <span>Thumbnail: </span>
                    {
                        thumbnail &&
                        <>
                            <div style={{ marginTop: '10px', height: '100px', width: '150px', marginBottom: '15px' }}>
                                <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={thumbnail} />
                            </div>
                            {/* <Button type="primary">Save</Button> */}
                        </>
                    }
                </div>
                <div>
                    <label htmlFor="btnUpload" style={style}>Upload Avatar</label>
                    <input type="file" hidden id="btnUpload" onChange={(e) => handleOnChangeFile(e)} style={{ display: 'none' }} />
                </div>
            </Form>
        </Modal>
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

export default ModalUpdateBook;