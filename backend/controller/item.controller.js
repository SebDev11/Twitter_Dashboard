const itemModel = require("../models/item.model");
const fs = require('fs'); //Use Node.js's fs module to delete the file from the filesystem.
const path = require('path');

//Add/Create item router controller
const addItem = async (req, res) => {
    try{

        const { itemName, itemCategory, itemQty, itemDescription } = req.body;

        // Check if file exists in the request
        if (!req.file) {
            return res.status(400).send({
                status: false,
                message: 'No file uploaded.'
            });
        }

        const itemImage = req.file.filename; // Extract the filename from the uploaded file

        const newItemData = {
            itemName: itemName,
            itemCategory: itemCategory,
            itemQty: itemQty,
            itemDescription: itemDescription,
            itemImage: itemImage,
        }

        const newItemObj = new itemModel(newItemData);
        await newItemObj.save();

        return res.status(200).send({
            status: true,
            message: "✨ :: Data saved successfuly!"
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


//get all item router controller
const getAllItems = async (req, res) => {

    try{

        const allItems = await itemModel.find({});

        return res.status(200).send({
            status: true,
            message: "✨ :: All items are fetched!",
            AllItems: allItems,
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })
    }

}


//get one-specified item router controller
const getOneItem = async (req, res) => {

    try{

        const itemID = req.params.id;
        const item = await itemModel.findById(itemID);

        return res.status(200).send({
            status: true,
            message: "✨ :: Item Fetched!",
            Item: item,
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })  
    }

}


//Update item details router controller
const updateitem = async (req, res) => {

    try{

        const itemID = req.params.id;
        const { itemName, itemCategory, itemQty, itemDescription } = req.body;

        const itemImage = req.file.filename; // Extract the filename from the uploaded file

        const itemData = {
            itemName: itemName,
            itemCategory: itemCategory,
            itemQty: itemQty,
            itemDescription: itemDescription,
            itemImage: itemImage,
        }

        // Check for there is item available or not in the DB
        const data = await itemModel.findById(itemID);
        if (!data) {
            return res.status(404).send({ 
                DataNotFoundMessage: '⚠️ :: Data not found!',
            });
        }

        const updateItemObj = await itemModel.findByIdAndUpdate(itemID, itemData);

        return res.status(200).send({
            status: true,
            message: "✨ :: Item Updated!",
            UpdateItemObj: updateItemObj,
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })  
    }

}


//Delete item router controller
const deleteItem = async (req, res) => {

    try{

        const itemID = req.params.id;
        const delItem = await itemModel.findByIdAndDelete(itemID);

        return res.status(200).send({
            status: true,
            message: "✨ :: Item Deleted!",
        })

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })  
    }

}


// Assuming the backend folder is at the root of the project and the frontend folder is a sibling of the backend folder
const backendDirectory = path.resolve(__dirname); // Get absolute path to the directory of the current file (item.controller.js)
// Construct path to frontend uploads directory
const frontendUploadsDirectory = path.join(backendDirectory, '../../frontend/src/uploads');

//Delete image router controller
const deleteImgFromLocalStorage = async (req, res) => {

    try{

        const imagename = req.params.filename;
        const filePath = path.join(frontendUploadsDirectory, imagename);

        console.log(filePath);

        // Check if file exists
        if (fs.existsSync(filePath)) {
            // Delete file
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({
                        errorMessage: 'Error deleting file'
                    });
                } else {
                    res.send({
                        message: 'Image deleted successfully'
                    });
                }
            });
        } else {
            res.status(404).send({
                errorMessage: 'File not found'
            });
        }

    }catch(err){
        return res.status(500).send({
            status: false,
            message: err.message,
        })  
    }

}


module.exports = {
    addItem,
    getAllItems,
    getOneItem,
    updateitem,
    deleteItem,
    deleteImgFromLocalStorage,
}