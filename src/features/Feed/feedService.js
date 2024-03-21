import axios from 'axios';

const API_URL = 'https://abanchiqschoolapi.onrender.com/api/auth/adminstration/shop';

export const addPost = async (postData, token) => {
    const response = await axios.post(API_URL, postData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(token);
    return response.data;
};


export const getAllFeeds = async () => {
    const response = await axios.get(API_URL, {
        // headers: {
        // Authorization: `Bearer ${token}`,
        // },
    });
    return response.data;
};

export const getSingleFeed = async (id) => {
    const response = await axios.get(`${API_URL}/find/${id}`, {
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
    });
    return response.data;
};
export const updateSingleFeed = async (id, token, formData) => {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteFeed = async (id, token) => {
    console.log(token);
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};