import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useCars } from '../../contexts/CarContext';

const Breadcrumb = () => {
    const location = useLocation();
    const { id } = useParams();
    const { loadCarById } = useCars();
    const [carTitle, setCarTitle] = useState(null);
    const paths = location.pathname.split('/').filter(Boolean);


    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const res = await loadCarById(id);
                setCarTitle(res.data.title);
            } catch (error) {
                console.error('Error loading car details:', error);
            } finally {
            }
        };
        if (id) {
            fetchCarDetails();
        }
    }, [id, loadCarById]);

    const breadcrumbPaths = paths.length === 0
        ? [{ name: 'Home', url: '/' }]
        : [{ name: 'Home', url: '/' }, ...paths.map((path, index) => {
            const isIdSegment = path === id && carTitle;
            const name = isIdSegment ? carTitle : path.charAt(0).toUpperCase() + path.slice(1);
            return {
                name,
                url: '/' + paths.slice(0, index + 1).join('/'),
            };
        })];

    return (
        <nav className="bg-none p-4 rounded-md">
            <ol className="flex space-x-1">
                {breadcrumbPaths.map((path, index) => (
                    <li key={index} className="flex items-center">
                        {index < breadcrumbPaths.length - 1 ? (
                            <Link to={path.url} className="text-blue-600 hover:text-blue-800">
                                {path.name}
                            </Link>
                        ) : (
                            <span className="text-gray-600">{path.name}</span>
                        )}
                        {index < breadcrumbPaths.length - 1 && (
                            <span className="mx-1 text-gray-600">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>

    );
};

export default Breadcrumb;

