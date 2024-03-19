import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import {
  getAvailableDates,
  deleteAvailableDate,
  createAvailableDate,
  updateAvailableDateFunc,
} from "../../API/availableDate";
import { getDoctors } from "../../API/doctor";

function AvailableDate() {
  const [availableDate, setAvailableDate] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });
  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctor: "",
  });

  useEffect(() => {
    getAvailableDates().then((data) => {
      setAvailableDate(data);
      setSearchResults(data);
    });
    getDoctors().then((data) => {
      setDoctors(data);
    });
    setReload(false);
  }, [reload]);

  //--Delete Available Date--
  const handleDelete = (id) => {
    deleteAvailableDate(id).then(() => {
      setReload(true);
    });
  };

  //--New Available Date

  const handleNewAvailableDate = (event) => {
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAvailableDate(newAvailableDate).then(() => {
      setReload(true);
    });
    setNewAvailableDate({
        availableDate: "",
        doctor: {
            id: ""
          },
    });
  };

  //--Update Available Date
  const handleUpdateBtn = (availableDate) => {
    setUpdateAvailableDate(availableDate);
  };

  const handleUpdateChange = (event) => {
    setUpdateAvailableDate({
      ...updateAvailableDate,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateAvailableDateFunc(updateAvailableDate).then(() => {
      setReload(true);
    });
    setUpdateAvailableDate({
      availableDate: "",
      doctor: "",
    });
  };

  //--Search Available Date
  const handleInputSelect = (event) => {
    setSearch(event.target.value);
    if (event.target.name === "doctor") {
      setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: event.target.value,
        },
      });
    } else {
      setNewAvailableDate({
        ...newAvailableDate,
        [event.target.name]: event.target.value,
      });
    }
    console.log(newAvailableDate);
  };

  const handleSearch = () => {
    const filteredAvailableDate = searchResults.filter((availableDate) =>
      availableDate.availableDate.toLowerCase().includes(search.toLowerCase())
    );
    setAvailableDate(filteredAvailableDate);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setAvailableDate(searchResults);
  };

  return (
    <>
      <h1>Müsait Tarih Yönetim Ekranı</h1>
      <div className="general-container">
        <div className="list-container">
          <div className="list">
            <h3>Doktor Müsait Tarih Listesi</h3>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tarih</th>
                    <th>Doktor</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {availableDate.map((availableDate) => (
                    <tr key={availableDate.id}>
                      <td>{availableDate.availableDate}</td>
                      <td>{availableDate.doctor.name}</td>
                      <td>
                        <span onClick={() => handleUpdateBtn(availableDate)}>
                          <UpdateIcon />
                        </span>
                        <span onClick={() => handleDelete(availableDate.id)}>
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
          <div className="availableDate-newAvailableDate">
            <h2>Yeni Müsaitlik Tarihi</h2>
            <input
              type="date"
              placeholder="Available Date"
              name="availableDate"
              value={newAvailableDate.availableDate}
              onChange={handleNewAvailableDate}
            />
            <select
              value={newAvailableDate.doctor.id}
              name="doctor"
              onChange={handleNewAvailableDate}
            >
              <option value="" disabled={true} selected={true}>
                Select doctor
              </option>
              {doctors.map((doctor) => {
                return (
                  <option value={doctor.id} key={doctor.id}>
                    {doctor.name}
                  </option>
                );
              })}
            </select>
            <button onClick={handleCreate} className="button-submit">
              Create
            </button>
          </div>
          <div className="availableDate-updateAvailableDate">
            <h2>Doktor Müsaitlik güncelle</h2>
            <input
              type="date"
              placeholder="Available Date"
              name="availableDate"
              onChange={handleUpdateChange}
              value={updateAvailableDate.availableDate}
            />
            <select
              value={updateAvailableDate.doctor.id}
              name="doctor"
              onChange={handleUpdateChange}
            >
              <option value="" disabled={true} selected={true}>
                Select doctor
              </option>
              {doctors.map((doctor) => {
                return (
                  <option value={doctor.id} key={doctor.id}>
                    {doctor.name}
                  </option>
                );
              })}
            </select>
            <button onClick={handleUpdate} className="button-submit">
              Update
            </button>
          </div>

          <div className="search-bar">
            <h2>Müsait Tarih Ara</h2>
            <select value={search} name="doctor" onChange={handleInputSelect}>
              <option value="" disabled={true} selected={true}>
                Doktor Seç
              </option>
              {doctors.map((doctor) => {
                return (
                  <option value={doctor.id} key={doctor.id}>
                    {doctor.name}
                  </option>
                );
              })}
            </select>
            <input
              type="date"
              placeholder="Tarih girin... "
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

export default AvailableDate;
