import React, { useState } from 'react';
import axiosInstance from "../../interceptors/axiosInstance.jsx";

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
        /*image: null*/
    });

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
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="producer" placeholder="Producer" value={formData.producer} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="number" name="recommendedAge" placeholder="Recommended Age" value={formData.recommendedAge} onChange={handleChange} required />
            <input type="text" name="recommendedSex" placeholder="Recommended Sex" value={formData.recommendedSex} onChange={handleChange} required />
            <input type="text" name="material" placeholder="Material" value={formData.material} onChange={handleChange} required />
            <input type="number" name="heightInMilimeters" placeholder="Height in Millimeters" value={formData.heightInMilimeters} onChange={handleChange} required />
            <input type="number" name="widthInMilimeters" placeholder="Width in Millimeters" value={formData.widthInMilimeters} onChange={handleChange} required />
            <input type="number" name="depthInMilimeters" placeholder="Depth in Millimeters" value={formData.depthInMilimeters} onChange={handleChange} required />
            <input type="number" name="weightInGrams" placeholder="Weight in Grams" value={formData.weightInGrams} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="text" name="variant" placeholder="Variant" value={formData.variant} onChange={handleChange} />

            <button type="submit">Create Product</button>
        </form>
    );
};

export default AddProductPage;
