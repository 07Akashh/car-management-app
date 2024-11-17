import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../utils/privateRoute';
import CarList from '../pages/Cars/CarList';
import CarDetails from '../pages/Cars/CarDetails';
import Home from '../pages/Home';
import CarForm from '../pages/Cars/CarForm';

const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/add-car" element={<CarForm />} />
                <Route path="/edit-car/:id" element={<CarForm />} />
            </Route>
            <Route path="/" element={<CarList />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
    );
};

export default ProtectedRoutes;
