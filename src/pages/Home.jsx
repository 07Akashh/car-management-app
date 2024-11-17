import React from 'react';
import CarListComponent from '../components/Car/CarList';
import Spinner from '../components/Common/Spinner';
import { useCars } from '../contexts/CarContext';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Breadcrumb from '../components/Common/BreadCrumb';
import Search from '../components/Common/Search';


const Home = () => {
    const { userCars, loading, page, setPage, totalPages } = useCars();
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber);
        }
    };

    if (loading) return <Spinner />;

    return (
        <>
            <Search />
            <div className="bg-white min-h-screen px-4 sm:px-10 xl:px-0 rounded-2xl lg:rounded-3xl xl:rounded-[60px]">
                <div className="container mx-auto">
                    <Breadcrumb />
                    <h2 className="text-2xl font-semibold mb-4">My Cars</h2>
                    <CarListComponent cars={userCars} />

                    {/* Pagination Controls */}
                    <div className="flex justify-center pb-5 mt-6">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            className="h-10 w-10 bg-blue-500 text-white rounded-full disabled:opacity-50"
                            disabled={page === 1}
                        >
                            <IoIosArrowBack className='text-2xl m-auto' />
                        </button>
                        <span className="my-auto mx-2">{`Page ${page} of ${totalPages}`}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            className="h-10 w-10 bg-blue-500 text-white rounded-full disabled:opacity-50"
                            disabled={page === totalPages}
                        >
                            <IoIosArrowForward className='text-2xl m-auto' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

