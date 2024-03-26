import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//import css file
import './AllItems.css'

const AllItems = ({ token, setToken }) => {

    const navigate = useNavigate();

    const [ allItems, setAllItems ] = useState([]);

    useEffect(() => {

        const getAllItems = async () => {

            try{

                await axios.get('http://localhost:8000/api/items', {headers: { Authorization: token },})
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

        if(token){
            getAllItems(); // This line calls the getAllItems() function when the component mounts | mounts means when component start
        }

    }, []) //The empty dependency array ([]) as the second argument to useEffect indicates that this effect should only run once when the component mounts.


    const handleLogout = async () => {
        localStorage.removeItem('token'); // Remove token from local storage
        await setToken(null); // Clear token from state
        navigate('/'); 
    }

  return (
    <div className="allItemscontainer">

        <div className="addItemBtnDiv">
            <Link to='/createform'><button type="button" class="btn btn-success addItemBtn">Add Item</button></Link>
            <button onClick={handleLogout} type="button" class="btn btn-danger addItemBtn">Logout</button>
        </div>
        
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
                            <button type="button" class="btn btn-warning">Edit</button> &nbsp;
                            <button type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
};

export default AllItems;
