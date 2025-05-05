// ✅ Best practice: combine with React import
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';


const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryCharges] = useState(100); // You can set this dynamically
    const [protectPromiseFee] = useState(88); // Can be a static fee or dynamic
  
    useEffect(() => {
      const cartData = JSON.parse(localStorage.getItem("checkoutItems")) || [];
      setCartItems(cartData);
  
      // Calculate total price from cart
      const price = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      setTotalPrice(price);
    }, []);
  
    // Total Payable calculation
    const totalPayable = totalPrice + deliveryCharges + protectPromiseFee;
  
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <h3>Checkout</h3>
          {cartItems.length === 0 ? (
            <p>No items in checkout.</p>
          ) : (
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td><img src={`http://localhost:5000${item.image}`} alt={item.name} width="60" /></td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  
              {/* Price Details Section */}
              <div className="price-details">
                <div className="d-flex justify-content-between">
                  <span>Price ({cartItems.length} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
               
                <hr />
                <div className="d-flex justify-content-between">
                  <span><strong>Total Payable</strong></span>
                  <span><strong>₹{totalPrice}</strong></span>
                </div>
              </div>
  
              {/* Checkout Button */}
              <button className="btn btn-primary mt-4">Proceed to Payment</button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default CheckoutPage;
  