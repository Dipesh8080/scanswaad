import React, { useState } from 'react';
import MenuItem from '../components/MenuItem';
import QRGenerator from '../components/QRGenerator';
import PaymentGateway from '../components/PaymentGateway';
import './Menu.css';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const menuItems = [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Tender chicken in a rich tomato and butter sauce",
      price: 320,
      category: "Main Course",
      veg: false
    },
    {
      id: 2,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with spices",
      price: 280,
      category: "Starter",
      veg: true
    },
    {
      id: 3,
      name: "Dal Makhani",
      description: "Creamy black lentils slow-cooked to perfection",
      price: 220,
      category: "Main Course",
      veg: true
    },
    {
      id: 4,
      name: "Garlic Naan",
      description: "Leavened bread with garlic butter",
      price: 60,
      category: "Bread",
      veg: true
    },
    {
      id: 5,
      name: "Biryani",
      description: "Fragrant rice dish with vegetables",
      price: 250,
      category: "Main Course",
      veg: true
    }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePaymentSuccess = () => {
    setCart([]);
    setShowPayment(false);
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <button 
          onClick={() => setShowQRGenerator(!showQRGenerator)}
          className="qr-toggle-btn"
        >
          {showQRGenerator ? 'Hide QR Generator' : 'Generate Menu QR Code'}
        </button>
      </div>
      
      {showQRGenerator && <QRGenerator />}
      
      <div className="menu-container">
        <div className="menu-items">
          {menuItems.map(item => (
            <MenuItem 
              key={item.id} 
              item={item} 
              onAdd={() => addToCart(item)}
              inCart={cart.some(cartItem => cartItem.id === item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
        
        <div className="cart-section">
          <h2>Your Order</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => setShowPayment(true)}
                className="checkout-btn"
                disabled={cart.length === 0}
              >
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
      
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <button 
              onClick={() => setShowPayment(false)}
              className="close-modal-btn"
            >
              <i className="fas fa-times"></i>
            </button>
            <PaymentGateway 
              totalAmount={totalAmount} 
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
