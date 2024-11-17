import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { CiCalendarDate } from "react-icons/ci";
import { PiSpeedometerThin, PiGasPumpLight, PiBuildingOfficeThin, PiSubtitlesLight, PiPaintBucketLight } from "react-icons/pi";
import { GiGearStickPattern } from "react-icons/gi";
import ConfirmationPopup from '../Common/ConfirmationPopup';
import { useCars } from '../../contexts/CarContext'



const CarDetail = ({ car, currentUser }) => {
    const { removeCar } = useCars();
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleEditCar = () => {
        navigate(`/edit-car/${car._id}`);
    };

    const handleDeleteCar = () => {
        setShowPopup(true);
    };

    const confirmDelete = async () => {
        setLoading(true)
        await removeCar(car._id);
        setShowPopup(false);
        navigate('/cars');
        setLoading(false)
    };

    const cancelDelete = () => {
        setShowPopup(false);
    };

    const isOwner = car.owner._id === currentUser?._id;

    return (
        <div className="max-w-full mx-auto bg-white p-4 rounded-lg">
            <div className="text-start mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">{car.title}</h2>
                <p className="text-lg text-gray-500 mt-2">{car.tags}</p>

            </div>
            <div className="flex justify-between">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-4 text-center">
                    <div className="bg-[#e9f2ff] rounded-3xl px-4 py-2 text-[#405ff2] gap-1 flex"><CiCalendarDate className='text-xl my-auto' /> {car.year}</div>
                    <div className="bg-[#e9f2ff] rounded-3xl px-4 py-2 text-[#405ff2] gap-1 flex"><PiSpeedometerThin className='text-xl my-auto' />{car.mileage} Km</div>
                    <div className="bg-[#e9f2ff] rounded-3xl px-4 py-2 text-[#405ff2] gap-1 flex"><GiGearStickPattern className='text-xl my-auto' />{car.transmission}</div>
                    <div className="bg-[#e9f2ff] rounded-3xl px-4 py-2 text-[#405ff2] gap-1 flex"><PiGasPumpLight className='text-xl my-auto' />{car.fuelType}</div>
                </div>
                <div>
                    <div className="text-center my-auto">
                        <span className=" hidden sm:block font-semibold text-3xl text-[#050b20] leading-[45px]">&#8377;{car.price}</span>
                    </div>
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                cssMode={true}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className=""
            >
                {car.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Car ${index + 1}`}
                            className="w-full h-[300px] sm:h-[550px] object-cover rounded-lg shadow-md"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="text-center flex mb-6">
                <div className="mt-4">
                    <span className="font-normal text-[26px] leading-relaxed text-gray-800">Car Overview</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
                <div className="flex justify-between">
                    <div className='space-y-5'>
                        <p className='flex gap-1'><PiSpeedometerThin className='text-xl my-auto' />Mileage</p>
                        <p className='flex gap-1'><PiGasPumpLight className='text-xl my-auto' />Fuel Type</p>
                        <p className='flex gap-1'><CiCalendarDate className='text-xl my-auto' /> Year</p>
                        <p className='flex gap-1'><GiGearStickPattern className='text-xl my-auto' />Transmission</p>
                    </div>
                    <div className='space-y-5'>
                        <p>{car.mileage}</p>
                        <p>{car.fuelType}</p>
                        <p>{car.year}</p>
                        <p>{car.transmission}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className='space-y-5'>
                        <p className='flex gap-1'><PiSubtitlesLight className='text-xl my-auto' />Title</p>
                        <p className='flex gap-1'><PiBuildingOfficeThin className='text-xl my-auto' />Company</p>
                        <p className='flex gap-1'>&#8377; Price</p>
                        <p className='flex gap-1'><PiPaintBucketLight className='text-xl my-auto' />Color</p>
                    </div>
                    <div className='space-y-5'>
                        <p>{car.title}</p>
                        <p>{car.company}</p>
                        <p>{car.price}</p>
                        <p>{car.color}</p>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <hr />
            </div>
            <div className="text-center flex mb-6">
                <div className="mt-4">
                    <span className="font-normal text-[26px] leading-relaxed text-gray-800">Car Description</span>
                </div>
            </div>
            <p>{car.description}</p>

            {isOwner && (
                <div className="text-end space-x-5 mt-4">
                    <button
                        onClick={handleEditCar}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Update Car
                    </button>
                    <button
                        onClick={handleDeleteCar}
                        className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transition duration-300"
                    >
                        Delete Car
                    </button>
                </div>
            )}
            <ConfirmationPopup
                show={showPopup}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                loading={loading}
                message="Are you sure you want to delete this car? This action cannot be undone."
            />
        </div>
    );
};

export default CarDetail;
