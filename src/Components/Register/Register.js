import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { CiFacebook } from "react-icons/ci";
import Spinner from '../Spinner/Spinner'
import { register, reset } from '../../features/Auth/authSlice'
import { FaCircleUser } from "react-icons/fa6";

import './Register.css'

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        file: null,
    });

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = (e) =>
        setFormData({ ...formData, file: e.target.files[0] });

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = new FormData();
        userData.append('name', name);
        userData.append('email', email);
        userData.append('password', password);
        if (formData.file) userData.append('profilePicture', formData.file);

        dispatch(register(userData));
    };

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset());
        }
    }, [isError, message, dispatch]);

    useEffect(() => {
        if (isSuccess || user) {
            toast.success("Please check your email for verification link!");
            localStorage.removeItem('user');
            navigate("/login")
            // dispatch(reset());
        }
    }, [isSuccess, user, navigate, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='Login'>
            <form onSubmit={onSubmit}>
                <div className="contanier">
                    <h1>Hello, Let's log you back</h1>
                    <div className="login">
                        <div className="l-cover">
                            <FaCircleUser className="user-Profile-img" />
                            <input
                                className="usInput"
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                onChange={onFileChange}
                                placeholder='Profile Image'
                                required
                            />
                        </div>
                        <div className="l-cover">
                            <input
                                className="usInput"
                                placeholder="Type your username"
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="l-cover">
                            <input
                                className="usInput"
                                placeholder="Type your Email"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="l-cover">
                            <input className="pwInput"
                                placeholder="Type your password"
                                id="password"
                                type={visible ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            {visible ? (
                                <AiOutlineEye
                                    className="eye"
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="eye"
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>
                    </div>
                    <button id="login-Button" type='submit'>Create Account</button>
                    <div className="or">
                        <p>Or 😉</p>
                    </div>
                    <div className="options">
                        <CiFacebook id="F" class="fa-brands fa-google" />
                    </div>
                    <p className="signUp">Need to create an account?  <Link className='Link' to='/login'>Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register
