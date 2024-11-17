import Joi from 'joi';

export const loginValidationSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
});

export const signupValidationSchema = Joi.object({
    firstName: Joi.string().min(2).required().messages({
        'string.min': 'First name must be at least 2 characters long',
        'any.required': 'First name is required',
    }),
    lastName: Joi.string().min(2).required().messages({
        'string.min': 'Last name must be at least 2 characters long',
        'any.required': 'Last name is required',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
});

export const carValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must not exceed 100 characters',
        'any.required': 'Title is required',
    }),
    description: Joi.string().min(10).max(500).required().messages({
        'string.min': 'Description must be at least 10 characters long',
        'string.max': 'Description must not exceed 500 characters',
        'any.required': 'Description is required',
    }),
    tags: Joi.string().min(3).max(50).required().messages({
        'string.min': 'Tags must be at least 3 characters long',
        'string.max': 'Tags must not exceed 50 characters',
        'any.required': 'Tags are required',
    }),
    images: Joi.array().items(Joi.string().uri()).max(10).messages({
        'array.max': 'You can upload up to 10 images',
        'string.uri': 'Each image must be a valid URL',
    }),
});
