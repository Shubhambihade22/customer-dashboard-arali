import React from "react";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerTable = ({ customers, onDelete }) => {
  if (customers.length === 0) {
    return (
      <div className="table-card">
        <h2 className="table-card__title">
          All Customers List
          <span className="table-card__count"> 0 Records</span>
        </h2>
        <div className="table-empty">
          <HourglassEmptyRoundedIcon className="table-empty__icon" />
          <p>No customers found. Please add your first customer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <h2 className="table-card__title">
        All Customers List
        <span className="table-card__count">
          <strong>{customers.length}</strong> Record
          {customers.length !== 1 ? "s" : ""}
        </span>
      </h2>

      <div className="table-wrapper">
        <table className="customer-table">
          <thead>
            <tr className="customer-table__header-row">
              <th className="customer-table__th">No.</th>
              <th className="customer-table__th">Name</th>
              <th className="customer-table__th">Email</th>
              <th className="customer-table__th">Phone</th>
              <th className="customer-table__th">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={`customer-table__row ${index % 2 === 0 ? "customer-table__row--even" : "customer-table__row--odd"}`}
              >
                <td className="customer-table__td customer-table__td--index">
                  {index + 1}
                </td>
                <td className="customer-table__td">
                  <div className="customer-name-cell">
                    <span className="customer-avatar">
                      {customer.name
                        .trim()
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                    <span className="customer-name-text">{customer.name}</span>
                  </div>
                </td>
                <td className="customer-table__td">{customer.email}</td>
                <td className="customer-table__td customer-table__td--phone">
                  {customer.phone}
                </td>
                <td className="customer-table__td">
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(customer)}
                    title={`Delete ${customer.name}`}
                  >
                    <DeleteIcon className="table-delete__icon" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
