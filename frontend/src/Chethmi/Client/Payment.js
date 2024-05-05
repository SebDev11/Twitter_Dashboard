import React, { useState } from "react";
import './Payment.css';
import { useParams } from "react-router-dom";

const Payment = () => {

    const [total, setTotal] = useState(100);
    const [paymentAmount, setPaymentAmount] = useState(""); 
    const [payableAmount, setPayableAmount] = useState(350000); 
    const [selectedPromotion, setSelectedPromotion] = useState("");

    const { id } = useParams();

    const handleChange = (event) => {
        const { value } = event.target;
        setPaymentAmount(value);
    };

    const calculateChange = () => {
        const change = paymentAmount - payableAmount;
        return change;
    };

    const handlePromotionChange = (event) => {
        setSelectedPromotion(event.target.value);
        
        let newTotalPrice = 100; // Sample total price
        
        switch (event.target.value) {
        case "Morning Brew Discount":
            newTotalPrice -= 10;
            break;
        case "Happy Hour Specials":
            newTotalPrice -= 15;
            break;
        case "Daily Roast Deals":
            newTotalPrice -= 20;
            break;
        case "Loyalty Bean Bonus":
            newTotalPrice -= 25;
            break;
        default:
            break;
        }

        console.log(newTotalPrice);
        
    };


  return (
    <div className="PaymentContainer">

        <div className="PaymentWidthBlanceDiv">

            <div className="paymentTableContainer">
                <h2>Payment Table</h2>

                <div className="paymentTableWrapper">
                    <table class="paymentTable">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Order Items</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Brownie Frap G</td>
                                <td>1</td>
                                <td>Rs.1340.00</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Brownie Frap G</td>
                                <td>1</td>
                                <td>Rs.1340.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="paymentSideView">
                <div className="calculationPhase">
                    <div className="paymentTotalPhase">
                        <p>Total: <span>350000 LKR</span></p>
                    </div>
                    <div className="paymentPropotionPhase">
                        <p>Add Promotion: </p>
                        <select name="promotion" id="promotion" value={selectedPromotion} onChange={handlePromotionChange}>
                            <option value="Morning Brew Discount">Morning Brew Discount</option>
                            <option value="Happy Hour Specials">Happy Hour Specials</option>
                            <option value="Daily Roast Deals">Daily Roast Deals</option>
                            <option value="Loyalty Bean Bonus">Loyalty Bean Bonus</option>
                        </select>
                    </div>
                    <div className="paymentPayableAmountPhase">
                        <p>Payable Amount: <h3>{payableAmount} LKR</h3></p>
                    </div>
                </div>
                <div className="balancePhase">
                    <div className="paymentAmountDiv">
                        <label for="paymentAmount">Payment Amount(LKR):</label>
                        <input type="text" id="paymentAmount" name="paymentAmount" value={paymentAmount} onChange={handleChange} placeholder="Enter amount tendered" />
                    </div>
                    <div className="changeDiv">
                        <p>Change: <h3>{calculateChange()} LKR</h3></p>
                    </div>
                    <div className="PaymentButtonDiv">
                        <button class="custom-button">Done</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
};

export default Payment;
