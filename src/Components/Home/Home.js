import React, { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFeedsAsync } from '../../features/Feed/feedSlice';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.feed);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAllFeedsAsync());
        if (!user) {
            navigate('/login');
        }
    }, [dispatch, user, navigate]);

    if (isLoading) {
        return <Spinner />;
    }

    if (!user) {
        return (
            <div>
                <p>Please verify your account</p>
            </div>
        );
    }

    const userProfile = user?.profilePicture;
    return (
        <>
            <div className="Home">
                <header>
                    <div className="container">
                        <div className="profile">
                            <div className="profile-image">
                                {userProfile && (
                                    <img src={userProfile.url} alt="profile" />
                                )}
                            </div>

                            <div className="profile-user-settings">
                                {user && (
                                    <>
                                        <h1 className="profile-user-name">{user.name}</h1>
                                        <button className="btn profile-edit-btn">Position@Sales</button>
                                        <button className="btn profile-settings-btn" aria-label="profile settings">
                                            <i className="fas fa-cog" aria-hidden="true"></i>
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="profile-stats">

                                <ul>
                                    <li><span className="profile-stat-count">...</span> posts</li>
                                    <li><span className="profile-stat-count">18</span> Students</li>
                                    {/* <li><span className="profile-stat-count">206</span> following</li> */}
                                </ul>

                            </div>

                            <div className="profile-bio">

                                <p><span className="profile-real-name"></span> AbanchiqSchoolOfFormulation</p>

                            </div>

                        </div>
                        {/* <!-- End of profile section --> */}

                    </div>
                    {/* <!-- End of container --> */}

                </header>

                <main>
                    <div className="container">
                        <h3>Manage Posts</h3>
                        <p>Make sure you are verified to view, edit or upload posts</p>
                        <div className="gallery">
                            {posts.map(post => (
                                <div className="gallery-item" tabIndex="0" key={post._id}>
                                    {post.images && post.images.length > 0 && (
                                        <img src={post.images[0].url} className="gallery-image" alt="" />
                                    )}
                                    <div className="gallery-item-info">
                                        {/* Your existing component content goes here */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="loader2"></div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Home
