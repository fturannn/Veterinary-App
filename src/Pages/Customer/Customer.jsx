import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import "./Customer.css";
import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc
} from "../../API/customer";

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
  const [updateCustomer, setUpdateCustomer] = useState({
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

  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createCustomer(newCustomer).then(() => {
      setReload(true);
    });
    setNewCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleUpdateBtn = (customer) => {
    setUpdateCustomer({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      mail: customer.mail,
      address: customer.address,
      city: customer.city,
    })
  };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateCustomerFunc(updateCustomer).then(() => {
      setReload(true)
    })
    setUpdateCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    })
  }

  return (
    <>
      <h1>Customer</h1>
      <div className="customer-newCustomer">
        <h2>Yeni Müşteri</h2>
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
      <div className="customer-updateCustomer">
        <h2>Müşteri güncelle</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleUpdateChange}
          value={updateCustomer.name}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={handleUpdateChange}
          value={updateCustomer.phone}
        />
        <input
          type="text"
          placeholder="Mail"
          name="mail"
          onChange={handleUpdateChange}
          value={updateCustomer.mail}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          onChange={handleUpdateChange}
          value={updateCustomer.address}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleUpdateChange}
          value={updateCustomer.city}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>
      <div className="customer-list">
        <h2>Müşteri Listesi</h2>
        {customer.map((customer) => {
          return (
            <div key={customer.id}>
              {customer.name}
              <span
                id={customer.id}
                onClick={() => handleDelete(customer.id)}
              ><DeleteIcon /></span>
              <span onClick={() => handleUpdateBtn(customer)}>
                <UpdateIcon />
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Customer;
