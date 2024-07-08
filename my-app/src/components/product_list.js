import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/product_service';
import ProductItem from './product_item';

const ProductList = ({ refresh }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(page, limit, filters);
                setProducts(data.products);
                setTotalPages(data.totalPages);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchProducts();
    }, [page, limit, filters, refresh]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <h1>Product List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {products.map((product) => (
                <ProductItem key={product._id} product={product} />
            ))}
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
