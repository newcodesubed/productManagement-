import axios from 'axios';

const API_URL = 'http://localhost:3000/products'; // Adjust the URL as needed

export const getProducts = async (page, limit, filters) => {
    try {
        const response = await axios.get(API_URL, { params: { page, limit, ...filters } });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create product');
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update product');
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
};
