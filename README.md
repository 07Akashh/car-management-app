# **Car Management System - Frontend**

The **Car Management System** frontend is a feature-rich web application for managing car details, providing a responsive UI and seamless integration with backend APIs.

---

## **Features**

- **Authentication**: User login, signup, and password recovery.
- **Car Management**: Add, edit, view, and delete car details.
- **Image Upload**: Support for multiple image uploads using Cloudinary.
- **Search and Filter**: Easily find cars using search and filters.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

---

## **Technologies Used**

- **React**: Frontend library for building user interfaces.
- **Axios**: For making HTTP requests.
- **React Router**: For handling navigation.
- **Tailwind CSS**: Utility-first styling framework.
- **Cloudinary**: For image uploads.
- **Context API**: For global state management.

---

## **Project Structure**

```plaintext
car-management-app/
│
├── public/
│   ├── index.html        # Main HTML file
│   ├── favicon.ico       # App icon
│   └── assets/           # Static files like images, fonts, etc.
│
├── src/
│   ├── api/              # API request functions
│   ├── components/       # Reusable UI components
│   ├── contexts/         # Context providers for global state
│   ├── pages/            # Full pages
│   ├── routes/           # App routes
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── index.js          # Entry point of the app
│
├── .env                  # Environment variables (API keys, etc.)
├── .gitignore            # Files to ignore in Git
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## **Setup Instructions**

### Prerequisites

- **Node.js**: Install from [Node.js](https://nodejs.org/).
- **npm or yarn**: Package manager.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/07Akashh/car-management-app.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd car-management-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Setup environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_CLOUDINARY_URL=your_cloudinary_url
   ```
5. **Start the development server**:
   ```bash
   npm start
   ```

---

## **Scripts**

- **`npm start`**: Start the development server.
- **`npm run build`**: Build the app for production.
- **`npm run lint`**: Lint and fix code issues.

---

## **API Integration**

API requests are defined in the `src/api/` directory. Example:

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const fetchCars = async () => {
    const response = await api.get('/cars');
    return response.data;
};

export const addCar = async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
};
```

---

## **Custom Components**

### **Reusable Components**  
- **Button**: Customizable button component.  
- **Modal**: Reusable modal for confirmation or alerts.  
- **Spinner**: Loading spinner for API calls.  

### **Authentication Components**
- **LoginForm**: Form for user login.  
- **SignUpForm**: Form for user registration.  

---

## **Routes**

- **Public Routes**: `/login`, `/signup`, `/`
- **Protected Routes**: `/cars`, `/cars/:id`, `/add-car`, `/edit-car/:id`

---

## **Styling**

This project uses **Tailwind CSS**.
To add custom styles, modify the `globals.css` file or define component-specific styles using modules.

---

## **License**

This project is licensed under the MIT License.
