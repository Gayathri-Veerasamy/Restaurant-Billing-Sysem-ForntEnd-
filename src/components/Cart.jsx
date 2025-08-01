import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import './Cart.css';
import { BASE_URL } from "../api";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.amount * item.count, 0);
  };

  const handleGenerateBill = async () => {
    // Show loading dialog
    Swal.fire({
      title: 'Processing Order...',
      text: 'Please wait while your bill is generated.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      for (const cartItem of cartItems) {
        await axios.put(`${BASE_URL}/items/${cartItem._id}`, {
          quantity: cartItem.quantity - cartItem.count,
        });
      }

      generatePDF();

      Swal.fire({
        icon: 'success',
        title: 'Order Confirmed!',
        text: 'Your bill has been downloaded successfully.',
        confirmButtonText: 'OK',
      });

      navigate('/');
    } catch (err) {
      console.error('Error updating item quantity:', err);
      Swal.fire('Error', 'Something went wrong while generating the bill.', 'error');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    doc.setFontSize(20);
    doc.text('🍽️ Restaurant Bill', 14, 20);

    doc.setFontSize(10);
    doc.text(`Date: ${date}`, 150, 15);
    doc.text(`Time: ${time}`, 150, 20);

    const tableColumn = ['Item Name', 'Amount', 'Quantity', 'Total'];
    const tableRows = cartItems.map((item) => [
      item.itemName,
      `₹${item.amount}`,
      item.count,
      `₹${item.amount * item.count}`,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        halign: 'center',
      },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Amount: ₹${calculateTotal()}`, 14, finalY);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for your order!', 14, finalY + 10);

    doc.save('Restaurant_Bill.pdf');
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Amount</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="cart-item">
                  <td>
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      className="cart-item-image"
                    />
                  </td>
                  <td>{item.itemName}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.count}</td>
                  <td>₹{item.amount * item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="total-amount">Total Amount: ₹{calculateTotal()}</h3>

          <div className="button-group">
            <button className="generate-bill-button" onClick={handleGenerateBill}>
              Confirm Order & Generate Bill
            </button>
            <button className="cancel-button" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
