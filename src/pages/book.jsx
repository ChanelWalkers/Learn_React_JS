import { useEffect, useState } from "react";
import BookTable from "../components/book/table.book";
import { fetchAllBookAPI } from "../services/api.service";
import BookForm from "../components/book/book.form";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchDataBook();
    }, [pageSize, current])

    const fetchDataBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }


    return (
        <div>
            <BookForm
                loadBook={fetchDataBook}
            />
            <BookTable
                dataBooks={dataBooks}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                total={total}
                current={current}
                pageSize={pageSize}
                loadBook={fetchDataBook}
            />
        </div>
    )
}

export default BookPage;