import { useEffect, useState } from "react";
import "./App.css";
import CustomerForm from "./Components/CustomerForm";
import axios from "axios";
import Navbar from "./Components/Navbar";
import CustomerTable from "./Components/CustomerTable";
import ConfirmModal from "./Components/ConfirmModal";
import linkedin from "../src/assets/linkedin.png";
import xlogo from "../src/assets/xlogo.png";
import aralilogo from "../src/assets/aralilogo.png";

const BASE_URL = "https://customer-dashboard-arali.onrender.com";;

function App() {
  const [customers, setCustomers] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const fetchCustomers = async () => {
    setFetchError("");

    try {
      const response = await axios.get(`${BASE_URL}/customers`);
      setCustomers(response.data);
    } catch (err) {
      setFetchError("Could not load customers. Please check backend server.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await axios.delete(`${BASE_URL}/customers/${selectedCustomer.id}`);

      setDeleteSuccess("Customer Deleted Successfully.");

      fetchCustomers();

      setSelectedCustomer(null);

      setIsModalOpen(false);

      setTimeout(() => {
        setDeleteSuccess("");
      }, 3000);
    } catch (err) {
      setDeleteError("Failed to delete customer.");
    }
  };

  const openDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        {fetchError && <p className="alert alert--error">{fetchError}</p>}
        {deleteError && <p className="alert alert--error">{deleteError}</p>}
        {deleteSuccess && (
          <p className="alert alert--success">{deleteSuccess}</p>
        )}
        <div className="welcome-section">
          <h1 className="welcome-title">
            <i>Welcome to Arali AI</i>
          </h1>
        </div>

        <div className="app-layout">
          <aside className="app-layout__form">
            <CustomerForm onCustomerAdded={fetchCustomers} />
          </aside>

          <section className="app-layout__table">
            <CustomerTable customers={customers} onDelete={openDeleteModal} />
          </section>
        </div>
      </main>
      <ConfirmModal
        isOpen={isModalOpen}
        customerName={selectedCustomer?.name}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />

      <footer className="app-footer">
        <p>Arali Ai Customer Management Dashboard</p>
        <div className="socials">
          <a
            href="https://www.arali.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img className="social-icon" alt="Arali Homepage" src={aralilogo} />
          </a>
          <a
            href="https://www.linkedin.com/company/arali-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img className="social-icon" alt="linkedin" src={linkedin} />
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img className="social-icon" alt="xtwitter" src={xlogo} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
