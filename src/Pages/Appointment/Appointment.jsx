import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Alert from "@mui/material/Alert";
import {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAppointmentByDoctorAndDateRange,
  getAppointmentByAnimalAndDateRange,
} from "../../API/appointment";
import { getDoctors } from "../../API/doctor";
import { getAnimals } from "../../API/animal";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [alert, setAlert] = useState(0);
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: "",
    animal: "",
  });

  useEffect(() => {
    getAppointments().then((data) => {
      console.log(data);
      setAppointments(data);
      setSearchResults(data);
    });
    getDoctors().then((data) => {
      setDoctors(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
    });
    setReload(false);
  }, [reload]);

  //--Delete Appointment--
  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  //--New Appointment
  const handleNewAppointment = (event) => {
    if (event.target.name === "doctor") {
      setNewAppointment({
        ...newAppointment,
        doctor: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "animal") {
      setNewAppointment({
        ...newAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createAppointment(newAppointment)
      .then(() => {
        setReload(true);
        setNewAppointment({
          appointmentDate: "",
          doctor: {
            id: "",
          },
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

  //--Update Appointment
  const handleUpdateBtn = (appointment) => {
    setUpdateAppointment(appointment);
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "doctor") {
      setUpdateAppointment({
        ...updateAppointment,
        doctor: {
          id: event.target.value,
        },
      });
    } else if (event.target.name === "animal") {
      setUpdateAppointment({
        ...updateAppointment,
        animal: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateAppointment({
        ...updateAppointment,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateAppointmentFunc(updateAppointment)
      .then(() => {
        setReload(true);
        setUpdateAppointment({
          appointmentDate: "",
          doctor: "",
          animal: "",
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

  const handleSearchDoctorChange = (event) => {
    setDoctorId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleDoctorDateSearchBtn = () => {
    getAppointmentByDoctorAndDateRange(doctorId, startDate, endDate).then(
      (data) => {
        setAppointments(data);
      }
    );
  };

  const handleSearchAnimalChange = (event) => {
    setAnimalId(event.target.value);
    const filteredAppointment = searchResults.filter((appointment) =>
      appointment.appointmentDate.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filteredAppointment);
    setSearch("");
  };

  const handleAnimalDateSearchBtn = () => {
    getAppointmentByAnimalAndDateRange(animalId, startDate, endDate).then(
      (data) => {
        setAppointments(data);
      }
    );
  };

  const handleReset = () => {
    setSearch("");
    setDoctorId("");
    setAnimalId("");
    setAppointments(searchResults);
  };

  return (
    <>
      <h1>Randevu Yönetim Ekranı</h1>
      <div className="general-container">
        <div className="list-container">
          <div className="list">
            <h3>Randevu Listesi</h3>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tarih</th>
                    <th>Doktor</th>
                    <th>Hayvan</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.appointmentDate}</td>
                      <td>{appointment.doctor.name}</td>
                      <td>{appointment.animal.name}</td>
                      <td>
                        <span onClick={() => handleUpdateBtn(appointment)}>
                          <UpdateIcon />
                        </span>
                        <span onClick={() => handleDelete(appointment.id)}>
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
          <div className="appointment-newAppointment">
            <h2>Yeni Randevu</h2>
            <input
              type="datetime-local"
              placeholder="Appointment Date"
              name="appointmentDate"
              value={newAppointment.appointmentDate}
              onChange={handleNewAppointment}
            />
            <select
              value={newAppointment.doctor.id}
              name="doctor"
              onChange={handleNewAppointment}
            >
              <option value="" disabled={true} selected={true}>
                Select doctor
              </option>
              {doctors.map((doctor) => {
                return (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                );
              })}
            </select>
            <select
              value={newAppointment.animal.id}
              name="animal"
              onChange={handleNewAppointment}
            >
              <option value="" disabled={true} selected={true}>
                Select animal
              </option>
              {animals.map((animal) => {
                return (
                  <option key={animal.id} value={animal.id}>
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
                Doktor bu tarihte müsait değil. Lütfen başka bir tarih seçin!
              </Alert>
            ) : null}
          </div>
          <div className="appointment-updateAppointment">
            <h2>Randevu güncelle</h2>
            <input
              type="datetime-local"
              placeholder="Appointment Date"
              name="appointmentDate"
              onChange={handleUpdateChange}
              value={updateAppointment.appointmentDate}
            />
            <select
              value={updateAppointment.doctor.id}
              name="doctor"
              onChange={handleUpdateChange}
            >
              <option value="" disabled={true} selected={true}>
                Select appointment
              </option>
              {doctors.map((doctor) => {
                return <option value={doctor.id}>{doctor.name}</option>;
              })}
            </select>

            <select
              value={updateAppointment.animal.id}
              name="animal"
              onChange={handleUpdateChange}
            >
              <option value="" disabled={true} selected={true}>
                Select animal
              </option>
              {animals.map((animal) => {
                return <option value={animal.id}>{animal.name}</option>;
              })}
            </select>
            <button onClick={handleUpdate} className="button-submit">
              Update
            </button>
            {alert === 2 ? (
              <Alert severity="error">Bu tarihte bir randevu mevcut!</Alert>
            ) : null}
          </div>

          <div className="search-bar">
            <h2>Doktora Göre Randevu Araması</h2>
            <select
              value={doctorId}
              name="doctor"
              onChange={handleSearchDoctorChange}
            >
              <option value="" disabled={true} selected={true}>
                Select doctor
              </option>
              {doctors.map((doctor) => {
                return <option value={doctor.id}>{doctor.name}</option>;
              })}
            </select>

            <input
              type="date"
              placeholder="Start Date "
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="date"
              placeholder="End Date "
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <button
              onClick={handleDoctorDateSearchBtn}
              className="button-submit"
            >
              Search
            </button>

            <h2>Hayvana Göre Randevu Araması</h2>

            <select
              value={animalId}
              name="animal"
              onChange={handleSearchAnimalChange}
            >
              <option value="" disabled={true} selected={true}>
                Select animal
              </option>
              {animals.map((animal) => {
                return <option value={animal.id}>{animal.name}</option>;
              })}
            </select>

            <input
              type="date"
              placeholder="start-date "
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="date"
              placeholder="end-date "
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <button
              onClick={handleAnimalDateSearchBtn}
              className="button-submit"
            >
              Search
            </button>
          </div>

          <button className="button-submit" onClick={handleReset}>
            Show All
          </button>
        </div>
      </div>
    </>
  );
}

export default Appointment;
