import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { allContext } from '../../Auth/AuthContext';

const SignUp = () => {
    const { signUp } = useContext(allContext);
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const from = location.state?.from?.pathname || '/';
    const HandleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        // const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const ConfirmPassword = form.confirmPassword.value;
        // console.log(name, email, password, ConfirmPassword);
        if (password !== ConfirmPassword) {
            alert('confirm password is not same!')
        } else {
            signUp(email, password)
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
                    alert(errorMessage);
                })
        }
    }
    return (
        <div className='flex justify-center'>
            <form onSubmit={HandleSignUp} className='grid grid-cols-1 m-2 p-10 border w-96 border-slate-300'>
                <div>
                    <h1 className='font-semibold m-3'>Sign Up</h1>
                    <input type="text" placeholder="name" className="mb-4 input input-bordered input-md w-full max-w-xs" name='name' required />
                    <input type="text" placeholder="email" className="input input-bordered input-md w-full max-w-xs" name='email' required />
                    <input type="password" placeholder="password" className="my-4 input input-bordered input-md w-full max-w-xs" name='password' required />
                    <input type="password" placeholder="confirm password" className="my-4 input input-bordered input-md w-full max-w-xs" name='confirmPassword' required />
                    <input type="submit" className="input input-bordered input-md w-full max-w-xs btn btn-primary" value='Login' />
                    <p className='mt-2 text-center'>Already have an account? <Link className='text-blue-600 underline' to='/login'>LogIn</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;