import React, { useContext } from 'react';
import logo from './../../../../images/logo.png'
import { Link } from 'react-router-dom';
import { allContext } from './../../../../Auth/AuthContext';

const Header = () => {
    const { user, logOut } = useContext(allContext);
    const HandlerSignOut = () => {
        logOut()
            .then(result => {
                // signned out 
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    const allMenu =
        <>
            <li className='font-semibold mr-2'><Link to='/'>Home</Link></li>
            <li className='font-semibold mr-2'><Link to='/admin'>Admin</Link></li>
            {user?.email ?
                <li className='font-semibold mr-2'><Link to='/order'>Order</Link></li>
                :
                <li className='mr-2 font-semibold'><Link to='/'>Deals</Link></li>
            }
        </>
    return (
        <div className=' mt-3'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {allMenu}
                        </ul>
                    </div>
                    <Link to='/' ><img className='w-2/3' src={logo} alt="" /></Link>
                </div>
                <div className='navbar-end '>
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {allMenu}
                        </ul>
                    </div>
                    {user?.email ?
                        <button onClick={HandlerSignOut} to='/' className="btn btn-primary font-bold">Sign Out</button>
                        :
                        <Link to='/login' className="btn btn-primary font-bold">Login</Link>}

                </div>
            </div>
        </div>
    );
};

export default Header;