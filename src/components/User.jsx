import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../api";

const User = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`);
        setItems(response.data.items);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        return prevCartItems.map(cartItem =>
          cartItem._id === item._id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, count: 1 }];
      }
    });
  };

  const filteredItems = items
    .filter(item => item.quantity > 0)
    .filter(item => item.itemName.toLowerCase().includes(search.toLowerCase()))
    .filter(item => category === 'all' || item.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => a.itemName.localeCompare(b.itemName));

  return (
    <div className="user-container">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <div className="category-filters">
          {['all', 'main course', 'sides', 'juice', 'icecream', 'snacks', 'desserts & bakes'].map((cat) => (
            <button key={cat} onClick={() => handleCategoryChange(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="item-grid">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <Link to="/cart" state={{ cartItems }}>
        <button className="cart-button">Cart</button>
      </Link>
    </div>
  );
};

const ItemCard = ({ item, onAddToCart }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    if (count < item.quantity) {
      setCount(count + 1);
      onAddToCart(item);
    }
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="item-card">
      <img src={item.itemImage} alt={item.itemName} />
      <div className="item-content">
        <div className="item-title-price">
          <h3>{item.itemName}</h3>
          <p className="amount">₹{item.amount}</p>
        </div>
        <p>Available: {item.quantity}</p>
        <div className="counter">
          <button onClick={decrementCount}>-</button>
          <span>{count}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
    </div>
  );
};

export default User;
