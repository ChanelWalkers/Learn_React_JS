import { Button, Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";


const UserForm = (props) => {

    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
    }

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber);
        if (res.data) {
            notification.success({
                message: 'create user',
                description: 'Tao moi user thanh cong'
            })
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: 'error create user',
                description: JSON.stringify(res.message)
            })
        }
    }


    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Table Users</h3>
                <Button onClick={() => setIsModalOpen(curModal => !curModal)} type="primary">Create User</Button>
            </div>
            <Modal title="Create User"
                open={isModalOpen}
                onOk={handleSubmitBtn}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}>
                {/* <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p> */}
                <div style={{ display: "flex", gap: "15px", flexDirection: "column", padding: "24px" }}>
                    <div>
                        <span>Full name</span>
                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default UserForm;