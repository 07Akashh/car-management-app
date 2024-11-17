import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CarFormComponent from '../../components/Car/CarForm';
import { useCars } from '../../contexts/CarContext';
import Spinner from '../../components/Common/Spinner';

const CarForm = () => {
    const { id } = useParams();
    const { addCar, editCar, loadCarById } = useCars();
    const [isUpdating, setIsUpdating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await loadCarById(id);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            setIsUpdating(true);
            fetchCar();
        } else {
            setIsUpdating(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSubmit = async (carData) => {
            if (id) {
                const res=  await editCar(id, carData);
                return res;
            } else {
                const res= await addCar(carData);
                return res;
            }
            // await loadCars(page);
            // navigate('/cars');
    };

    return (
        <div className="bg-white min-h-screen px-4 sm:px-10 xl:px-0 rounded-2xl lg:rounded-3xl xl:rounded-[60px]">
            <div className="container mx-auto rounded-2xl lg:rounded-3xl xl:rounded-[60px]">
                <h2 className="text-2xl font-semibold text-center py-4 mb-4">{id ? 'Edit Car' : 'Add New Car'}</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <CarFormComponent onSubmit={handleSubmit} car={car} isUpdating={isUpdating} />
                )}
            </div>
        </div>
    );
};

export default CarForm;
