import React, { useState, useEffect } from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleBook = () => {
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    useEffect(() => {
        fetch('/books.json')
          .then(res => res.json())
          .then(data => {
              const found = data.find(b => String(b._id) === id);
              if (found) setBook(found);
              else setError(true);
          })
          .catch(() => setError(true))
          .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading...</div>
    if (error || !book) return <div>Error happening to load book info</div>
    // Fallback for author and published date
    const authorName = book.author ?? 'Unknown Author';
    const publishedDate = book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'Unknown Date';
  return (
    <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {authorName}</p>
                    <p className="text-gray-700 mb-4"><strong>Published:</strong> {publishedDate}</p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
                </div>

                <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
            </div>
        </div>
  )
}

export default SingleBook