import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item, onAdd, onRemove, inCart }) => {
  return (
    <div className="menu-item">
      <div className="item-info">
        <h3>{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-meta">
          <span className={`item-category ${item.veg ? 'veg' : 'non-veg'}`}>
            {item.veg ? '🟢 Veg' : '🔴 Non-Veg'}
          </span>
          <span className="item-price">₹{item.price}</span>
        </div>
      </div>
      <div className="item-actions">
        {inCart ? (
          <button onClick={onRemove} className="remove-item-btn">
            Remove
          </button>
        ) : (
          <button onClick={onAdd} className="add-item-btn">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
