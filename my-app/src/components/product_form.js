import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/product_service';

const ProductForm = ({ product, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (product) {
                await updateProduct(product._id, formData);
            } else {
                await createProduct(formData);
            }
            onSave();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Stock Quantity</label>
                <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required />
            </div>
            <div>
                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default ProductForm;
