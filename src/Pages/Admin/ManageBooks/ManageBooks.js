import React, { useEffect, useState } from 'react';
import ManageBook from './ManageBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ManageBooks = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState();
    const { loader } = useState();

    useEffect(() => {
        fetch('https://the-book-nook-server-limon-programming-hero-vercel.vercel.app/books')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const HandlerDelete = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this book?');
        if (confirm) {
            fetch(`https://the-book-nook-server-limon-programming-hero-vercel.vercel.app/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('the-book-nook-jwt')}`
                }

            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        return navigate('/login')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data);
                    console.log(id);
                    if (data.deletedCount === 1) {
                        const remaining = products?.filter(pd => pd._id !== id);
                        setProducts(remaining);
                    } else {
                        alert('Item not found!');
                    }
                })
        }
    }
    return (
        <div className="overflow-x-auto ">
            {<FontAwesomeIcon className={loader ? 'block' : 'hidden'} icon={faSpinner} spin></FontAwesomeIcon>}
            <table className="table w-full p-10">
                {/* head */}
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {products?.map(pd =>
                        <ManageBook product={pd} key={pd._id} HandlerDelete={HandlerDelete}></ManageBook>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBooks;