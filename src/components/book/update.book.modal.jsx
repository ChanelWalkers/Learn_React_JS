import { Modal, Input, InputNumber, Select, notification, message } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI, uploadFileAPI } from "../../services/api.service";

const ModalUpdateBook = (props) => {
    const { dataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook } = props;

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("")
    const [thumbnail, setThumbnail] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setThumbnail(null);
        setId("");
        setIsModalUpdateOpen(false);
    }



    const handleOk = async () => {
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
                console.log(resUpload.data.fileUploaded)
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }

        await updateBook(newThumbnail);

    };

    const updateBook = async (newThumbnail) => {
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
            setId(dataUpdate._id);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setMainText(dataUpdate.mainText);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            setThumbnail(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    return (
        <Modal
            title="Update Book - Controlled Component"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"Update"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column", padding: "24px" }}>
                <div>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
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
                    <InputNumber style={{ width: '100%' }} addonAfter={"₫"} value={price} onChange={(value) => setPrice(value)} />
                </div>
                <div>
                    <span>Quantity</span><br />
                    <InputNumber style={{ width: '100%' }} value={quantity} onChange={(value) => setQuantity(value)} />
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
                    <input type="file" hidden id="btnUpload" onChange={(e) => handleOnChangeFile(e)} />
                </div>
            </div>
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