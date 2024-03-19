// react.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { mailReset, reset } from '../../features/Auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Components/Spinner/Spinner';
import { CiFacebook } from "react-icons/ci";

function PasswordResetByMail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        const resetData = {
            email,
        };
        dispatch(mailReset(resetData));
    };

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess) {
            toast.success("We've emailed you an access token, verify to get your account back!");
            setTimeout(() => navigate('/'), 4000);
            dispatch(reset());
        }
    }, [isSuccess, isError, message, navigate, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="Login">
            <form onSubmit={onSubmit}>
                <div className="contanier">
                    <h1>Hello</h1>
                    <h1>Recover Your Account</h1>
                    <div className="login-from-mail">
                        <label id="userLabel">Email used to Create Account</label>
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
                        <p><Link className='Link' to='/login'>Login instead?</Link></p>
                    </div>
                    <button id="login-Button" type='submit'>SEND VERIFICATION</button>
                    <div className="or">
                        <hr />
                        <p>Or</p>
                    </div>
                    <div className="options">
                        <CiFacebook id="F" class="fa-brands fa-google" />
                    </div>
                    <p className="signUp">Need to create an account <Link className='Link' to='/register'>SIGN UP</Link></p>
                </div>
            </form>
        </div>
    );
}

export default PasswordResetByMail;
