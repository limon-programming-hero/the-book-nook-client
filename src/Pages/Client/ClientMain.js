import React from 'react';
import Header from './Shared/Header/Header';
import { Outlet } from 'react-router-dom';

const ClientMain = () => {
    return (
        <div className='mx-10 md:mx-24 lg:mx-28'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default ClientMain;