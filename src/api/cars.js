import axiosInstance from './axiosInstance';

export const fetchCars = async () => {
    const { data } = await axiosInstance.get('/car');
    return data;
};

export const fetchUserCars = async () => {
    const { data } = await axiosInstance.get('/car/user');
    return data;
};

export const fetchCarDetails = async (carId) => {
    const { data } = await axiosInstance.get(`/car/${carId}`);
    return data;
};

export const createCar = async (carData) => {
    const { data } = await axiosInstance.post('/car', carData);
    return data;
};

export const updateCar = async (carId, updatedCarData) => {
    console.log(updatedCarData);
    const { data } = await axiosInstance.put(`/car/${carId}`, updatedCarData);
    return data;
};


export const search = async (query) => {
    const { data } = await axiosInstance.get(`/car/search?query=${encodeURIComponent(query)}`);
    return data;
};

export const deleteCar = async (carId) => {
    const { data } = await axiosInstance.delete(`/car/${carId}`);
    return data;
};

export const uploadImages = async (imageFiles) => {
    const formData = new FormData();

    imageFiles.forEach((file) => {
        formData.append('images', file);
    });

    const { data } = await axiosInstance.post('/images/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return data;
};
