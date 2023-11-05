import { Navigate } from "react-router-dom"
import {useSelector} from 'react-redux';

const CheckAuth = ({children}) => {

    const {token} = useSelector(state => state);

    if(!token) {
        return <Navigate to='/auth'/>
    }
    return (
        <>
            {children}
        </>
    )
}

export default CheckAuth;
