import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Alert from "@mui/material/Alert";
import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
  getAnimalByName,
  getAnimalByCustomerName,
} from "../../API/animal";
import { getCustomers } from "../../API/customer";

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [alert, setAlert] = useState(0);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customerId: "",
  });
  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customerId: "",
  });

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
      setSearchResults(data);
    });
    getCustomers().then((data) => {
      setCustomers(data);
    });
    setReload(false);
  }, [reload]);

  //--Delete Animal--
  const handleDelete = (id) => {
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  //--New Animal
  const handleNewAnimal = (event) => {
    if (event.target.name === "customer") {
      setNewAnimal({
        ...newAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setNewAnimal({
        ...newAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAnimal(newAnimal)
      .then(() => {
        setReload(true);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: "",
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //--Update Animal
  const handleUpdateBtn = (animal) => {
    setUpdateAnimal(animal);
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "customer") {
      setUpdateAnimal({
        ...updateAnimal,
        customer: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAnimal({
        ...updateAnimal,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAnimalFunc(updateAnimal)
      .then(() => {
        setReload(true);
        setUpdateAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: "",
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //--Search Animal
  const handleSearchAnimal = () => {
    getAnimalByName(search).then((data) => {
      setAnimals(data);
    });
  };

  //--Search Animal By Customer Name
  const handleSearchAnimalByCustomerName = () => {
    getAnimalByCustomerName(customerSearch).then((data) => {
      setAnimals(data);
    });
  };

  //--Reset search fields
  const handleReset = () => {
    setSearch("");
    setCustomerSearch("");
    setAnimals(searchResults);
  };

  return (
    <>
      <h1>Hayvan Yönetim Ekranı</h1>
      <div className="general-container">
        <div className="list-container">
          <div className="list">
            <h3>Hayvan Listesi</h3>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>İsim</th>
                    <th>Tür</th>
                    <th>Cins</th>
                    <th>Cinsiyet</th>
                    <th>Renk</th>
                    <th>Doğum Tarihi</th>
                    <th>Sahibi</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {animals.map((animal) => (
                    <tr key={animal.id}>
                      <td>{animal.name}</td>
                      <td>{animal.species}</td>
                      <td>{animal.breed}</td>
                      <td>{animal.gender}</td>
                      <td>{animal.colour}</td>
                      <td>{animal.dateOfBirth}</td>
                      <td>{animal.customer.name}</td>
                      <td>
                        <span onClick={() => handleUpdateBtn(animal)}>
                          <UpdateIcon />
                        </span>
                        <span onClick={() => handleDelete(animal.id)}>
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
          <div className="animal-newAnimal">
            <h2>Yeni Hayvan</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={newAnimal.name}
              onChange={handleNewAnimal}
            />
            <input
              type="text"
              placeholder="Species"
              name="species"
              value={newAnimal.species}
              onChange={handleNewAnimal}
            />
            <input
              type="text"
              placeholder="Breed"
              name="breed"
              value={newAnimal.breed}
              onChange={handleNewAnimal}
            />
            <input
              type="text"
              placeholder="Gender"
              name="gender"
              value={newAnimal.gender}
              onChange={handleNewAnimal}
            />
            <input
              type="text"
              placeholder="Colour"
              name="colour"
              value={newAnimal.colour}
              onChange={handleNewAnimal}
            />
            <input
              type="text"
              placeholder="Date Of Birth"
              name="dateOfBirth"
              value={newAnimal.dateOfBirth}
              onChange={handleNewAnimal}
            />
            <select name="customer" onChange={handleNewAnimal}>
              <option value="" disabled={true} selected={true}>
                Select customer
              </option>
              {customers.map((customer) => {
                return (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
                  </option>
                );
              })}
            </select>
            <button onClick={handleCreate} className="button-submit">
              Create
            </button>
            {alert === 1 ? (
              <Alert severity="error">
                Bu hayvan daha önce sisteme eklenmiş!
              </Alert>
            ) : null}
          </div>
          <div className="animal-updateAnimal">
            <h2>Hayvan güncelle</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleUpdateChange}
              value={updateAnimal.name}
            />
            <input
              type="text"
              placeholder="Species"
              name="species"
              onChange={handleUpdateChange}
              value={updateAnimal.species}
            />
            <input
              type="text"
              placeholder="Breed"
              name="breed"
              onChange={handleUpdateChange}
              value={updateAnimal.breed}
            />
            <input
              type="text"
              placeholder="Gender"
              name="gender"
              onChange={handleUpdateChange}
              value={updateAnimal.gender}
            />
            <input
              type="text"
              placeholder="Colour"
              name="colour"
              onChange={handleUpdateChange}
              value={updateAnimal.colour}
            />
            <input
              type="text"
              placeholder="Date Of Birth"
              name="dateOfBirth"
              onChange={handleUpdateChange}
              value={updateAnimal.dateOfBirth}
            />
            <select name="customer" onChange={handleUpdateChange}>
              <option value="" disabled={true} selected={true}>
                Select Customer
              </option>
              {customers.map((customer) => {
                return (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
                  </option>
                );
              })}
            </select>
            <button onClick={handleUpdate} className="button-submit">
              Update
            </button>
            {alert === 2 ? (
              <Alert severity="error">
                Lütfen güncellemek istediğiniz hayvanı seçin!
              </Alert>
            ) : null}
          </div>

          <div className="search-bar-animal">
            <h2>Hayvan Ara</h2>
            <input
              type="text"
              placeholder="Hayvan ismi giriniz... "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearchAnimal} className="button-submit">
              Search
            </button>
          </div>

          <div className="search-bar-customer">
            <h2>Müşteri Ara</h2>
            <input
              type="text"
              placeholder="Müşteri ismi giriniz... "
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
            />
            <button
              onClick={handleSearchAnimalByCustomerName}
              className="button-submit"
            >
              Search
            </button>
          </div>

          <div className="search-bar-reset">
            <button className="button-submit" onClick={handleReset}>
              Show All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Animal;
