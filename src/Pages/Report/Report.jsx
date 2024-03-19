import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Alert from "@mui/material/Alert";
import {
  getReports,
  deleteReport,
  createReport,
  updateReportFunc,
} from "../../API/report";
import { getAppointments } from "../../API/appointment";

function Report() {
  const [report, setReport] = useState([]);
  const [reload, setReload] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(0);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: "",
  });

  useEffect(() => {
    getReports().then((data) => {
      setReport(data);
      setSearchResults(data);
    });
    getAppointments().then((data) => {
      setAppointments(data);
    });
    setReload(false);
  }, [reload]);

  //--Delete Report--
  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  //--New Report
  const handleNewReport = (event) => {
    if (event.target.name === "appointment") {
      setNewReport({
        ...newReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCreate = () => {
    createReport(newReport)
      .then(() => {
        setReload(true);
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
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

  //--Update Report
  const handleUpdateBtn = (report) => {
    setUpdateReport(report);
  };

  const handleUpdateChange = (event) => {
    if (event.target.name === "appointment") {
      setUpdateReport({
        ...updateReport,
        appointment: {
          id: event.target.value,
        },
      });
    } else {
      setUpdateReport({
        ...updateReport,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = () => {
    updateReportFunc(updateReport)
      .then(() => {
        setReload(true);
        setUpdateReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
            id: "",
          },
        });
      })
      .catch((error) => {
        setAlert(2);
        setTimeout(() => {
          setAlert(0);
        }, 3000);
      });
  };

  //--Search Report
  const handleSearch = () => {
    const filteredReport = searchResults.filter((report) =>
      report.title.toLowerCase().includes(search.toLowerCase())
    );
    setReport(filteredReport);
    setSearch("");
  };

  const handleReset = () => {
    setSearch("");
    setReport(searchResults);
  };

  return (
    <>
      <h1>Rapor Yönetim Ekranı</h1>
      <div className="general-container">
        <div className="list-container">
          <div className="list">
            <h3>Rapor Listesi</h3>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Başlık</th>
                    <th>Tanı</th>
                    <th>Fiyat</th>
                    <th>Hayvan</th>
                    <th>Müşteri</th>
                    <th>Doktor</th>
                    <th>Aşı Listesi</th>
                    <th>İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map((report) => (
                    <tr key={report.id}>
                      <td>{report.title}</td>
                      <td>{report.diagnosis}</td>
                      <td>{report.price}</td>
                      <td>{report.animalName}</td>
                      <td>{report.customerName}</td>
                      <td>{report.doctorName}</td>
                      <td>
                        {report.vaccineList?.map((vaccineLists) => (
                          <span>{vaccineLists.name} , </span>
                        ))}
                      </td>
                      <td>
                        <span onClick={() => handleUpdateBtn(report)}>
                          <UpdateIcon />
                        </span>
                        <span onClick={() => handleDelete(report.id)}>
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
          <div className="report-newReport">
            <h2>Yeni Rapor</h2>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newReport.title}
              onChange={handleNewReport}
            />
            <input
              type="text"
              placeholder="Diagnosis"
              name="diagnosis"
              value={newReport.diagnosis}
              onChange={handleNewReport}
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newReport.price}
              onChange={handleNewReport}
            />
            <select
              value={newReport.appointment.id}
              name="appointment"
              onChange={handleNewReport}
            >
              <option value="" disabled={true} selected={true}>
                Select appointment
              </option>
              {appointments.map((appointment) => {
                return (
                  <option value={appointment.id}>
                    {appointment.appointmentDate}
                  </option>
                );
              })}
            </select>
            <button onClick={handleCreate} className="button-submit">
              Create
            </button>
            {alert === 1 ? (
              <Alert severity="error">
                Bu randevuya ait rapor sistemde zaten kayıtlı!
              </Alert>
            ) : null}
          </div>
          <div className="report-updateReport">
            <h2>Rapor güncelle</h2>
            <input
              type="text"
              placeholder="title"
              name="title"
              value={updateReport.title}
              onChange={handleUpdateChange}
            />
            <input
              type="text"
              placeholder="diagnosis"
              name="diagnosis"
              value={updateReport.diagnosis}
              onChange={handleUpdateChange}
            />
            <input
              type="number"
              placeholder="price"
              name="price"
              value={updateReport.price}
              onChange={handleUpdateChange}
            />
            <select name="appointment" onChange={handleUpdateChange}>
              <option value="" disabled={true} selected={true}>
                Select appointment
              </option>
              {appointments.map((appointment) => {
                return (
                  <option value={appointment.id}>
                    {appointment.appointmentDate}
                  </option>
                );
              })}
            </select>
            <button onClick={handleUpdate} className="button-submit">
              Update
            </button>
            {alert === 2 ? (
              <Alert severity="error">Bu rapor sistemde zaten kayıtlı!</Alert>
            ) : null}
          </div>

          <div className="search-bar">
            <h2>Rapor Ara</h2>
            <input
              type="text"
              placeholder="Başlık giriniz... "
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

export default Report;
