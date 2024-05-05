import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

//importing CSS files
import './CreateForm.css'

const UpdateForm = () => {

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState(''); // State to store uploaded file name
    const fileInputRef = useRef(null); // Create a ref for file input

    // using useParams we catching id from URL and asign it to id const
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const getOneData = async () => {
            try{

                await axios.get(`http://localhost:8000/api/item/${id}`)
                .then((res) => {
                    setItemName(res.data.Item.itemName);
                    setItemCategory(res.data.Item.itemCategory);
                    setItemPrice(res.data.Item.itemPrice);
                    setItemQty(res.data.Item.itemQty);
                    setItemDescription(res.data.Item.itemDescription);
                    setUploadedFileName(res.data.Item.itemImage); // Set the uploaded file name
                    console.log("✨ Item fetched successfuly!");
                    console.log(fileInputRef);
                })
                .catch((err) => {
                    console.log("☠️ :: Error on API URL : " + err.message);
                })

            }catch (err){
                console.log("☠️ :: getOneItem Function failed! ERROR : " + err.message);
            }
        }

        getOneData();

    }, [id])


    const updateData = (e) => {
        e.preventDefault();

        try{

            const formData = new FormData(); // Create FormData object to append data
            formData.append('itemName', itemName);
            formData.append('itemCategory', itemCategory);
            formData.append('itemPrice', itemPrice);
            formData.append('itemQty', itemQty);
            formData.append('itemDescription', itemDescription);
            // formData.append('itemImage', itemImage);
            if (fileInputRef.current.files[0]){
                formData.append('itemImage', fileInputRef.current.files[0]); // Retrieve file from file input ref
            }
    
            axios.patch(`http://localhost:8000/api/itemUpdate/${id}`, formData)
            .then((res) => {
                alert(res.data.message);
                console.log(res.data.status);
                console.log(res.data.message);
                navigate('/allItems');
            })
            .catch((err) => {
                console.log("☠️ :: Error on API URL or updateItemData object : " + err.message);
            })

        }catch(err){
            console.log("☠️ :: sendData Function failed! ERROR : " + err.message);
        }
    }

  return (

    <div className="createFormContainer">
        
        <div className="formBootstrap">
            <h2 className="mb-4">Update Form</h2>

            <form onSubmit={updateData}>
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
                    {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>} {/* Display uploaded file name */}
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>

    </div>

  )

};

export default UpdateForm;