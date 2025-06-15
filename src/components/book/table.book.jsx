import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Space, Tag } from "antd";
import { useState } from "react";
import BookDetailModal from "./detail.book.modal";
import ModalUpdateBook from "./update.book.modal";

const BookTable = (props) => {
    const { dataBooks, setCurrent, setPageSize, total, current, pageSize, loadBook } = props;

    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetails, setDataDetails] = useState(null);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [isDetailModalOpen, setIsModalDetailOpen] = useState(false);

    const columns = [
        {
            title: 'No',
            render: (_, record, index) => {
                return <>{(index + 1)}</>
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return <a href="#" onClick={() => {
                    setDataDetails(record)
                    setIsModalDetailOpen(true);
                }}>
                    {record._id}
                </a>
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, record) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity'
        },
        {
            title: 'Author',
            dataIndex: 'author'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{
                    display: 'flex',
                    gap: '20px'
                }}>
                    <EditOutlined
                        style={{ cursor: 'pointer', color: '#fcc419' }}
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                    />
                    <DeleteOutlined style={{ cursor: 'pointer', color: '#fa5252' }} />
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }

    return (
        <>
            <Table
                rowKey={"_id"}
                dataSource={dataBooks}
                columns={columns}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} of {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />
            <BookDetailModal
                dataDetails={dataDetails}
                isDetailModalOpen={isDetailModalOpen}
                setIsModalDetailOpen={setIsModalDetailOpen}
            />
            <ModalUpdateBook
                dataUpdate={dataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                loadBook={loadBook}
            />
        </>
    )
}

export default BookTable;