import React from 'react';
import Sidebar from './SideBar/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminMain = () => {
    return (
        <div className='flex flex-row '>
            <div className='w-1/3 min-h-screen md:w-1/5 lg:w-1/5 bg-blue-950 border'>
                <Sidebar></Sidebar>
            </div>
            <div className='w-2/3 md:w-4/5 lg:w-4/5 bg-slate-50 border'>
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default AdminMain;