const express = require("express");
const ItemRouter = express.Router();


const {
    addItem,
    getAllItems,
    getOneItem,
    updateitem,
    deleteItem,
    deleteImgFromLocalStorage,
    searchItem,
    generateInvoice,
    addComment,
    getUserItem,
} = require("../controller/item.controller");

// const authMiddleware = require("../middlewares/authMiddleware");

const AllRoutes = (upload) => {
    ItemRouter.post('/create', upload.single("file"), addItem);
    ItemRouter.get('/items', getAllItems);
    ItemRouter.get('/item/:id', getOneItem);
    ItemRouter.get('/:id/items', getUserItem);
    ItemRouter.get('/searchItem', searchItem);
    ItemRouter.patch('/itemUpdate/:id', upload.single("file"), updateitem);
    ItemRouter.delete('/deleteItem/:id', deleteItem);
    ItemRouter.delete('/deleteImage/:imagename', deleteImgFromLocalStorage);
    ItemRouter.get('/generate-invoice', generateInvoice);
    ItemRouter.post('/comment/:id', addComment);
    return ItemRouter;
}



module.exports = AllRoutes;