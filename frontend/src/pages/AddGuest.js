import React, { useState } from "react";
import "./AddGuest.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const getTodayDate = () => new Date().toISOString().split("T")[0];
const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

const AddGuest = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    room_number: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    car: "",
    license_plate: "",
    telephone: "",
    check_in_date: getTodayDate(),
    check_in_time: getCurrentTime(),
    check_out_date: "",
    check_out_time: "11:00",
    amount_cash: "",
    amount_credit: "",
    amount_balance: "",
    number_of_days: "",
    clerk_name: "",
    comments: "",
    no_of_guests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      await axios.post(`${API_BASE_URL}/guests/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Guest added successfully!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Failed to add guest. Please try again.");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Add New Guest</h2>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: "Room Number", name: "room_number" },
            { label: "Name", name: "name" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "ZIP", name: "zip" },
            { label: "Car", name: "car" },
            { label: "License Plate Number", name: "license_plate" },
            { label: "Telephone", name: "telephone" },
            { label: "Check-In Date", name: "check_in_date", type: "date" },
            { label: "Check-In Time", name: "check_in_time", type: "time" },
            { label: "Check-Out Date", name: "check_out_date", type: "date" },
            { label: "Check-Out Time", name: "check_out_time", type: "time" },
            { label: "Amount (Cash)", name: "amount_cash" },
            { label: "Amount (Credit)", name: "amount_credit" },
            { label: "Amount (Balance)", name: "amount_balance" },
            { label: "Number of Days", name: "number_of_days" },
            { label: "Clerk Name", name: "clerk_name" },
            { label: "Comments", name: "comments" },
            { label: "No.of Guests", name: "no_of_guests" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="form-group">
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={["room_number", "name", "check_in_date", "check_out_date"].includes(name)}
              />
            </div>
          ))}

          <div className="form-actions">
            <button type="submit">Submit Guest</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddGuest;
