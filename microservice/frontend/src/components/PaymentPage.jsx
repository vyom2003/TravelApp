import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function PaymentPage() {
    const { state } = useLocation();  // Retrieve booking details and fare from state
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const [paymentDetails, setPaymentDetails] = useState({
        upiId: '',
        upiPin: '',
        cardNumber: '',
        cvv: '',
        expiryDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('paymentMethod', paymentMethod);
        formData.append('upiId', paymentDetails.upiId);
        formData.append('upiPin', paymentDetails.upiPin); // Append upiPin to formData
        formData.append('cardNumber', paymentDetails.cardNumber);
        formData.append('cvv', paymentDetails.cvv);
        formData.append('expiryDate', paymentDetails.expiryDate);
        formData.append('amount', state.fare.toFixed(2));
        formData.append('hotelName', state.hotelName); // Pass hotel name to backend
        formData.append('startDate', state.dates.start); // Pass start date to backend
        formData.append('endDate', state.dates.end);
        formData.append('user_id',localStorage.getItem("ID"))

        const response = await fetch('http://127.0.0.1:5005/pay', {
            method: 'POST',
            body: formData,
        });
        const res = await response.json();
        window.alert(res.message)
        if(res.status==200){
            window.location.href = '/success'
        }
        else{
            window.location.href = '/fail'
        }
        console.log(res.message);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            padding: '20px',
            maxWidth: '1200px',
            margin: '20px auto',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                flex: '1',
                margin: '20px',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <h2>Booking Summary</h2>
                <p>Hotel: {state.hotelName}</p>
                <p>Rating: {state.rating} stars</p>
                <p>Dates: {state.dates.start} to {state.dates.end}</p>
                <p>Guests: {state.guests}</p>
                <p>Fare: ₹ {state.fare.toFixed(2)}</p>
                <button onClick={()=>{
                    window.location.href = "/travel"
                }}>Cancel Payment</button>
            </div>
            <div style={{
                flex: '1',
                margin: '20px',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <h2>Payment Details</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <select onChange={e => setPaymentMethod(e.target.value)} style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginBottom: '20px'
                        }}>
                            <option value="UPI">UPI</option>
                            <option value="Card">Credit/Debit Card</option>
                        </select>
                    </div>
                    {paymentMethod === 'UPI' && (
                        <>
                            <input type="text" name="upiId" placeholder="UPI ID" value={paymentDetails.upiId} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            <input type="password" name="upiPin" placeholder="UPI PIN" value={paymentDetails.upiPin} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '10px' }} />
                        </>
                    )}
                    {paymentMethod === 'Card' && (
                        <>
                            <input type="text" name="cardNumber" placeholder="Card Number" value={paymentDetails.cardNumber} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px' }} />
                            <input type="text" name="cvv" placeholder="CVV" maxLength="3" value={paymentDetails.cvv} onChange={handleInputChange} required style={{ width: '100px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px' }} />
                            <input type="month" name="expiryDate" placeholder="Expiry Date" value={paymentDetails.expiryDate} onChange={handleInputChange} required style={{ width: '140px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </>
                    )}
                    <button type="submit" style={{ width: '100%', padding: '10px 20px', marginTop: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Confirm Payment</button>
                </form>
            </div>
        </div>
    );
}

export default PaymentPage;
