import React, { useState } from "react";
import axios from "axios";
import addcustomer from "../assets/addcustomer.png";

const BASE_URL = "https://customer-dashboard-arali.onrender.com";

const CustomerForm = ({ onCustomerAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError(
        "All fields are required. Please fill in the Name, Email and Phone",
      );
      return;
    }

    const nameRegex = /^[A-Za-z ]{3,50}$/;
    if (!nameRegex.test(name.trim())) {
      setError("Name should contain only alphabets.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return; 
    }

    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/customers`, { name, email, phone });

      setName("");
      setEmail("");
      setPhone("");
      setSuccess("Customer Added Successfully.");

      onCustomerAdded();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to add customer. Is the backend running?";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2 className="form-card__title">Add New Customer</h2>
        {error && <p className="alert alert--error">{error}</p>}
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Type Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email ID
            </label>
            <input
              id="email"
              className="form-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="Phone Number"
              value={phone}
              maxLength={10}
              inputMode="numeric"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setPhone(value);
                }
              }}
            />
          </div>

          <button type="submit" className="btn btn--submit" disabled={loading}>
            {loading ? (
              "Adding Customer..."
            ) : (
              <>
                <img
                  src={addcustomer}
                  alt="Logo"
                  className="addcustomer-logo"
                  style={{ fontSize: "18px", marginRight: "10px" }}
                />
                <b>Add Customer</b>
              </>
            )}
          </button>
          <div>
            {success && (
              <p className="alert alert--success">
                <strong>{success}</strong>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
