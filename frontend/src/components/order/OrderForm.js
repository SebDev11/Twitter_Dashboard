// OrderForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch items from backend when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/items'); // Adjust the API endpoint as needed
      setItems(response.data.AllItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleItemChange = (itemId, isChecked) => {
    if (isChecked) {
      // Add the item to selectedItems
      const selectedItem = items.find(item => item._id === itemId);
      setSelectedItems([...selectedItems, selectedItem]);
      setTotalPrice(totalPrice + selectedItem.itemPrice);
    } else {
      // Remove the item from selectedItems
      const updatedItems = selectedItems.filter(item => item._id !== itemId);
      setSelectedItems(updatedItems);
      const removedItem = items.find(item => item._id === itemId);
      setTotalPrice(totalPrice - removedItem.itemPrice);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create order request
      const response = await axios.post('http://localhost:8000/order/ordercreate', {
        itemIds: selectedItems.map(item => item._id),
      });
      console.log('Order created:', response.data.order);
      console.log(response.data.order._id);
      
      alert("🍟 Order Created!");
      
      navigate(`/payment/${response.data.order._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h2>Add Items to Order</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {items.map(item => (
            <li key={item._id}>
              <label>
                <input
                  type="checkbox"
                  onChange={e => handleItemChange(item._id, e.target.checked)}
                />
                {item.itemName} - ${item.price}
              </label>
            </li>
          ))}
        </ul>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
