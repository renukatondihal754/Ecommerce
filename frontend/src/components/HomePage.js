import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({}); // productId: quantity
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
        // Initialize quantities
        const initialQuantities = {};
        res.data.forEach(p => initialQuantities[p.id] = 1);
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category) {
      axios.get(`http://localhost:5000/api/products/by-category?category=${category}`)
      .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }
  };

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1); // ensure min 1
    setQuantities({ ...quantities, [productId]: qty });
  };

  const addToCart = async (product) => {
    const quantity = quantities[product.id] || 1;
    try {
      await axios.post('http://localhost:5000/api/addcart', {
        
        product_id: product.id,
        quantity
      });
      // navigate('/cart');
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-3">Categories</h3>
        <div className="mb-4">
  {/* Add "All" button */}
  <button
    className={`btn me-2 mb-2 ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'}`}
    onClick={() => {
      setSelectedCategory('');
      axios.get('http://localhost:5000/api/products')
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }}
  >
    All
  </button>

  {/* Render all categories dynamically */}
  {categories.map((category) => (
    <button
      key={category.id}
      className={`btn me-2 mb-2 ${selectedCategory === category.category ? 'btn-primary' : 'btn-outline-primary'}`}
      onClick={() => handleCategoryFilter(category.category)}
    >
      {category.category}
    </button>
  ))}
        </div>

        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img src={`http://localhost:5000${product.image}`} className="card-img-top" alt={product.name}    style={{
                  height: '200px',        // Fixed height
                  width: '100%',          // Full width of card
                  objectFit: 'contain'      // Maintains aspect ratio, fills box
                }}/>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-success fw-bold">₹{product.price}</p>
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control mb-2"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success mt-auto"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
