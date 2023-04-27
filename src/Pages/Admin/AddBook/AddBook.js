import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const navigate = useNavigate()

    // I can't make imgbb host showing that cors origin is policy or something
    const getImageURL = (e) => {
        const file = e.target.files[0];
        console.log(file);
        let form = new FormData();
        form.append('image', file)
        fetch(`https://api.imgbb.com/1/upload?expiration=0&key=4b6a8e19304eb65cb81efdbfbef467c5`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'https://api.imgbb.com/1/upload?expiration=0&key=4b6a8e19304eb65cb81efdbfbef467c5',
                "Content-Type": "multipart/form-data"
            },
            body: form
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    const HandlerAddBook = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.book.value;
        const author = form.author.value;
        const price = parseFloat(form.price.value);
        const bookData = { name, author, price }
        console.log(bookData);
        // console.log(typeof(bookData?.price));
        fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('the-book-nook-jwt')}`
            },
            body: JSON.stringify(bookData)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return navigate('/login')
                }
                return res.json();
            })
            .then(data => {
                if (data.acknowledged === true) {
                    alert('Book added successfully!')
                }
                console.log(data)
            });
    }
    return (
        <div className='mb-24'>
            <h2 className='m-4 font-semibold text-3xl p-3 bg-white'>Add Books</h2>
            <form onSubmit={HandlerAddBook} className='flex flex-col justify-center'>
                <div className='bg-white mx-auto grid grid-cols-1 lg:grid-cols-2 border rounded-xl w-5/6 p-7 '>
                    <div>
                        <label className="label font-semibold" htmlFor='book'>Book Name</label>
                        <input type="text" id='book' name='book' placeholder="Book Name" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label font-semibold" htmlFor='author'>Author Name</label>
                        <input type="text" id='author' name='author' placeholder="Author Name" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className="label font-semibold" htmlFor='price'>Add Price</label>
                        <input type="text" name='price' id='price' placeholder="Price" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className='label font-semibold' htmlFor='cover-photo'>Add Book Cover Photo</label>
                        <input onChange={getImageURL} type="file" className="file-input w-full max-w-xs" name="image" id="cover-photo" />
                    </div>
                </div>
                <div className='ml-auto px-7'> <input className='btn btn-primary w-28 my-4' type="submit" value="Save" /></div>
            </form>
        </div>
    );
};

export default AddBook;