import {useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { allContext } from '../Auth/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(allContext);
    const location = useLocation();
    if (user?.email) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
    }
};

export default PrivateRoute;