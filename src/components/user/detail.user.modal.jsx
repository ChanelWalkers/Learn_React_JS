import { Button, Drawer, message, notification } from "antd";
import { useState } from "react";
import { updateUserAvatarAPI, uploadFileAPI } from "../../services/api.service";

const DetailUserModal = (props) => {
    const { isDetailModalOpen, setIsDetailModalOpen, dataDetail, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();



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

    const handleUpdateAvatar = async () => {
        const resUpload = await uploadFileAPI(selectedFile, "avatar");

        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(dataDetail._id, dataDetail.fullName, dataDetail.phone, newAvatar);

            if (resUpdateAvatar.data) {

                setIsDetailModalOpen((curModal) => !curModal)
                setSelectedFile(null);
                setPreview(null);

                notification.success({
                    message: "Update user avatar",
                    description: 'Cap nhat avatar thanh cong'
                });
                await loadUser();
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        }
    }
    // console.log(dataDetail);
    return (

        <Drawer title="Chi tiết User"
            onClose={() => {
                setIsDetailModalOpen(false);
            }}
            open={isDetailModalOpen}
            width={"40vw"}
        >
            {dataDetail ? <>
                <p>Id: {dataDetail._id}</p>
                <br />
                <p>Full name: {dataDetail.fullName}</p>
                <br />
                <p>Email: {dataDetail.email}</p>
                <br />
                <p>Phone number: {dataDetail.phone}</p>
                <p>Avatar</p>
                <div style={{ marginTop: '10px', height: '100px', width: '150px', border: '1px solid #ccc' }}>
                    <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                </div>
                <div>
                    <label htmlFor="btnUpload" style={style}>Upload Avatar</label>
                    <input type="file" hidden id="btnUpload" onChange={(e) => handleOnChangeFile(e)} />
                </div>
                {preview &&
                    <>
                        <div style={{ marginTop: '10px', height: '100px', width: '150px', marginBottom: '15px' }}>
                            <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={preview} />
                        </div>
                        <Button onClick={handleUpdateAvatar} type="primary">Save</Button>
                    </>
                }
            </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>


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

export default DetailUserModal;