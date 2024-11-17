import React, { useState } from 'react';
import { useCars } from '../../contexts/CarContext';
import { Link } from 'react-router-dom';

const Search = () => {
    const { searchCar } = useCars();
    const [query, setQuery] = useState('');
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            setFilteredCars([]);
        } else {
            setLoading(true);
            try {
                const res = await searchCar(query);
                setFilteredCars(res);
            } catch (error) {
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="bg-transparent flex flex-col  pt-1 mb-8 items-center">
            <form className="w-full max-w-xl rounded-3xl">
                <div className="flex mx-2 items-center bg-white border border-gray-300 rounded-3xl shadow-md">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a car..."
                        className="w-full p-3 text-gray-700 rounded-3xl outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-3 rounded-3xl font-semibold transition ${loading
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-[#050b20] text-white hover:bg-gray-800'
                            }`}
                    >
                        {loading ? (
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-white rounded-full"></div>
                        ) : (
                            'Search'
                        )}
                    </button>
                </div>
                <div className="w-full max-w-xl">
                    {error && <p className="text-gray-600 w-full py-5 px-3 max-w-xl text-sm absolute bg-white z-10 text-center rounded-lg shadow-lg mt-2">{error}</p>}
                    {filteredCars?.length > 0 && (
                        <ul className="absolute z-10 max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
                            {filteredCars.map((car) => (
                                <Link to={`/cars/${car._id}`}
                                    key={car._id}>
                                    <li
                                        className="flex items-center p-4 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <img
                                            src={car.images[0]}
                                            alt={car.title}
                                            className="w-12 h-12 object-cover rounded-md mr-4"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold text-[#050b20]">{car.title}</h2>
                                            <p className="text-gray-600 text-sm line-clamp-1">{car.description}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Search;
