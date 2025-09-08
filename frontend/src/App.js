import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Message from "./components/Message";
import Home from "./pages/Home";
import AddGuest from "./pages/AddGuest";

function App() {
  const [message, setMessage] = useState({ type: "", text: "" });

  // global message handler
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000); // auto hide
  };

  return (
    <Router>
      {/* Common Navbar */}
      <Navbar />

      {/* Global Message */}
      <Message
        type={message.type}
        text={message.text}
        onClose={() => setMessage({ type: "", text: "" })}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-guest" element={<AddGuest />} />
      </Routes>
    </Router>
  );
}

export default App;
