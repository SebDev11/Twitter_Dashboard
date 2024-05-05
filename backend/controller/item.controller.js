const itemModel = require("../models/item.model");
const pdfCreator = require('pdf-creator-node');
const fs = require('fs'); //Use Node.js's fs module to delete the file from the filesystem.
const path = require('path');
const moment = require("moment"); //Use for format date and time

//Add/Create item router controller
const addItem = async (req, res) => {
    try{

        const { itemName, itemCategory, itemPrice, itemQty, itemDescription } = req.body;

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
            itemPrice: itemPrice,
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

// Function to generate and serve the PDF invoice
const generateInvoice = async (req, res) => {
    try {
        const htmlTemplate = fs.readFileSync(path.join(__dirname, '../template/invoice-template.html'), 'utf-8');
        
        const date = moment().format('YYYY MMMM DD');
        const timestamp = moment().format('YYYY_MMMM_DD_HH_mm_ss');
        const filename = 'Item_Management_' + timestamp + '_doc' + '.pdf';
      
        const items = await itemModel.find({});

        let itemArray = [];

        items.forEach(i => {
            const totalPrice = i.itemQty * i.itemPrice; // Calculate total price for each item
            const it = {
                itemName: i.itemName,
                itemCategory: i.itemCategory,
                itemQty: i.itemQty,
                itemPrice: i.itemPrice,
                totalPrice: totalPrice // Include the total price in the item object
            }
            itemArray.push(it);
        })
        
        // Calculate the total amount by reducing the items array
        const grandTotal = itemArray.reduce((total, item) => total + item.totalPrice, 0); //0: This is the initial value of total. In this case, it starts at 0.

        // Taking logo path
        const logoPath = path.join(__dirname, '../template/images/logo.png');
        // Load the logo image asynchronously
        const logoBuffer = await fs.promises.readFile(logoPath);
        // Encode the logo buffer to base64
        const logoBase64 = logoBuffer.toString('base64');

        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
            header: {
                height: '0mm',
            },
            footer: {
                height: '0mm',
            },
            zoomFactor: '1.0',
            type: 'buffer',
        };

        const document = {
            html: htmlTemplate,
            data: {
                itemArray,
                grandTotal,
                date,
                logoBuffer: logoBase64, // Pass the logo buffer to the HTML template
            },
            path: './docs/' + filename,
        };

        const pdfBuffer = await pdfCreator.create(document, options);

        const filepath = 'http://localhost:8000/docs/' + filename;

        // Send the file path in the response
        res.status(200).json({ filepath, filename });
        // res.contentType('application/pdf');
        // res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF invoice:', error);
        res.status(500).send('Internal Server Error');
    }
};


//get - search perticular item
const searchItem = async (req, res) => {

    try{

        const ItemName = req.query.itemName;
        // Using a regular expression to match partial game names
        const item = await itemModel.find({ itemName: { $regex: ItemName, $options: 'i' } }); //the $regex operator in MongoDB is used to perform a regular expression search for partial matches of the game name. The i option is used to perform a case-insensitive search.

        return res.status(200).send({
            status: true,
            message: "✨ :: Project Searched and fetched!",
            searchedItem: item
        })

    }catch(err){

        return res.status(500).send({
            status: false,
            message: err.message
        });

    }

}


//Update item details router controller
const updateitem = async (req, res) => {

    try{

        const itemID = req.params.id;
        const { itemName, itemCategory, itemPrice, itemQty, itemDescription } = req.body; 

        const itemData = {
            itemName: itemName,
            itemCategory: itemCategory,
            itemPrice: itemPrice,
            itemQty: itemQty,
            itemDescription: itemDescription,
        }

        // Check if file exists in the request then only send image with itemData object
        if (req.file) {
            itemData.itemImage = req.file.filename; // Extract the filename from the uploaded file
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
    searchItem,
    updateitem,
    deleteItem,
    deleteImgFromLocalStorage,
    generateInvoice,
}