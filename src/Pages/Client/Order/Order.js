import React, { useContext, useEffect, useState } from 'react';
import { allContext } from '../../../Auth/AuthContext';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; import OrderRow from './OrderRow';
;

const Order = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState();
    const { loader } = useContext(allContext);
    const { user } = useContext(allContext);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('the-book-nook-jwt')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return navigate('/login')
                }
                return res.json();
            })
            .then(data => {
                setOrders(data);
            })
    }, [user?.email, navigate]);
    console.log(orders);

    const HandlerUpdate = (id) => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: 'Approved' }),
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('the-book-nook-jwt')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    const approved = orders?.find(pd => pd._id === id);
                    approved.status = 'Approved';
                    const remaining = orders?.filter(pd => pd._id !== id);
                    const allOrder = [approved, ...remaining];
                    setOrders(allOrder);
                }
            })
    }

    return (
        <div className='mt-3'>
            {<FontAwesomeIcon className={loader ? 'block' : 'hidden'} icon={faSpinner} spin></FontAwesomeIcon>}
            <div className="overflow-x-auto my-auto">
                <h2 className='text-xl my-3 text-center font-semibold'>Ordered Products</h2>
                <table className="table rounded shadow-xl text-lg font-semibold  w-10/12 mx-auto">
                    {/* head */}
                    <thead>
                        <tr className='border-b-2 text-slate-400'>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map(pd =>
                            <OrderRow pd={pd} HandlerUpdate={HandlerUpdate}></OrderRow>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Order;