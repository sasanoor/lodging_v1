import React from "react";
import config from "../config";

function RoomTiles() {
  // Generate all room numbers
  const rooms = Array.from(
    { length: config.roomEnd - config.roomStart + 1 },
    (_, i) => config.roomStart + i
  );

  // Exclude maintenance rooms
  const availableRooms = rooms.filter(
    (room) => !config.maintenanceRooms.includes(room)
  );

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "10px",
      padding: "20px"
    }}>
      {availableRooms.map((room) => (
        <div
          key={room}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            background: "#f8f9fa",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f7ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f8f9fa")}
        >
          {room}
        </div>
      ))}
    </div>
  );
}

export default RoomTiles;
