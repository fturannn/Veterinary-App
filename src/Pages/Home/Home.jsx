import React from 'react';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import './Home.css';
import main from "../../assets/main.jpg";

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-message">VetApp</h2>
      <img src={main} alt="Home Page Image" />
      <Link to="/customer" className="login-btn">Hoşgeldiniz</Link>
    </div>
  );
}

export default Home;


Home.jsx