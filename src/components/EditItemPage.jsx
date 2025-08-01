import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditItemPage.css';
import { BASE_URL } from "../api";
import { Check, Trash2 } from 'lucide-react';

const allowedCategories = ['main course', 'sides', 'juice', 'icecream', 'snacks', 'desserts & bakes'];

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    amount: '',
    quantity: '',
    itemImage: ''
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/items/${id}`);
        setItem(res.data.item);
        setFormData({
          itemName: res.data.item.itemName,
          category: res.data.item.category,
          amount: res.data.item.amount,
          quantity: res.data.item.quantity,
          itemImage: res.data.item.itemImage
        });
      } catch (err) {
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/items/${id}`, formData);
      alert('Item updated successfully');
      navigate('/Admintoshow');
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${BASE_URL}/items/${id}`);
        alert('Item deleted');
        navigate('/Admintoshow');
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className='wholecontainer'>
    <h2>Edit Menu Item</h2>
    <div className="edit-container">
      
      <div className="edit-item-card">
        <img src={formData.itemImage} alt={formData.itemName} className="edit-item-image" />
        <div className="edit-item-content">
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Item Name"
            className="edit-input"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="edit-input"
          >
            {allowedCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="edit-input"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="edit-input"
          />
          <input
            type="text"
            name="itemImage"
            value={formData.itemImage}
            onChange={handleChange}
            placeholder="Image URL"
            className="edit-input"
          />

          <div className="edit-icon-buttons">
            <Check className="icon tick-icon" onClick={handleUpdate} />
            <Trash2 className="icon delete-icon" onClick={handleDelete} />
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default EditItemPage;
