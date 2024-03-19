import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Alert from "@mui/material/Alert";
import {
  getVaccines,
  deleteVaccine,
  createVaccine,
  updateVaccineFunc,
  getUpcomingVaccines,
} from "../../API/vaccine";
import { getAnimals } from "../../API/animal";

function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [animalSearch, setAnimalSearch] = useState("");
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alert, setAlert] = useState(0);
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: "",
  });
  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: "",
  });

  useEffect(() => {
    getVaccines().then((data) => {
      setVaccines(data);
      setSearchResults(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    setReload(false);
  }, [reload]);

  //--Delete Vaccine--
  const handleDelete = (id) => {
    deleteVaccine(id).then(() => {
      setReload(true);
    });
  };

  //--New Vaccine
  const handleNewVaccine = (event) => {
    if (event.target.name === "animal") {
      setNewVaccine({
        ...newVaccine,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setNewVaccine({
        ...newVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createVaccine(newVaccine)
      .then(() => {
        console.log(newVaccine);
        setReload(true);
        setNewVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animal: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(1);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //--Update Vaccine
  const handleUpdateBtn = (vaccine) => {
    setUpdateVaccine(vaccine);
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "animal") {
      setUpdateVaccine({
        ...updateVaccine,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateVaccine({
        ...updateVaccine,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateVaccineFunc(updateVaccine)
      .then(() => {
        setReload(true);
        setUpdateVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animal: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0); // ayni isim ve code ise guncellemez, alert!
        }, 3000);
      });
  };

  //--Search Vaccine
  const handleSearchVaccineByName = () => {
    const filteredVaccine = searchResults.filter((vaccine) =>
      vaccine.name.toLowerCase().includes(nameSearch.toLowerCase())
    );
    setVaccines(filteredVaccine);
    setNameSearch("");
  };

  const handleSearchVaccineByAnimalName = () => {
    const filteredVaccine = searchResults.filter((vaccine) =>
      vaccine.animal.name.toLowerCase().includes(animalSearch.toLowerCase())
    );
    setVaccines(filteredVaccine);
    setAnimalSearch("");
  };

  const handleSearchByDates = () => {
    getUpcomingVaccines(startDate, endDate).then((data) => {
      setVaccines(data);
    });
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setNameSearch("");
    setAnimalSearch("");
    setVaccines(searchResults);
  };

  return (
    <>
      <h1>Aşı Yönetim Ekranı</h1>
      <div className="general-container">
        <div className="list-container">
          <div className="list">
            <h3>Aşı Listesi</h3>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Aşı ismi</th>
                    <th>Aşı Kodu</th>
                    <th>Koruyuculuk Başlangıç Tarihi</th>
                    <th>Koruyuculuk Bitiş Tarihi</th>
                    <th>Hayvan</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccines.map((vaccine) => (
                    <tr key={vaccine.id}>
                      <td>{vaccine.name}</td>
                      <td>{vaccine.code}</td>
                      <td>{vaccine.protectionStartDate}</td>
                      <td>{vaccine.protectionFinishDate}</td>
                      <td>{vaccine.animal.name}</td>
                      <td>
                        <span onClick={() => handleUpdateBtn(vaccine)}>
                          <UpdateIcon />
                        </span>
                        <span onClick={() => handleDelete(vaccine.id)}>
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
          <div className="vaccine-newVaccine">
            <h2>Yeni Aşı</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={newVaccine.name}
              onChange={handleNewVaccine}
            />
            <input
              type="text"
              placeholder="Code"
              name="code"
              value={newVaccine.code}
              onChange={handleNewVaccine}
            />
            <input
              type="date"
              placeholder="Protection Start Date"
              name="protectionStartDate"
              value={newVaccine.protectionStartDate}
              onChange={handleNewVaccine}
            />
            <input
              type="date"
              placeholder="Protection Finish Date"
              name="protectionFinishDate"
              value={newVaccine.protectionFinishDate}
              onChange={handleNewVaccine}
            />
            <select
              value={newVaccine.animal.id}
              name="animal"
              onChange={handleNewVaccine}
            >
              <option value="" disabled={true} selected={true}>
                Select Animal
              </option>
              {animals.map((animal) => {
                return (
                  <option value={animal.id} key={animal.id}>
                    {animal.name}
                  </option>
                );
              })}
            </select>
            <button onClick={handleCreate} className="button-submit">
              Create
            </button>
            {alert === 1 ? (
              <Alert severity="error">
                Aşı koruyuculuğu hala aktif, yeni bir aşı ekleyemezsiniz!
              </Alert>
            ) : null}
          </div>
          <div className="vaccine-updateVaccine">
            <h2>Aşı güncelle</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={updateVaccine.name}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              placeholder="Code"
              name="code"
              value={updateVaccine.code}
              onChange={handleUpdateChange}
            />
            <input
              type="date"
              placeholder="Protection Start Date"
              name="protectionStartDate"
              value={updateVaccine.protectionStartDate}
              onChange={handleUpdateChange}
            />

            <input
              type="date"
              placeholder="Protection Finish Date"
              name="protectionFinishDate"
              value={updateVaccine.protectionFinishDate}
              onChange={handleUpdateChange}
            />
            <select
              value={updateVaccine.animal.id}
              name="animal"
              onChange={handleUpdateChange}
            >
              <option value="" disabled={true} selected={true}>
                Select Animal
              </option>
              {animals.map((animal) => {
                return (
                  <option value={animal.id} key={animal.id}>
                    {animal.name}
                  </option>
                );
              })}
            </select>
            <button onClick={handleUpdate} className="button-submit">
              Update
            </button>
            {alert === 2 ? (
              <Alert severity="error">
                Aynı isimde ve kodda aşı sistemde mevcut!
              </Alert>
            ) : null}
          </div>

          <div className="search-bar">
            <h2>Aşı İsmine Göre Ara</h2>
            <input
              type="text"
              placeholder="Aşı ismi giriniz... "
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
            <button
              onClick={handleSearchVaccineByName}
              className="button-submit"
            >
              Search
            </button>
            <h2>Hayvana Göre Aşı Ara</h2>
            <input
              type="text"
              placeholder="Enter animal name... "
              value={animalSearch}
              onChange={(e) => setAnimalSearch(e.target.value)}
            />
            <button
              onClick={handleSearchVaccineByAnimalName}
              className="button-submit"
            >
              Search
            </button>
            <h2>Tarih Aralığına Göre Aşı Ara</h2>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleSearchByDates} className="button-submit">
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

export default Vaccine;
