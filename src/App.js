
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CarProvider } from './contexts/CarContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import PrivateRoute from './utils/privateRoute';
import Home from './pages/Home';
import CarForm from './pages/Cars/CarForm';
import CarList from './pages/Cars/CarList';
import CarDetails from './pages/Cars/CarDetails';


const App = () => (

  <AuthProvider>
    <CarProvider>
      <Router>
        <Header />
        <main className='bg-[#050b20] min-h-screen'>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/add-car" element={<CarForm />} />
                <Route path="/edit-car/:id" element={<CarForm />} />
            </Route>
            <Route path="/" element={<CarList />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/cars/:id" element={<CarDetails />} />
        </Routes>
          {/* <AuthRoutes />
          <ProtectedRoutes /> */}
        </main>
        <Footer />
      </Router>
    </CarProvider>
  </AuthProvider>
);

export default App;