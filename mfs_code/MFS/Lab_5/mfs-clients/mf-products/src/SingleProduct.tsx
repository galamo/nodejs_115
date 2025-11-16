import React from 'react';

type ProductProps = {
    name: string;
    price: number;
    image: string; // URL to the image
};

const Product: React.FC<ProductProps> = ({ name, price, image }) => {
    return (
        <div style={styles.container}>
            <img src={image} alt={name} style={styles.image} />
            <h2 style={styles.name}>Bread</h2>
            <p style={styles.price}>15$</p>
        </div>
    );
};
const styles = {
    container: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '250px',
        textAlign: 'center' as const,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover' as const,
        borderRadius: '4px',
    },
    name: {
        fontSize: '1.2rem',
        margin: '12px 0 8px',
    },
    price: {
        fontSize: '1rem',
        color: '#333',
    },
};

export default Product;
