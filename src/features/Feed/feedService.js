import axios from 'axios';

const API_URL = 'https://abanchiqschoolapi.onrender.com/api/auth/adminstration/shop';

export const addPost = async (postData, token) => {
    try {
        const response = await axios.post(API_URL, postData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = `An error has occurred: ${error.response.status}`;
            throw new Error(message);
        } else if (error.request) {
            console.error("The request was made but no response was received");
        } else {
            console.error("Error", error.message);
        }
    }
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
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};