import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductInput from './components/ProductInput';
import ProductList from './components/ProductList';
import './styles.css';

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const handleRecheckPrice = async (productId) => {
        const response = await axios.post('http://localhost:5000/api/products/recheck', { id: productId });
        setProducts((prevProducts) => prevProducts.map((product) => product._id === productId ? response.data : product));
    };

    return (
        <div className="App">
            <h1>Flipkart Product Price Tracker</h1>
            <ProductInput onProductAdded={handleProductAdded} />
            <ProductList products={products} onRecheckPrice={handleRecheckPrice} />
        </div>
    );
};

export default App;
