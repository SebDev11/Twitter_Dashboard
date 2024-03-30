import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from "react-router-dom";

//import css file
import './AllItems.css'

const AllItems = () => {

    // const navigate = useNavigate();

    const [ allItems, setAllItems ] = useState([]);

    useEffect(() => {

        const getAllItems = async () => {

            try{

                await axios.get('http://localhost:8000/api/items')
                .then((res) => {
                    setAllItems(res.data.AllItems);
                    console.log(res.data.message);
                    console.log('status : ' + res.data.status);
                })
                .catch((err) => {
                    console.log("☠️ :: Error on API URL! ERROR : ", err.message);
                })

            }catch(err){
                console.log("☠️ :: getAllItems Function failed! ERROR : " + err.message);
            }

        }

        getAllItems(); // This line calls the getAllItems() function when the component mounts | mounts means when component start


    }, []) //The empty dependency array ([]) as the second argument to useEffect indicates that this effect should only run once when the component mounts.


    const handleDelete = async (id) => {

        try{

            const confirmed = window.confirm('Are you sure you want to delete this item?');

            if(confirmed){
                await axios.delete(`http://localhost:8000/api/deleteItem/${id}`)
                .then((res) => {
                    alert(res.data.message);
                    console.log(res.data.message);
                })
                .catch((err) => {
                    console.log('☠️ :: Error on API URL : ' + err.message);
                })
            } else {
                toast.warning('Deletion cancelled!');
                console.log('Deletion cancelled!');
            }

        }catch(err) {
            console.log('☠️ :: handleDelete funnction failed! ERROR: ' + err.message);
        }

    }


  return (
    <div className="allItemscontainer">

        <div className="addItemBtnDiv">
            <Link to='/createform'><button type="button" class="btn btn-success addItemBtn">Add Item</button></Link>
            <button type="button" class="btn btn-danger addItemBtn">Logout</button>
        </div>

        <ToastContainer/>
        
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">id</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Item Category</th>
                    <th scope="col">Item Qty</th>
                    <th scope="col">Item Description</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {allItems.map((items, index) => (
                    <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items._id}</td>
                        <td>{items.itemName}</td>
                        <td>{items.itemCategory}</td>
                        <td>{items.itemQty}</td>
                        <td>{items.itemDescription}</td>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Link to={`/updateform/${items._id}`}>
                                                <button type="button" className="btn btn-warning">Edit</button>
                                            </Link>
                                        </td> &nbsp;
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(items._id)}>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
};

export default AllItems;
