import React from 'react';
import { deleteProduct } from '../services/product_service';

const ProductItem = ({ product }) => {
    const [error, setError] = useState('');

    const handleDelete = async () => {
        try {
            await deleteProduct(product._id);
            window.location.reload(); // Trigger a state update in the parent component to refresh the list
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock_quantity}</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleDelete}>Delete</button>
            
        </div>
    );
};


export default ProductItem;
