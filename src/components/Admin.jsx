import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Admin.css';
import { BASE_URL } from "../api";

const Admin = () => {
  const [itemName, setItemName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState(''); // State to hold the selected category
  const [imageURL, setImageURL] = useState('');

  // Define your predefined categories here
  const categories = [
    'main course', 'sides', 'juice', 'icecream', 'snacks', 'desserts & bakes'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = {
        itemName,
        startTime,
        endTime,
        amount,
        quantity,
        category,
        itemImage: imageURL,
      };
      await axios.post(`${BASE_URL}/items`, newItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setItemName('');
      setStartTime('');
      setEndTime('');
      setAmount(0);
      setQuantity(0);
      setCategory(''); // Reset category to default or empty
      setImageURL('');
      alert('Item added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add item. Please try again.');
    }
  };
  const handleLogout = () => {
  localStorage.removeItem('isAdmin');
  window.location.href = '/';
}

  return (
    <>
    
    <div className="logout-container">
  <button className="logout-button" onClick={handleLogout}>Logout</button>
</div>
    <div className="admin-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Item Name:</label>
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Availability Start Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Availability End Time:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select" required>
            <option value="">Select a Category</option> {/* Default disabled option */}
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Item Image URL:</label>
          <input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="e.g., https://example.com/image.jpg" />
        </div>
        <button type="submit" className="submit-button">Add Item</button>
      </form>
      <Link to="/AdmintoShow" className="link-button">View All Items</Link>
    </div></>
  );
};

export default Admin;
