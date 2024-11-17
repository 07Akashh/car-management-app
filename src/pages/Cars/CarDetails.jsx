import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarDetail from '../../components/Car/CarDetail';
import Spinner from '../../components/Common/Spinner';
import { fetchCarDetails } from '../../api/cars';
import Breadcrumb from '../../components/Common/BreadCrumb';
import { useAuth } from '../../contexts/AuthContext';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        const fetchCarDetail = async () => {
            setLoading(true);
            try {
                const response = await fetchCarDetails(id);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarDetail();
    }, [id]);

    if (loading) return <Spinner />;

    return (
        <div className="bg-white min-h-screen rounded-2xl lg:rounded-3xl xl:rounded-[60px]">
            
            <div className="container mx-auto">
                <Breadcrumb />
                {car && <CarDetail car={car} currentUser={user}/>}
            </div>
        </div>

    );
};

export default CarDetails;
