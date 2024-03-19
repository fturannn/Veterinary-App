import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Alert from "@mui/material/Alert";
import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
} from "../../API/doctor";
import { Outlet } from "react-router-dom";
import "./Doctor.css";

function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(0);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctor(data);
      setSearchResults(data);
    });
    setReload(false);
  }, [reload]);

  //--Delete Doctor--
  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    });
  };

  //--New Doctor
  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    createDoctor(newDoctor)
      .then(() => {
        setReload(true);
        setNewDoctor({
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

  //--Update Doctor
  const handleUpdateBtn = (doctor) => {
    setUpdateDoctor(doctor);
  };

  const handleUpdateChange = (event) => {
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateDoctorFunc(updateDoctor)
      .then(() => {
        setReload(true);
        setUpdateDoctor({
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

  //--Search Doctor
  const handleSearch = () => {
    const filteredDoctor = searchResults.filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
    );
    setDoctor(filteredDoctor);
  };

  const handleReset = () => {
    setSearch("");
    setDoctor(searchResults);
  };

  return (
    <>
      <h1>Doktor Yönetim Ekranı</h1>
      <div className="general-container-doctors">
        <div className="doctors">
          <div className="list-container">
            <div className="list">
              <h3>Doktor Listesi</h3>

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
                    {doctor.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.mail}</td>
                        <td>{doctor.address}</td>
                        <td>{doctor.city}</td>
                        <td>{doctor.phone}</td>
                        <td>
                          <span onClick={() => handleUpdateBtn(doctor)}>
                            <UpdateIcon />
                          </span>
                          <span onClick={() => handleDelete(doctor.id)}>
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
            <div className="doctor-newDoctor">
              <h2>Yeni Doktor</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newDoctor.name}
                onChange={handleNewDoctor}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={newDoctor.phone}
                onChange={handleNewDoctor}
              />
              <input
                type="text"
                placeholder="Mail"
                name="mail"
                value={newDoctor.mail}
                onChange={handleNewDoctor}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={newDoctor.address}
                onChange={handleNewDoctor}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={newDoctor.city}
                onChange={handleNewDoctor}
              />
              <button onClick={handleCreate} className="button-submit">
                Create
              </button>
              {alert === 1 ? (
                <Alert severity="error">
                  Bu doktor daha önce sisteme eklenmiş!
                </Alert>
              ) : null}
            </div>
            <div className="doctor-updateDoctor">
              <h2>Doktor güncelle</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleUpdateChange}
                value={updateDoctor.name}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={handleUpdateChange}
                value={updateDoctor.phone}
              />
              <input
                type="text"
                placeholder="Mail"
                name="mail"
                onChange={handleUpdateChange}
                value={updateDoctor.mail}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleUpdateChange}
                value={updateDoctor.address}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={handleUpdateChange}
                value={updateDoctor.city}
              />
              <button onClick={handleUpdate} className="button-submit">
                Update
              </button>
              {alert === 2 ? (
                <Alert severity="error">
                  Lütfen güncellemek istediğiniz doktoru seçin!
                </Alert>
              ) : null}
            </div>

            <div className="search-bar">
              <h2>Doktor Ara</h2>
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
        <Outlet />
      </div>
    </>
  );
}

export default Doctor;
