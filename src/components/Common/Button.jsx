import React from 'react';

const Button = ({ type = 'button', className, onClick, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={` p-2 rounded ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
