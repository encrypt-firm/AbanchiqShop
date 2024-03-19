import React, { useEffect } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFeedsAsync } from '../../features/Feed/feedSlice'
import Spinner from '../../Components/Spinner/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const Products = () => {
    const { posts, isLoading } = useSelector((state) => state.feed)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllFeedsAsync())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="Products">
                <main>
                    <div className="container">
                        <h3>My Posts</h3>
                        <div className="gallery">
                            {posts.map(post => (
                                <div className="gallery-item" tabindex="0" key={post._id}>
                                    {post.images && post.images.length > 0 && (
                                        <img src={post.images[0].url} className="gallery-image" alt="" />
                                    )}
                                    <div className="gallery-item-info">
                                        <ul>
                                            <li className="gallery-item-likes"><span className="visually-hidden">Edit</span>
                                                <Link className='Link edit' to={`/dashboard/editfeed/${post._id}`} >
                                                    <MdOutlineEditLocationAlt />
                                                </Link>
                                            </li>
                                            <li className="gallery-item-comments"><span className="visually-hidden">Delete</span>
                                                <Link className='Link delete' to={`/delete/${post._id}`}>
                                                    <MdDelete />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <!-- End of gallery --> */}
                        <div className="loader2"></div>

                    </div>
                    {/* <!-- End of container --> */}

                </main>
            </div>
        </>
    )
}

export default Products
