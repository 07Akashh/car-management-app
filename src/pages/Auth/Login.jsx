import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import AuthWrapper from '../../components/Auth/AuthWrapper';

const Login = () => {
    return (
        <AuthWrapper>
            <LoginForm />
        </AuthWrapper>
    );
};

export default Login;
