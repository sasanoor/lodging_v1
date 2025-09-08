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
    roomNumber: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    car: "",
    licensePlate: "",
    telephone: "",
    checkInDate: getTodayDate(),
    checkInTime: getCurrentTime(),
    checkOutDate: "",
    checkOutTime: "11:00",
    amountCash: "",
    amountCredit: "",
    amountBalance: "",
    numberOfDays: "",
    clerkName: "",
    comments: "",
    noofGuests: "",
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
      await axios.post(`${API_BASE_URL}/guests/add_guest/`, form, {
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
            { label: "Room Number", name: "roomNumber" },
            { label: "Name", name: "name" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "ZIP", name: "zip" },
            { label: "Car", name: "car" },
            { label: "License Plate Number", name: "licensePlate" },
            { label: "Telephone", name: "telephone" },
            { label: "Check-In Date", name: "checkInDate", type: "date" },
            { label: "Check-In Time", name: "checkInTime", type: "time" },
            { label: "Check-Out Date", name: "checkOutDate", type: "date" },
            { label: "Check-Out Time", name: "checkOutTime", type: "time" },
            { label: "Amount (Cash)", name: "amountCash" },
            { label: "Amount (Credit)", name: "amountCredit" },
            { label: "Amount (Balance)", name: "amountBalance" },
            { label: "Number of Days", name: "numberOfDays" },
            { label: "Clerk Name", name: "clerkName" },
            { label: "Comments", name: "comments" },
            { label: "No.of Guests", name: "noofGuests" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="form-group">
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={["roomNumber", "name", "checkInDate", "checkOutDate"].includes(name)}
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
