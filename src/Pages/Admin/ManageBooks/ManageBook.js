import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ManageBook = ({ product, HandlerDelete }) => {
    const { name, author, price, _id } = product;
    return (
        <tr >
            <th>{name}</th>
            <td>{author}</td>
            <td>{price}</td>
            <td>
                <button className='mr-5 hover:bg-slate-400'> <FontAwesomeIcon className='px-2' icon={faPenToSquare}></FontAwesomeIcon></button>
                <button onClick={() => HandlerDelete(_id)} className='mr-5 hover:bg-slate-400'><FontAwesomeIcon className='px-2' icon={faTrash}></FontAwesomeIcon></button>
            </td>
        </tr>
    );
};

export default ManageBook;