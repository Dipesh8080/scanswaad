import React, { useState } from 'react';
import './PaymentGateway.css';

const PaymentGateway = ({ totalAmount, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus(null);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly determine success/failure for demo
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        setPaymentStatus('success');
        onPaymentSuccess();
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-gateway">
      <h2>Secure Payment</h2>
      <p className="total-amount">Total Amount: ₹{totalAmount.toFixed(2)}</p>
      
      <form onSubmit={handlePayment}>
        <div className="payment-methods">
          <label>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="upi" 
              checked={paymentMethod === 'upi'}
              onChange={() => setPaymentMethod('upi')}
            />
            UPI Payment
          </label>
          
          <label>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="card" 
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Credit/Debit Card
          </label>
        </div>
        
        {paymentMethod === 'upi' ? (
          <div className="upi-payment">
            <div className="form-group">
              <label>UPI ID:</label>
              <input 
                type="text" 
                value={upiId} 
                onChange={(e) => setUpiId(e.target.value)} 
                placeholder="yourname@upi" 
                required
              />
            </div>
            <p className="note">Note: You'll be redirected to your UPI app for payment confirmation</p>
          </div>
        ) : (
          <div className="card-payment">
            <div className="form-group">
              <label>Card Number:</label>
              <input 
                type="text" 
                value={cardDetails.number} 
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} 
                placeholder="1234 5678 9012 3456" 
                required
              />
            </div>
            
            <div className="form-group">
              <label>Cardholder Name:</label>
              <input 
                type="text" 
                value={cardDetails.name} 
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})} 
                placeholder="Name on card" 
                required
              />
            </div>
            
            <div className="card-details-row">
              <div className="form-group">
                <label>Expiry Date:</label>
                <input 
                  type="text" 
                  value={cardDetails.expiry} 
                  onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} 
                  placeholder="MM/YY" 
                  required
                />
              </div>
              
              <div className="form-group">
                <label>CVV:</label>
                <input 
                  type="text" 
                  value={cardDetails.cvv} 
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} 
                  placeholder="123" 
                  required
                />
              </div>
            </div>
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="payment-status success">
            <i className="fas fa-check-circle"></i>
            Payment successful! Thank you for your order.
          </div>
        )}
        
        {paymentStatus === 'failed' && (
          <div className="payment-status failed">
            <i className="fas fa-times-circle"></i>
            Payment failed. Please try again or use a different payment method.
          </div>
        )}
        
        <button 
          type="submit" 
          className="pay-now-btn"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </>
          ) : (
            `Pay ₹${totalAmount.toFixed(2)}`
          )}
        </button>
      </form>
      
      <div className="secure-payment">
        <i className="fas fa-lock"></i>
        <span>Secure payment encrypted</span>
      </div>
    </div>
  );
};

export default PaymentGateway;
