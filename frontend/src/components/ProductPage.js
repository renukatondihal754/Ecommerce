// // ProductPage.js
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductPage = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     // Fetch the product by ID
//     axios.get(`http://localhost:5000/api/products/${productId}`)
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         console.error('There was an error fetching the product!', error);
//       });
//   }, [productId]);

//   const handleAddToCart = () => {
//     // Logic to add product to cart
//   };

//   if (!product) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <img src={product.image} alt={product.name} />
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductPage;
