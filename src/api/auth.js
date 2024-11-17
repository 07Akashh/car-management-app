import axiosInstance from './axiosInstance';

export const loginUser = async (credentials) => {
    const { data } = await axiosInstance.post('/user/login', credentials);
    return data;
};

export const registerUser = async (userInfo) => {
    const { data } = await axiosInstance.post('/user/register', userInfo);
    return data;
};

export const logoutUser = async () => {
    const { data } = await axiosInstance.post('/user/logout');
    return data;
};

export const getUser = async () => {
    const { data } = await axiosInstance.get('/user');
    return data;
};