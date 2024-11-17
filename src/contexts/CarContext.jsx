import React, { createContext, useState, useContext, useEffect } from 'react';
import { createCar, updateCar, deleteCar, fetchCars, fetchCarDetails, fetchUserCars, search } from '../api/cars';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [userCars, setUserCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadCars = async (currentPage = 1) => {
        setLoading(true);
        try {
            const data = await fetchCars(currentPage);
            setCars(data.data);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error('Failed to load cars:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadUserCars = async (currentPage = 1) => {
        setLoading(true);
        try {
            const data = await fetchUserCars(currentPage);
            setUserCars(data.data);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            console.error('Failed to load cars:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadCarById = async (id) => {
        setLoading(true);
        try {
            const data = await fetchCarDetails(id);
            return data;
        } catch (error) {
            console.error('Failed to load cars:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const addCar = async (carData) => {
            const newCar = await createCar(carData);
            setCars((prevCars) => [...prevCars, newCar]);
            return newCar;
    };

    const editCar = async (carId, updatedCarData) => {
            const updatedCar = await updateCar(carId, updatedCarData);
            setCars((prevCars) =>
                prevCars.map((car) => (car._id === carId ? updatedCar : car))
            );
            return updatedCar;
    };

    const removeCar = async (carId) => {
        try {
            await deleteCar(carId);
            setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
        } catch (error) {
            console.error('Failed to delete car:', error.message);
        }
    };

    const searchCar = async (query) => {
            const res = await search(query)
            return res.data;
    }

    useEffect(() => {
        loadCars(page);
        loadUserCars(page);
    }, [page]);

    return (
        <CarContext.Provider
            value={{
                cars,
                loadUserCars,
                userCars,
                loadCars,
                searchCar,
                addCar,
                editCar,
                removeCar,
                loadCarById,
                loading,
                page,
                setPage,
                totalPages,
            }}
        >
            {children}
        </CarContext.Provider>
    );
};

export const useCars = () => useContext(CarContext);
