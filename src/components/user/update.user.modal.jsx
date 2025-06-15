import { useEffect, useState } from "react";

import { Button, Input, notification, Modal } from "antd";
import { createUserAPI, updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [id, setId] = useState("");


    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName);
            setPhoneNumber(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setPhoneNumber("");
        setDataUpdate(null);
    }

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phoneNumber);
        if (res.data) {
            notification.success({
                message: 'Update user',
                description: 'Cap nhat user thanh cong'
            })
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: 'error update user',
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <Modal title="Update User"
            open={isModalUpdateOpen}
            onOk={handleSubmitBtn}
            onCancel={resetAndCloseModal}
            maskClosable={false}
            okText={"SAVE"}>
            {/* <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p> */}
            <div style={{ display: "flex", gap: "15px", flexDirection: "column", padding: "24px" }}>
                <div>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>Full name</span>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

            </div>
        </Modal>
    );
}

export default UpdateUserModal;