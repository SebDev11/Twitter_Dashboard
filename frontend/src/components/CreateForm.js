import React, { useState, useRef } from "react";
import axios from 'axios';

//importing CSS files
import './CreateForm.css'

const CreateForm = () => {

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    // const [itemImage, setItemImage] = useState(null);
    const fileInputRef = useRef(null); // Create a ref for file input

    const sendData = (e) => {
        e.preventDefault();

        const formData = new FormData(); // Create FormData object to append data
        formData.append('itemName', itemName);
        formData.append('itemCategory', itemCategory);
        formData.append('itemPrice', itemPrice);
        formData.append('itemQty', itemQty);
        formData.append('itemDescription', itemDescription);
        // formData.append('itemImage', itemImage);
        formData.append('itemImage', fileInputRef.current.files[0]); // Retrieve file from file input ref

        try{

            axios.post('http://localhost:8000/api/create', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                alert(res.data.message);
                console.log(res.data.status);
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("☠️ :: Error on API URL or formData object : " + err.message);
            })
    
            //set State back to first state
            setItemName('');
            setItemCategory('');
            setItemPrice('');
            setItemQty('');
            setItemDescription('');
            // setItemImage(null);

            // Clear file input by replacing it with a new one
            fileInputRef.current.value = '';

        }catch(err){
            console.log("☠️ :: sendData Function failed! ERROR : " + err.message);
        }
    }

  return (

    <div className="createFormContainer">
        
        <div className="formBootstrap">
            <h2 className="mb-4">Add Items Form</h2>

            <form onSubmit={sendData}>
                <div className="form-group mb-3">
                    <label htmlFor="itemNameID">Item Name</label>
                    <input type="text" className="form-control" id="itemNameID" placeholder="Enter Item Name" onChange={(e) => setItemName(e.target.value)} value={itemName}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="itemCategoryID">Item Category</label>
                    <input type="text" className="form-control" id="itemCategoryID" placeholder="Enter Item Category" onChange={(e) => setItemCategory(e.target.value)} value={itemCategory}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="itemPriceID">Item Price</label>
                    <input type="number" className="form-control" id="itemPriceID" placeholder="Enter Item Price" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="itemQtyID">Item Qty</label>
                    <input type="number" className="form-control" id="itemQtyID" placeholder="Enter Item Qty" onChange={(e) => setItemQty(e.target.value)} value={itemQty}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemDescriptionID" className="form-label">Item Description</label>
                    <textarea className="form-control" id="itemDescriptionID" rows="3" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemItemImageID" className="form-label">Item Image</label>
                    {/* <input type="file" accept="image/*" className="form-control" id="itemItemImageID" rows="3" onChange={(e) => setItemImage(e.target.files[0])} /> */}
                    <input type="file" accept="image/*" className="form-control" id="itemItemImageID" rows="3" ref={fileInputRef} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    </div>

  )

};

export default CreateForm;
