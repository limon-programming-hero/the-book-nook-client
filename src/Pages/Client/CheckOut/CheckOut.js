import React, { useContext, useEffect, useState } from 'react';
import { allContext } from '../../../Auth/AuthContext';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';

const CheckOut = () => {
    const { id } = useParams();
    const [orderProduct, setOrderProduct] = useState();
    // console.log(orderProduct);
    const navigate = useNavigate();
    const { user, loader } = useContext(allContext);

    useEffect(() => {
        fetch(`http://localhost:5000/checkout/${id}`, {
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
            .then(data => setOrderProduct(data))
    }, [id, navigate]);

    const handlerAddBook = () => {
        const orderDetails = {
            email: user?.email,
            bookId: orderProduct?._id,
            name: orderProduct.name,
            price: orderProduct.price
        }
        const confirm = window.confirm('Are you sure to order this Book?');
        // console.log(_id);
        if (confirm) {
            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('the-book-nook-jwt')}`
                },
                body: JSON.stringify(orderDetails)
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        return navigate('/login')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data);
                    navigate('/order');
                });
        }
    }


    return (
        <div className='mt-3'>
            {<FontAwesomeIcon className={loader ? 'block' : 'hidden'} icon={faSpinner} spin></FontAwesomeIcon>}
            <div className="overflow-x-auto my-auto">
                <h2 className='text-xl m-3 text-center font-semibold'>Check Out</h2>
                <table className="table rounded shadow-xl text-lg font-semibold w-10/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='border-b-2 text-slate-400'>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderProduct?.name}</td>
                            <td>1</td>
                            <td>${orderProduct?.price}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex flex-row-reverse'>
                    <button onClick={handlerAddBook} className='justify-end my-6 btn btn-primary'>Confirm Order</button>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;