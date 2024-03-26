const express = require("express");
const ItemRouter = express.Router();

const {
    addItem,
    getAllItems,
    getOneItem,
    updateitem,
    deleteItem,
} = require("../controller/item.controller");

const authMiddleware = require("../middlewares/authMiddleware");

ItemRouter.post('/create', authMiddleware, addItem);
ItemRouter.get('/items', authMiddleware, getAllItems);
ItemRouter.get('/item/:id', authMiddleware, getOneItem);
ItemRouter.patch('/itemUpdate/:id', authMiddleware, updateitem);
ItemRouter.delete('/deleteItem/:id', authMiddleware, deleteItem);



module.exports = ItemRouter;