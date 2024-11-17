import React from 'react';
import { Link } from 'react-router-dom';
import { PiSpeedometerThin, PiGasPumpThin } from "react-icons/pi";
import { GiGearStickPattern } from "react-icons/gi";
import { GoArrowUpRight } from "react-icons/go";



const CarCard = ({ car }) => {
    return (
        <div className="bg-white shadow-md rounded-lg text-[#050b20] font-['DM Sans'] ">
            <img src={car?.images[0]} alt={car.title} className="w-full h-[220px] object-cover rounded-t-2xl" />
            <div className="py-4 px-5">
                <h3 className="text-lg font-medium leading-snug ">{car.title}</h3>
                <p className="text-sm font-normal leading-[14px] line-clamp-1 mb-2 text-[#050b20]">{car.description}</p>
                <hr />
                <div className="grid text-sm text-center grid-cols-3 py-2 gap-5">
                    <div className="flex flex-col items-center space-y-2">
                        <PiSpeedometerThin className="text-2xl"/>
                        <p>{car.mileage} KM</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <PiGasPumpThin className="text-2xl"/>
                        <p>{car.fuelType}</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <GiGearStickPattern className="text-2xl"/>
                        <p>{car.transmission}</p>
                    </div>
                </div>
                <hr />
                <div className="flex py-2 justify-between">
                    <p className='text-xl font-semibold leading-[30px]'>&#8377;{car.price}</p>
                    <Link to={`/cars/${car._id}`} className="text-blue-600 gap-1 my-auto flex">View Details <GoArrowUpRight className="text-2xl"/></Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
