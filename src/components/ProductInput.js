import React, { useState } from 'react';
import axios from 'axios';

const ProductInput = ({ onProductAdded }) => {
    const [link, setLink] = useState('');

    const handleFetchDetails = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/products/fetch', { link });
            onProductAdded(response.data);
            setLink('');
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Paste Flipkart product link" 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
            />
            <button onClick={handleFetchDetails}>Fetch Details</button>
        </div>
    );
};

export default ProductInput;
