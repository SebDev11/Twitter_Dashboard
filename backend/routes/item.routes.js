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
} = require("../controller/item.controller");

// const authMiddleware = require("../middlewares/authMiddleware");

const AllRoutes = (upload) => {
    // ItemRouter.post('/item/create', upload.single("itemImage"), addItem);
    ItemRouter.post('/item/create', addItem);
    ItemRouter.get('/items', getAllItems);
    ItemRouter.get('/item/:id', getOneItem);
    ItemRouter.get('/searchItem', searchItem);
    ItemRouter.patch('/itemUpdate/:id', upload.single("itemImage"), updateitem);
    ItemRouter.delete('/deleteItem/:id', deleteItem);
    ItemRouter.delete('/deleteImage/:imagename', deleteImgFromLocalStorage);
    ItemRouter.get('/generate-invoice', generateInvoice);

    return ItemRouter;
}



module.exports = AllRoutes;