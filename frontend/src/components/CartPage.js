import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/getcart')
      .then(res => setCartItems(res.data))
      .catch(err => console.error('Failed to load cart items', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletecart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handleCheckout = () => {
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    navigate("/checkout");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="row border p-3 mb-3 align-items-center">
                <div className="col-md-2 text-center">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    style={{ height: "120px", width: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-6">
                  <h5>{item.name}</h5>
                  <p>Seller: {item.seller || "DefaultSeller"}</p>
                  <p className="text-success">₹{item.price}</p>
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <button className="btn btn-outline-secondary">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-outline-secondary">+</button>
                </div>
                <div className="col-md-2 text-end">
                  <button className="btn btn-link text-danger" onClick={() => handleDelete(item.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div className="text-end mt-4">
              <button className="btn btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
