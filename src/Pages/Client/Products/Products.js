import React, { useContext } from 'react';
// import fakeData from './../../../fakeData.json'
import Product from './Product';
import { useLoaderData } from 'react-router-dom';
import { allContext } from '../../../Auth/AuthContext';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Products = () => {
    const allProducts = useLoaderData();
    const { loader } = useContext(allContext);
    return (
        <div>
            <div className='flex justify-center my-3'>
                <input type="search" placeholder=" Search book" className="text-center input input-bordered  w-full max-w-xs rounded-none" />
                <button className='btn btn-primary rounded-none'>Search</button>
            </div>
            {<FontAwesomeIcon className={loader ? 'block' : 'hidden'} icon={faSpinner} spin></FontAwesomeIcon>}
            <div className='mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {allProducts?.map(pd => <Product key={pd.name} product={pd}></Product>)}
            </div>
        </div>
    );
};

export default Products;