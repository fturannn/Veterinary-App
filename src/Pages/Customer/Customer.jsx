import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import "./Customer.css";
import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
} from "../../API/customer";
import Alert from "@mui/material/Alert";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(0);
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
      setSearchResults(data);
    });
    setReload(false);
  }, [reload]);

  //--Delete Customer--
  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  //--New Customer
  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    console.log(newCustomer);
    createCustomer(newCustomer)
      .then(() => {
        setReload(true);
        setNewCustomer({
          name: "",
          phone: "",
          mail: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //--Update Customer
  const handleUpdateBtn = (customer) => {
    setUpdateCustomer(customer);
  };

  const handleUpdateChange = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateCustomerFunc(updateCustomer)
      .then(() => {
        setReload(true);
        setUpdateCustomer({
          name: "",
          phone: "",
          mail: "",
          address: "",
          city: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //--Search Customer
  const handleSearch = () => {
    const filteredCustomer = searchResults.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
    setCustomer(filteredCustomer);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setCustomer(searchResults);
  };

  return (
    <>
      <h1>Müşteri Yönetim Ekranı</h1>
      <div className="general-container">
        <div className="list-container">
          <div className="list">
            <h3>Müşteri Listesi</h3>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ad Soyad</th>
                    <th>E-mail</th>
                    <th>Adres</th>
                    <th>Şehir</th>
                    <th>Telefon</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.mail}</td>
                      <td>{customer.address}</td>
                      <td>{customer.city}</td>
                      <td>{customer.phone}</td>
                      <td>
                        <span onClick={() => handleUpdateBtn(customer)}>
                          <UpdateIcon />
                        </span>
                        <span onClick={() => handleDelete(customer.id)}>
                          <DeleteIcon />
                        </span>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="operation-container">
          <h3>Operasyonlar</h3>
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
            <button onClick={handleCreate} className="button-submit">
              Create
            </button>
            {alert === 1 ? (
              <Alert severity="error">
                Bu kullanıcı daha önce sisteme eklenmiş!
              </Alert>
            ) : null}
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
            <button onClick={handleUpdate} className="button-submit">
              Update
            </button>
            {alert === 2 ? (
              <Alert severity="error">
                Lütfen güncellemek istediğiniz kullanıcıyı seçin!
              </Alert>
            ) : null}
          </div>

          <div className="search-bar">
            <h2>Müşteri Ara</h2>
            <input
              type="text"
              placeholder="isim giriniz... "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch} className="button-submit">
              Search
            </button>
            <button className="button-submit" onClick={handleReset}>
          Show All
        </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
