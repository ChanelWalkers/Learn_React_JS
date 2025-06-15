import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate, Link } from "react-router-dom";
import { Result, Button } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    } else {
        return (
            <Result commentMore actions
                status="403"
                title="Unauthorize!"
                subTitle={"You must login to view this page"}
                extra={<Button type="primary">
                    <Link to="/">
                        <span>Back to homepage</span>
                    </Link>
                </Button>}
            />
        )
    }

}

export default PrivateRoute;