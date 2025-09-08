import React from "react";

function Message({ type, text, onClose }) {
  if (!text) return null;

  const colors = {
    success: "green",
    error: "red",
    info: "blue",
  };

  return (
    <div style={{
      margin: "10px",
      padding: "10px",
      border: `1px solid ${colors[type]}`,
      color: colors[type],
      borderRadius: "5px",
    }}>
      {text}
      <button 
        onClick={onClose} 
        style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        ✖
      </button>
    </div>
  );
}

export default Message;
