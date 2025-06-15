import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Popconfirm, notification, message } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import DetailUserModal from './detail.user.modal';
import { deleteUserAPI } from '../../services/api.service';

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];


// loadUser();

const UserTable = (props) => {

    const { dataUsers, loadUser, current, pageSize, total, setTotal, setPageSize, setCurrent } = props;

    const [dataUpdate, setDataUpdate] = useState(null);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [dataDetail, setDataDetail] = useState(null);

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: 'Delete user',
                description: 'Xoa nguoi dung thanh cong'
            })
            await loadUser(current, pageSize);
        } else {
            notification.error({
                message: 'Delete user',
                description: JSON.stringify(res.message)
            })
        }
    }


    const columns = [
        {
            title: 'No',
            render: (_, record, index) => {
                return <>{(index + 1) + (current - 1) * pageSize}</>
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#' onClick={() => {
                        setIsDetailModalOpen(true)
                        setDataDetail(record);
                        // alert("Hello")
                    }

                    }>{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <EditOutlined
                        style={{ cursor: 'pointer', color: '#fcc419' }}
                        onClick={
                            () => {
                                setIsModalUpdateOpen(curModal => !curModal)
                                setDataUpdate(record)
                            }
                        } />
                    <Popconfirm
                        placement="leftTop"
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: 'pointer', color: '#fa5252' }} />
                    </Popconfirm>
                </div>
            )
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }


        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };


    return (
        <>
            <Table rowKey={"_id"}
                columns={columns}
                dataSource={dataUsers}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser} />

            <DetailUserModal
                loadUser={loadUser}
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
                dataDetail={dataDetail}
            />
        </>
    )
}

export default UserTable;