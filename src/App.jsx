import { Route, Routes } from "react-router-dom";
import "./App.css";
import Customer from "./Pages/Customer/Customer";
import Animal from "./Pages/Animal/Animal";
import Doctor from "./Pages/Doctor/Doctor";
import Navbar from "./Components/Navbar";
import AvailableDate from "./Pages/AvailableDate/AvailableDate";
import Appointment from "./Pages/Appointment/Appointment";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Report from "./Pages/Report/Report";
import HomePage from "./Pages/Home/Home.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="route-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/doctor" element={<Doctor />}>
            <Route index={true} element={<AvailableDate />} />
          </Route>
          <Route path="/appointment" element={<Appointment />}></Route>
          <Route path="/report" element={<Report />}></Route>
          <Route path="/vaccine" element={<Vaccine />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
