import React from "react";
import config from "../config";

function Home() {
  const start = parseInt(config.roomStart, 10);
  const end = parseInt(config.roomEnd, 10);
  const maintenanceRooms = config.maintenanceRooms.map((r) => parseInt(r, 10));
  console.log(config)
  // Generate list of rooms
  const rooms = [];
  for (let i = start; i <= end; i++) {
    if (!maintenanceRooms.includes(i)) {
      rooms.push(i);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to {config.appName}</h1>
      <h3>Available Rooms</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              textAlign: "center",
              borderRadius: "8px",
              background: "#f5f5f5",
            }}
          >
            {room}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
