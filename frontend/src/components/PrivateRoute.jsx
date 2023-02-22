import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <Spinner />;
    }

    // Only bring to private if logged in
    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
