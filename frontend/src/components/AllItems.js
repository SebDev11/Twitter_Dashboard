import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

//import css file
import "./AllItems.css";

const AllItems = () => {
  // const navigate = useNavigate();

  const [allItems, setAllItems] = useState([]);
  const [allOriginalItems, setAllOriginalItems] = useState([]);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    const getAllItems = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/items")
          .then((res) => {
            setAllItems(res.data.AllItems);
            setAllOriginalItems(res.data.AllItems);
            console.log(res.data.message);
            console.log("status : " + res.data.status);
          })
          .catch((err) => {
            console.log("☠️ :: Error on API URL! ERROR : ", err.message);
          });
      } catch (err) {
        console.log(
          "☠️ :: getAllItems Function failed! ERROR : " + err.message
        );
      }
    };

    getAllItems(); // This line calls the getAllItems() function when the component mounts | mounts means when component start
  }, []); //The empty dependency array ([]) as the second argument to useEffect indicates that this effect should only run once when the component mounts.

  const handleDelete = async (id, imageName) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (confirmed) {
        await axios
          .delete(`http://localhost:8000/api/deleteItem/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            window.location.reload();
          })
          .catch((err) => {
            console.log("☠️ :: Error on API URL : " + err.message);
          });

        // Now, delete the associated image
        await axios
          .delete(`http://localhost:8000/api/deleteImage/${imageName}`) // Assuming this is your endpoint for deleting images
          .then((res) => {
            console.log("✅ :: Image deleted successfully");
          })
          .catch((err) => {
            console.log("☠️ :: Image deleted failed!");
          });
      } else {
        toast.warning("Deletion cancelled!");
        console.log("Deletion cancelled!");
      }
    } catch (err) {
      console.log("☠️ :: handleDelete funnction failed! ERROR: " + err.message);
    }
  };

  //search functions begin
  const SearchFunction = async (searchTerm) => {
    // e.preventDefault();

    try {
      await axios
        .get("http://localhost:8000/api/searchItem", {
          params: {
            itemName: searchTerm,
          },
        })
        .then((res) => {
          if (res.data.searchedItem.length === 0) {
            setAllItems(res.data.searchedItem);
          } else {
            setAllItems(res.data.searchedItem);
            console.log(res.data.message);
          }
        })
        .catch((error) => {
          console.log(
            "☠️ :: Error on response from server! ERROR : ",
            error.message
          );
        });
    } catch (err) {
      console.log("☠️ :: Error on axios API Request! ERROR : ", err.message);
    }
  };

  const handleSearchChange = async (e) => {
    const searchTerm = e.target.value;
    setItemName(searchTerm);

    if (searchTerm === "") {
      // when placeholder empty fetch all data
      setAllItems(allOriginalItems); // Fetch all data when search term is empty
    } else {
      await SearchFunction(searchTerm);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    SearchFunction(itemName);
  };

  //generate Invoice
  const downloadInvoice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8000/api/generate-invoice"
      );

      const { filepath } = response.data;
      const { filename } = response.data;

      // Create a new <a> element to simulate a download link
      const link = document.createElement("a");
      // Set the href attribute of the link to the filepath of the generated invoice
      link.href = filepath;
      // Set the "download" attribute to specify the default file name for the downloaded file
      link.setAttribute("download", filename);
      link.setAttribute("target", "_blank");
      // Append the link to the document body
      document.body.appendChild(link);

      // Simulate a click on the link to trigger the download
      link.click();

      // Remove the link from the document body after the download is complete
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading invoice:", error.message);
    }
  };

  return (
    <div className="allItemscontainer">
      <div className="tableContainer">
        <div className="tableHead">
          <h2>Controller</h2>

          <div className="search-container">
            <form className="searchTable" onSubmit={handleFormSubmit}>
              <input
                id="searchBar"
                type="text"
                value={itemName}
                onChange={handleSearchChange}
                placeholder="Search.."
                name="search"
              />
              <button type="submit">
                <i className="fa fa-search" style={{ color: "#ffffff" }}></i>
              </button>
            </form>
          </div>

          <div className="addItemBtnDiv">
            <Link to="/createform">
              <button type="button" class="btn btn-success addItemBtn">
                Add Item
              </button>
            </Link>
            <button type="button" class="btn btn-danger addItemBtn">
              Logout
            </button>
            <button
              type="button"
              className="btn btn-primary addItemBtn"
              onClick={downloadInvoice}
            >
              Download Invoice
            </button>
          </div>
        </div>

        <ToastContainer />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              {/* <th scope="col">id</th> */}
              <th scope="col">Item Image</th>
              <th scope="col">Item Name</th>
              <th scope="col">Item Category</th>
              <th scope="col">Item Price</th>
              <th scope="col">Item Qty</th>
              <th scope="col">Item Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {allItems == null
              ? ""
              : allItems.map((items, index) => (
                <tr key={items._id}>
                  <td>{index + 1}</td>
                  {/* <td>{items._id}</td> */}
                  <td>
                    <img
                      src={require(`../uploads/${items.itemImage}`)}
                      width={30}
                      height={40}
                      alt="ItemImage"
                    />
                  </td>
                  <td>{items.itemName}</td>
                  <td>{items.itemCategory}</td>
                  <td>{items.itemPrice}</td>
                  <td>{items.itemQty}</td>
                  <td>{items.itemDescription}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <Link to={`/updateform/${items._id}`}>
                              <button
                                type="button"
                                className="btn btn-warning"
                              >
                                Edit
                              </button>
                            </Link>
                          </td>{" "}
                          &nbsp;
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleDelete(items._id)}
                            >
                              Delete
                            </button>
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
    </div>
  );
};

export default AllItems;
