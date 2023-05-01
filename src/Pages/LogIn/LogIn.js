import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { allContext } from '../../Auth/AuthContext';

const LogIn = () => {
    const { signIn } = useContext(allContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const from = location.state?.from?.pathname || '/';
    const HandleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                async function fetchingFunc() {
                    const fetching = await fetch('https://the-book-nook-server-limon-programming-hero-vercel.vercel.app/jwt', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(user)
                    })
                    const res = await fetching.json();
                    localStorage.setItem('the-book-nook-jwt', res.token);
                    navigate(from);
                }
                fetchingFunc();
            })
            .catch(err => {
                const errorMessage = err.message;
                alert(`${errorMessage} Sign Up first`);
            })

    }
    return (
        <div className='flex justify-center'>
            <form onSubmit={HandleLogIn} className='grid grid-cols-1 m-2 p-10 border w-96 border-slate-300'>
                <div>
                    <h1 className='font-semibold m-3'>Log In</h1>
                    <input type="text" placeholder="email" className="input input-bordered input-md w-full max-w-xs" name='email' required />
                    <input type="password" placeholder="password" className="my-4 input input-bordered input-md w-full max-w-xs" name='password' required />
                    <input type="submit" className="input input-bordered input-md w-full max-w-xs btn btn-primary" value='Login' />
                    <p className='mt-2 text-center'>Don’t have an account? <Link className='text-blue-600 underline' to='/signup'>Create an account</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LogIn;