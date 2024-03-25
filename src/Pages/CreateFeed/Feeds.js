import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAsync, reset } from './../../features/Feed/feedUploadSlice';
import { toast } from "react-toastify"
// import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import './Feed.css'


function AddPostForm() {

    const { isLoading, isSuccess, message, isError } = useSelector((state) => state.feedUpload)
    const navigate = useNavigate()
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        categories: '',
        cost: '',
        images: [],
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setPostData({
            ...postData,
            images: e.target.files,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('description', postData.description);
        formData.append('categories', postData.categories);
        formData.append('cost', postData.cost);
        Array.from(postData.images).forEach(image => {
            formData.append('images', image);
        });
        dispatch(addPostAsync(formData));
        setPostData({
            title: '',
            description: '',
            categories: '',
            cost: '',
            images: [],
        });
    };


    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        } else if (isSuccess) {
            toast.success("Post created successfully");
            navigate('/')
            dispatch(reset());
        }
    }, [isSuccess, isError, message, dispatch, navigate]);

    if (isLoading) {
        return <Spinner />
    }



    return (
        <div className="create-feed">
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    name="title"
                    value={postData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <input
                    required
                    type="text"
                    name="cost"
                    value={postData.cost}
                    onChange={handleInputChange}
                    placeholder="Ingridient cost"
                />
                <textarea
                    required
                    name="description"
                    value={postData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                {/* Category dropdown */}
                <div className="form-group">
                    <select
                        required
                        name="categories"
                        value={postData.categories}
                        onChange={handleInputChange}
                        className="custom-select-box"
                    >
                        <option value="">Choose Category</option>
                        <option value="Category One">Category One</option>
                        <option value="Category Two">Category Two</option>
                        <option value="Category Three">Category Three</option>
                        <option value="Category Four">Category Four</option>
                    </select>
                </div>
                <input
                    required
                    type="file"
                    name="images"
                    onChange={handleFileChange}
                    multiple
                    className='file-upload'
                />
                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
}

export default AddPostForm;
