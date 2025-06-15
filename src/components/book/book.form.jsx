import { Button, Cascader, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, uploadFileAPI } from "../../services/api.service";

const BookForm = (props) => {
    const [mainText, setMainText] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("")

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { loadBook } = props;


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // hinh anh luu tru trong memory trinh duyet
        const file = event.target.files[0];
        console.log(file)
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const resetAndClose = () => {
        setIsAddModalOpen(false);
        setAuthor("");
        setQuantity(0);
        setPrice(0);
        setCategory("");
        setPreview();
        setSelectedFile();
    }

    const handleSubmitBtn = async () => {
        const resUpload = await uploadFileAPI(selectedFile, "book");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const res = await createBookAPI(mainText, author, price, quantity, category, newAvatar);
            if (res.data) {
                notification.success({
                    message: 'Success',
                    description: 'Create Book Successfully'
                })
                await loadBook();
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
                onCancel={() => setIsAddModalOpen(false)}
                onClose={() => setIsAddModalOpen(false)}
                maskClosable={false}
                onOk={handleSubmitBtn}
                okText={"CREATE"}
                title={"Create Book"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column", padding: "24px" }}>
                    <div>
                        <span>Title</span>
                        <Input value={mainText} onChange={(e) => setMainText(e.target.value)} />
                    </div>
                    <div>
                        <span>Author</span>
                        <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div>
                        <span>Price</span><br />
                        <InputNumber style={{ width: '420px' }} addonAfter={"₫"} value={price} onChange={(value) => setPrice(value)} />
                    </div>
                    <div>
                        <span>Quantity</span>
                        <InputNumber style={{ width: '420px' }} value={quantity} onChange={(value) => setQuantity(value)} />
                    </div>
                    <div>
                        <span>Category</span><br />
                        <Select
                            style={{ width: '100%' }}
                            value={category}
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
                            onChange={(value) => setCategory(value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="btnUpload" style={style}>Upload Avatar</label>
                        <input type="file" hidden id="btnUpload" onChange={(e) => handleOnChangeFile(e)} />
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
                </div>
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