import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

//importing CSS files
import './CreateForm.css'

const UpdateForm = () => {

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemQty, setItemQty] = useState('');
    const [itemDescription, setItemDescription] = useState('');

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
                    setItemQty(res.data.Item.itemQty);
                    setItemDescription(res.data.Item.itemDescription);
                    console.log("✨ Item fetched successfuly!");
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

            let updateItemData = {
                itemName: itemName,
                itemCategory: itemCategory,
                itemQty: itemQty,
                itemDescription: itemDescription,
            }
    
            axios.patch(`http://localhost:8000/api/itemUpdate/${id}`, updateItemData)
            .then((res) => {
                alert(res.data.message);
                console.log(res.data.status);
                console.log(res.data.message);
                navigate('/');
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
                    <label htmlFor="itemQtyID">Item Qty</label>
                    <input type="number" className="form-control" id="itemQtyID" placeholder="Enter Item Qty" onChange={(e) => setItemQty(e.target.value)} value={itemQty}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemDescriptionID" className="form-label">Item Description</label>
                    <textarea className="form-control" id="itemDescriptionID" rows="3" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>

        </div>

    </div>

  )

};

export default UpdateForm;