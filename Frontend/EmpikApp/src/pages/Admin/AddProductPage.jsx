import React, { useState,useContext } from 'react';
import axiosInstance from "../../interceptors/axiosInstance.jsx";
import { Link } from "react-router-dom";
import PATH from "../../paths";
import { UserContext } from "../../App.jsx";
import {useDispatch,useSelector } from "react-redux";
import "../../styles/add_product.css";
import { logout } from "../../actions/auth.js";

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        producer: '',
        description: '',
        recommendedAge: '',
        recommendedSex: '',
        material: '',
        heightInMilimeters: '',
        widthInMilimeters: '',
        depthInMilimeters: '',
        weightInGrams: '',
        category: '',
        variant: '',
        image: null
    });

    const { userRoleContext, setUserRoleContext } = useContext(UserContext);
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData();

        for (const key in formData) {
            productData.append(key, formData[key]);
        }

        try {
            const response = await axiosInstance.post('/products', productData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        } catch (error) {
            console.error('There was an error creating the product!', error);
            alert('There was an error creating the product!');
        }
    };

    return (
        <div>
            <div className='topbar5'>
                <img src="/src/images/Product/logo.png" className="logo" alt="Logo" />
                <div className='topbar-right'>
                    <Link to={PATH.PRODUCT}>
                        <button className='product'>Products</button>
                    </Link>
                    <Link to={PATH.SHOPPING_CART}>
                        <button className='product'>Shopping cart</button>
                    </Link>
                    <Link to={PATH.PROFILE}>
                        <button className='product'>Profile</button>
                    </Link>
                    <Link to={PATH.ADMIN_BOARD}>
                    {userRoleContext === "admin" ? (
                        <button className='product'>Panel Admina</button>
                    ) : (
                        <span></span>
                    )}
                    </Link>
                </div>
                {userState.isLoggedIn ? (
                    <div className={userRoleContext === "admin" ? 'logout admin-logout' : 'logout'}>
                        <button
                            className='logout-button'
                            onClick={logOut}
                        >Log Out</button>
                    </div>
                ) : (
                    <div className='logout'>
                        <Link to={PATH.LOGIN}>
                            <button className='logout-button'>Login</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="form-container">
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Producer:</label>
                        <input
                            type="text"
                            name="producer"
                            value={formData.producer}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Recommended Age:</label>
                        <input
                            type="number"
                            name="recommendedAge"
                            value={formData.recommendedAge}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Recommended Sex:</label>
                        <input
                            type="text"
                            name="recommendedSex"
                            value={formData.recommendedSex}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Material:</label>
                        <input
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="dimensions">
                        <div className="form-group">
                            <label>Height (mm):</label>
                            <input
                                type="number"
                                name="heightInMillimeters"
                                value={formData.heightInMillimeters}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Width (mm):</label>
                            <input
                                type="number"
                                name="widthInMillimeters"
                                value={formData.widthInMillimeters}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Depth (mm):</label>
                            <input
                                type="number"
                                name="depthInMillimeters"
                                value={formData.depthInMillimeters}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Weight (g):</label>
                            <input
                                type="number"
                                name="weightInGrams"
                                value={formData.weightInGrams}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Variant:</label>
                        <input
                            type="text"
                            name="variant"
                            value={formData.variant}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;



