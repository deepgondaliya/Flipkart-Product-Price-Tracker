import React from 'react';

const ProductList = ({ products, onRecheckPrice }) => {
    return (
        <div>
            {products.map((product) => (
                <div key={product._id}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>Current Price: ₹{product.currentPrice}</p>
                    <p>Reviews: {product.reviews}</p>
                    <p>Total Purchases: {product.totalPurchases}</p>
                    <button onClick={() => onRecheckPrice(product._id)}>Recheck Price</button>
                    <h4>Price History:</h4>
                    <ul>
                        {product.priceHistory.map((priceEntry, index) => (
                            <li key={index}>₹{priceEntry.price} on {new Date(priceEntry.date).toLocaleDateString()}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
