import React, { useState, useEffect } from "react";
import "./Customer.css";
import { getCustomers, deleteCustomer, createCustomer } from "../../API/customer";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [reload, setReload] = useState(true);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomer(data);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (event) => {
    const id = event.target.id;
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  const handleNewCustomer = (event) => {
    setNewCustomer({
        ...newCustomer,
        [event.target.name]: event.target.value,

    })
  };

  const handleCreate = () => {
    createCustomer(newCustomer).then(() => {
        setReload(true)
    })
  }

  return (
    <>
      <h1>Customer</h1>
      <div className="customer-inputs">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Mail"
          name="mail"
          value={newCustomer.mail}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="customer-list">
        {customer.map((customer) => {
          return (
            <div
              id={customer.id}
              onClick={(e) => handleDelete(e)}
              key={customer.id}
            >
              {customer.name}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Customer;
