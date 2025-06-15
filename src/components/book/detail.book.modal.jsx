import { Drawer } from "antd";


const BookDetailModal = (props) => {
    const { dataDetails, isDetailModalOpen, setIsModalDetailOpen } = props;

    const onClose = () => {
        setIsModalDetailOpen(false);
    }

    return (
        <Drawer
            title="Book Detail"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={onClose}
            open={isDetailModalOpen}
            maskClosable={false}
            width={'40vw'}
        >
            {dataDetails ?
                <div style={{ margin: '15px', fontSize: '13px' }}>
                    <p>Id: {dataDetails._id}</p><br />
                    <p>Title: {dataDetails.mainText}</p><br />
                    <p>Author: {dataDetails.author}</p><br />
                    <p>Genres: {dataDetails.category}</p><br />
                    <p>Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetails.price)}</p><br />
                    <p>Quantity: {dataDetails.quantity}</p><br />
                    <p>Sold: {dataDetails.sold}</p><br />
                    <p>Thumbnail:</p>
                    <div style={{ marginTop: '10px', height: '100px', width: '150px', border: '1px solid #ccc' }}>
                        <img style={{ height: '100%', width: '100%', objectFit: 'contain' }} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetails.thumbnail}`} />
                    </div>
                </div> :
                <p>Nothing</p>
            }
        </Drawer>
    )

}

export default BookDetailModal;