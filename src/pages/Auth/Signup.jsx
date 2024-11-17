import React from 'react';
import SignUpForm from '../../components/Auth/SignUpForm';
import AuthWrapper from '../../components/Auth/AuthWrapper';

const Signup = () => {
    return (
        <AuthWrapper>
            <SignUpForm />
        </AuthWrapper>
    );
};

export default Signup;
