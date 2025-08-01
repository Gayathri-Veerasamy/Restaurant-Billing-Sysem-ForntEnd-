import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin_to_show.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../api";
import { Pencil, Trash2 } from 'lucide-react';

const Admin_to_show = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items`);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (item) => {
  navigate(`/edit/${item._id}`);
};


  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${BASE_URL}/items/${itemId}`);
        setItems(prevItems => prevItems.filter(item => item._id !== itemId));
      } catch (error) {
        console.error("Delete failed:", error);
      }
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
        
      <h2 className="admin-heading">Manage Menu Items</h2>
      <div className="item-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <img src={item.itemImage} alt={item.itemName} className="item-image" />
            <div className="item-content">
              <div className="item-title-price">
                <h3>{item.itemName}</h3>
                <p className="amount">₹{item.amount}</p>
              </div>
              <p>Available: {item.quantity}</p>
              <div className="admin-icons">
                <Pencil className="icon edit-icon" onClick={() => handleEdit(item)} />
                <Trash2 className="icon delete-icon" onClick={() => handleDelete(item._id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div></>
  );
};

export default Admin_to_show;
