// // AdminPage.js
// const AdminPage = () => {
//     const [products, setProducts] = useState([]);
  
//     useEffect(() => {
//       axios.get('http://localhost:5000/api/products')
//         .then((response) => {
//           setProducts(response.data);
//         })
//         .catch((error) => {
//           console.error('There was an error fetching the products!', error);
//         });
//     }, []);
  
//     const handleAddProduct = () => {
//       // Logic to add a new product
//     };
  
//     const handleEditProduct = (productId) => {
//       // Logic to edit a product
//     };
  
//     const handleRemoveProduct = (productId) => {
//       // Logic to remove a product
//     };
  
//     return (
//       <div>
//         <h1>Admin Panel</h1>
//         <button onClick={handleAddProduct}>Add Product</button>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               {product.name}
//               <button onClick={() => handleEditProduct(product.id)}>Edit</button>
//               <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  