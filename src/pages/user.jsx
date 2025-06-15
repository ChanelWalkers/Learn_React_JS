import UserTable from "../components/user/table.user";
import UserForm from "../components/user/user.form";
import { fetchAllUserAPI } from '../services/api.service';
import { useEffect, useState } from 'react';
const UserPage = () => {

    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    // not empty => next value !== prev value
    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async () => {
        // console.log('>>> run load user START');
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result);
            setTotal(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        // console.log('>>> run load user END', res);
    }

    return (
        <div>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setTotal={setTotal}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default UserPage;
