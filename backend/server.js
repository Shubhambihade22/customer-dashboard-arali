require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 5000;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://arali-customer-dashboard.vercel.app"
    ],
    methods: ["GET", "POST", "DELETE"],
  })
);

let customers = [
  {
    id: uuidv4(),
    name: "Shubham Patil",
    email: "shubham@gmail.com",
    phone: "9876543210",
  },
];

//Routes
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const nameRegex = /^[A-Za-z ]{3,50}$/;

  if (!nameRegex.test(trimmedName)) {
    return res.status(400).json({
      message: "Name should contain only alphabets.",
    });
  }

  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      message: "Invalid email format.",
    });
  }

  if (!phoneRegex.test(trimmedPhone)) {
    return res.status(400).json({
      message: "Phone number must be 10 digits.",
    });
  }

  const existingEmail = customers.find(
    (c) => c.email.toLowerCase() === trimmedEmail.toLowerCase(),
  );

  if (existingEmail) {
    return res.status(400).json({
      message: "Email already exists.",
    });
  }

  const newCustomer = {
    id: uuidv4(),
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
  };

  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;

  const exists = customers.find((c) => c.id === id);

  if (!exists) {
    return res.status(404).json({
      message: "Customer not found.",
    });
  }

  customers = customers.filter((c) => c.id !== id);

  res.json({
    message: "Customer deleted successfully.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
