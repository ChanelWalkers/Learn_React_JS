
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.service';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';

const App = () => {

  const { setUser, isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserinfo();
  }, []);

  const delay = (milSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, milSeconds)
    })
  }

  const fetchUserinfo = async () => {
    const res = await getAccountAPI();
    await delay(3000);
    if (res.data) {
      // console.log('check user data', res.data);
      setUser(res.data.user);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ?
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>
  );
}

export default App
