import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ API fetch (useEffect)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.slice(0, 2)))
      .catch((err) => console.log(err));
  }, []);

  // input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields required!");
      return;
    }

    setUsers([...users, { name: form.name, email: form.email }]);
    setMessage("Registration Successful!");

    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <h2>Registration Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Register</button>

      <p className="success">{message}</p>

      <h3>Registered Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;