import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GuestList.css";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/guests/today/`);
        setGuests(response.data);
      } catch (err) {
        console.error("Error fetching guest list:", err);
        setError("❌ Failed to load guest list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  if (loading) return <p>Loading today’s guest list...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="guestlist-container">
      <h2>Today's Check-in Guests</h2>
      {guests.length === 0 ? (
        <p>No guests checked in today.</p>
      ) : (
        <table className="guestlist-table">
          <thead>
            <tr>
              <th>Room #</th>
              <th>Name</th>
              <th>City</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>No. of Guests</th>
              <th>Clerk</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.room_number}</td>
                <td>{guest.name}</td>
                <td>{guest.city}</td>
                <td>
                  {guest.check_in_date} {guest.check_in_time}
                </td>
                <td>
                  {guest.check_out_date} {guest.check_out_time}
                </td>
                <td>{guest.no_of_guests}</td>
                <td>{guest.clerk_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuestList;
