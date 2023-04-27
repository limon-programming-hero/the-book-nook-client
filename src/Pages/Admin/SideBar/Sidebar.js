import React from 'react';
import logo from './../../../images/Logo-white.png'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='grid grid-cols-1 px-5 py-7'>
            <Link to='/'><img src={logo} alt="" /></Link>
            <Link className=' mt-5 py-3 rounded text-white btn-ghost text-center hover:bg-slate-100 hover:text-black' to='/admin/managebooks'>Manage Books</Link>
            <Link className='py-3 rounded text-white text-center hover:bg-slate-100 hover:text-black' to='/admin/addbook'>+ Add Books </Link>
            <Link className='py-3 rounded text-white text-center hover:bg-slate-100 hover:text-black' to='/admin'>Edit Books </Link>
        </div>
    );
};

export default Sidebar;