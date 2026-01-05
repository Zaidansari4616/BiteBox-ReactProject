import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { sendOrderConfirmation } from "../../utils/emailService";

function PlaceOrder() {
  const { getTotalCart, clearCart, food_list, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { firstName, lastName, email, street, city, state, pincode, country, phone } = formData;
    
    if (!firstName || !lastName || !email || !street || !city || !state || !pincode || !country || !phone) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Prepare order data
    const orderData = {
      ...formData,
      total: getTotalCart() + 50,
      items: Object.keys(cartItems).map(id => {
        const item = food_list.find(f => f._id === id);
        return `${item.name} x${cartItems[id]} (₹${item.price * cartItems[id]})`;
      }).join('\n'),
    };

    try {
      // Send email
      await sendOrderConfirmation(orderData);
      alert("Order placed successfully! Check your email for confirmation.");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error('Order placement error:', error);
      alert("Order placed but email confirmation failed. We'll contact you soon!");
      clearCart();
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCart()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCart() === 0 ? 0 : 50}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCart() === 0 ? 0 : getTotalCart() + 50}</b>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "PROCESSING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;