// react.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './login.css';
import { reset, resetPasswordData } from '../../features/Auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Components/Spinner/Spinner';
import { CiFacebook } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"


function ResetPassword() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        newPassword: '',
    });

    const { newPassword } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        const resetPasswordInfo = {
            token,
            newPassword,
        };
        dispatch(resetPasswordData(resetPasswordInfo));
    };

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess) {
            toast.success("Your password was successfullyy changed!");
            setTimeout(() => navigate('/login'), 4000);
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
                    <h1>Hello Again!</h1>
                    <h1>Almost there...</h1>
                    <h1>Let's get a new password</h1>
                    <div className="login">
                        <label id="passLabel">Type New Password</label>
                        <input className="pwInput"
                            // type="password"
                            placeholder="Type your new password"
                            id="password"
                            type={visible ? "text" : "password"}
                            name="newPassword"
                            autoComplete="current-password"
                            value={newPassword}
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
                        <p><Link className='Link' to='/login'>Login instead?</Link></p>
                    </div>
                    <button id="login-Button" type='submit'>RESET ACCOUNT PASSWORD</button>
                    <div className="or">
                        <hr />
                        <p>Or</p>
                    </div>
                    <div className="options">
                        <CiFacebook id="F" class="fa-brands fa-google" />
                    </div>
                    <p className="signUp">Need to create an account? <Link className='Link' to='/register'>SIGN UP</Link></p>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;
