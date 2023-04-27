import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { name, author, price, image, _id } = product;
    return (
        <div className='w-full pr-7 py-7'>
            <div className="w-full card card-compact shadow-xl">
                <figure><img className='w-full h-32' src={image} alt='Book' /></figure>
                <div className="card-body">
                    <p className="font-semibold card-title">{name}</p>
                    <p>{author}</p>
                    <div className="card-actions flex align-baseline justify-between">
                        <h3 className='text-blue-600 font-semibold text-lg'>$ {price}</h3>
                        <Link className='btn-primary py-1.5 px-3 rounded' to={`/checkout/${_id}`}>Buy Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;