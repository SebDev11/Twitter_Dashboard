const express = require("express");
const ItemRouter = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }) //define the destination where are the image will be uploaded.


const {
    addItem,
    getAllItems,
    getOneItem,
    updateitem,
    deleteItem,
    deleteImgFromLocalStorage,
} = require("../controller/item.controller");

// const authMiddleware = require("../middlewares/authMiddleware");

const AllRoutes = (upload) => {
    ItemRouter.post('/create', upload.single("itemImage"), addItem);
    ItemRouter.get('/items', getAllItems);
    ItemRouter.get('/item/:id', getOneItem);
    ItemRouter.patch('/itemUpdate/:id', upload.single("itemImage"), updateitem);
    ItemRouter.delete('/deleteItem/:id', deleteItem);
    ItemRouter.delete('/deleteImage/:imagename', deleteImgFromLocalStorage);

    return ItemRouter;
}



module.exports = AllRoutes;