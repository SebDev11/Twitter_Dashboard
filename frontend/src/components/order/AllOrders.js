// AllOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the backend when the component mounts
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/order/'); // Adjust the API endpoint as needed
      setOrders(response.data.orders);
      // response.data.orders.forEach(order => {
      //   order.items.forEach(item => {
      //     console.log(item.itemName);
      //   });
      // });
    } catch (error) {
      console.error('Error fetching orders: ', error.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      // Send a DELETE request to delete the order
      await axios.delete(`http://localhost:8000/order/deleteorder/${orderId}`); // Adjust the API endpoint as needed
      // Remove the deleted order from the state
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      // Optionally, you can handle error actions here, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>All Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            <th>Items</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <ul>
                  {order.items && order.items.length > 0 ? (
                      order.items.map(item => (
                        <li key={item._id}>
                          {item._id} - {item.itemName} - ${item.itemPrice ? item.itemPrice.toFixed(2) : 'N/A'}
                        </li>
                      ))
                    ) : (
                      <li>No items</li>
                    )}
                </ul>
              </td>
              <td>
                <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                {/* Add edit functionality here */}
                {/* <button onClick={() => handleEditOrder(order._id)}>Edit</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;