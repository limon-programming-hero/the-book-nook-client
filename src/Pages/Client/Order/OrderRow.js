import React from 'react';

const OrderRow = ({ pd, HandlerUpdate }) => {

    return (
        <tr key={pd._id}>
            <td>{pd?.name}</td>
            <td>1</td>
            <td>${pd?.price}</td>
            <td className={pd?.status && 'text-primary'}><button onClick={() => HandlerUpdate(pd._id)} className='btn btn-ghost'>{pd?.status || 'Pending'}</button></td>
        </tr>
    );
};

export default OrderRow;