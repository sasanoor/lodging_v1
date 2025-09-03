import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/messages/")
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Messages from Django API</h1>
      <ul>
        {messages.map(m => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
