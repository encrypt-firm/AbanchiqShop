import React, { useEffect } from 'react';
import './verify.css';
import { verifyUser, reset } from '../../features/Auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Components/Spinner/Spinner';
import { toast } from "react-toastify";

function Mail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(verifyUser(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success("Your Account Has Successfully been verified");
            setTimeout(() => navigate('/'), 4000);
        }
    }, [isSuccess, isError, message, navigate]);

    return (
        <div className='verify'>
            {isLoading ? <p><Spinner /> Verifying...</p> : null}
            {isSuccess && <>
                <h4>Your Account Has Successfully been verified</h4>
                <h4>Youll be redirected shortly</h4>
            </>
            }
            {isError && <h4>Error in verification. Please try again.</h4>}
        </div>
    );
}

export default Mail;
