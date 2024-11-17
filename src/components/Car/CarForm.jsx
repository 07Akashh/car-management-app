import React, { useState, useEffect } from 'react';
import { uploadImages } from '../../api/cars';
import { useCars } from '../../contexts/CarContext';
import { useNavigate } from 'react-router-dom';

const CarForm = ({ onSubmit, car = {}, isUpdating = false }) => {
    const { loadCars, page } = useCars();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        title: car?.title || '',
        description: car?.description || '',
        tags: car?.tags || '',
        images: [],
        company: '',
        dealer: '',
        price: '',
        year: '',
        mileage: '',
        color: '',
        transmission: '',
        fuelType: '',
    });
    const [imagePreview, setImagePreview] = useState([]);

    useEffect(() => {
        if (isUpdating && car) {
            setImagePreview(car.images || []);
            setFormData((prevData) => ({
                ...prevData,
                title: car.title || '',
                description: car.description || '',
                tags: car.tags || '',
                images: car.images || [],
            }));
        }
    }, [car, isUpdating]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDeleteImage = (index) => {
        const updatedImages = imagePreview.filter((_, i) => i !== index);
        setImagePreview(updatedImages);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (images.length === 0 && imagePreview.length === 0 && !isUpdating) {
                setMessage('Please select images to upload.');
                return;
            }

            let finalImages = [...imagePreview];

            if (images.length > 0) {
                const response = await uploadImages(images);
                setImagePreview((prevImages) => [...prevImages, ...response.images]);
                finalImages = [...finalImages, ...response.images];
            }

            const finalData = {
                ...formData,
                images: finalImages,
                dealer: parseInt(formData.dealer, 10),
                price: parseFloat(formData.price),
                year: parseInt(formData.year, 10),
                mileage: parseInt(formData.mileage, 10)
            };

            if (isUpdating) {
                try {
                    await onSubmit({ title: formData.title, description: formData.description, tags: formData.tags, images: finalImages });
                    await loadCars(page);
                    navigate('/cars');
                } catch (error) {
                    setMessage(error.response.data.error);
                    console.log(error.response.data.error);
                }
            } else {
                try {
                    await onSubmit(finalData);
                    await loadCars(page);
                    navigate('/cars');
                } catch (error) {
                    setMessage(error.response.data.error);
                    console.log(error.response.data.error);
                }
            }
        } catch (error) {
            setMessage('Error uploading images.');
        } finally {
            setLoading(false)
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl mx-auto">
            <div className="mb-6">
                <label htmlFor="title" className="text-lg font-semibold text-gray-700">Car Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="text-lg font-semibold text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="tags" className="text-lg font-semibold text-gray-700">Tags (e.g., SUV, 4x4)</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-6">
                <label htmlFor="imageUpload" className="text-lg font-semibold text-gray-700">Upload an Image</label>
                <input
                    type="file"
                    id="imageUpload"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imagePreview && imagePreview.map((image, index) => (
                    <div key={index} className="mt-4 relative">
                        <img
                            src={image}
                            alt={`Preview ${index}`}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />

                        <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            {!isUpdating && (
                <>
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="company" className="text-lg font-semibold text-gray-700">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dealer" className="text-lg font-semibold text-gray-700">Dealer</label>
                            <input
                                type="number"
                                placeholder='249784'
                                id="dealer"
                                name="dealer"
                                value={formData.dealer}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="text-lg font-semibold text-gray-700">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="year" className="text-lg font-semibold text-gray-700">Year</label>
                            <input
                                type="number"
                                placeholder='2024'
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="mileage" className="text-lg font-semibold text-gray-700">Mileage</label>
                            <input
                                type="number"
                                placeholder='1200'
                                id="mileage"
                                name="mileage"
                                value={formData.mileage}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="color" className="text-lg font-semibold text-gray-700">Color</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="transmission" className="text-lg font-semibold text-gray-700">Transmission</label>
                        <input
                            type="text"
                            placeholder='Manual, Automatic'
                            id="transmission"
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="fuelType" className="text-lg font-semibold text-gray-700">Fuel Type</label>
                        <input
                            type="text"
                            placeholder='Petrol, Diesel, Electric, Hybrid, Gasoline'
                            id="fuelType"
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </>
            )}
            {message && <div className="text-red-500 mb-4">{message}</div>}

            <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
                    </div>
                ) : (
                    isUpdating ? 'Update Car' : 'Add Car'
                )}
            </button>
        </form>
    );
};

export default CarForm;
