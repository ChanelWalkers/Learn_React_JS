import { Link, NavLink, useNavigate } from 'react-router-dom';
// import './header.css'
import { Menu, message } from 'antd';
import { useContext, useState } from 'react';
import { HomeOutlined, AuditOutlined, LoginOutlined, UsergroupAddOutlined, SettingOutlined, LogoutOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';
import { logOutAPI } from '../../services/api.service';


const Header = () => {

    const { user, setUser } = useContext(AuthContext);
    // console.log('check data', user)

    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await logOutAPI();
        if (res.data) {
            localStorage.removeItem('access_token');
            setUser({
                "email": "",
                "phone": "",
                "fullName": "",
                "role": "",
                "avatar": "",
                "id": ""
            })
            message.success(res.data);
            navigate('/');
        }
    }

    const items = [
        {
            label: <NavLink to={"/"}>Home</NavLink>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <NavLink to={"/users"}>Users</NavLink>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <NavLink to={"/Books"}>Books</NavLink>,
            key: 'books',
            icon: <AuditOutlined />,
        },
        ...(!user.id ? [
            {
                label: <NavLink to={'/login'}>Login</NavLink>,
                key: 'login',
                icon: <LoginOutlined />,
            }
        ] : []),
        {
            label: `Welcome ${user.fullName}`,
            key: 'settings',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: 'Logout',
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    onClick: handleLogout
                }
            ],
        }
    ];


    const [current, setCurrent] = useState('home');
    const onClick = e => {
        // console.log('click ', e);
        setCurrent(e.key);
    };


    // return (
    //     <ul>
    //         <li><NavLink to="/">Home</NavLink></li>
    //         <li><NavLink to="/users">Users</NavLink></li>
    //         <li><NavLink to="/books">Books</NavLink></li>
    //     </ul>
    // );
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Header;