// orderController.js
const OrderModel = require('../models/order.model');
const ItemModel  = require('../models/item.model');

const orderController = {
  // Controller function for creating a new order
  async createOrder(req, res) {
    try {
      const { itemIds } = req.body;

      // Calculate total price based on the items
      let totalPrice = 0;

      const items = await ItemModel.find({ _id: { $in: itemIds } });
      
      if (!items) {
        return res.status(404).json({ 
          success: false,
          error: 'Items not found' 
        });
      }

      items.forEach(item => {
        totalPrice += item.itemPrice; // Assuming each item has a price field
      });

      // Create the new order
      const order = new OrderModel({
        // items: items.map(item => item._id),
        items: items,
        totalPrice: totalPrice,
        // You can add more fields here if needed
      });

      // Save the order to the database
      await order.save();

      res.status(201).json({
        success: true,
        order 
      });

    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ success: false, error: 'Internal server error : ' + error.message });
    }
  },

  // Controller function for getting all orders
  async getAllOrders(req, res) {
    try {
      const orders = await OrderModel.find().populate('items'); // Populate the 'items' field;
      
      res.json({ 
        success: true, 
        orders 
      });

    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },

  // Controller function for getting a single order by ID
  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await OrderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }
      res.json({ success: true, order });
    } catch (error) {
      console.error('Error getting order by ID:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },

  // Controller function for updating an order by ID
  async updateOrder(req, res) {
    try {
      const { orderId } = req.params;
      const updateData = req.body;

      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      res.json({ success: true, order: updatedOrder });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },

  // Controller function for deleting an order by ID
  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;

      const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ success: false, error: 'Order not found' });
      }

      res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  },
};

module.exports = orderController;
