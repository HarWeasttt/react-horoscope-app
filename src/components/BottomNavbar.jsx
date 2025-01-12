import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaUser, FaList } from 'react-icons/fa';
import telescope from '../images/telescope.png';
import horoscope from '../images/horoscope.png';
import coin from '../images/coins.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const BottomNavbar = () => {
  return (
    <Navbar fixed="bottom" style={{ background: '#4475fc' }} className='text-black'>
      <Container>
        <Nav className="justify-content-around w-100">
          <NavLink to="/home" className="d-flex flex-column align-items-center nav-link" activeClassName="active">
            <img src={telescope} alt="Home" className="nav-icon" />
            <div className="nav-text">Stargazer</div>
          </NavLink>
          <NavLink to="/wallet" className="d-flex flex-column align-items-center nav-link" activeClassName="active">
            <img src={coin} alt="Wallet" className="nav-icon" />
            <div className="nav-text">AirDrop</div>
          </NavLink>
          <NavLink to="/horoscope" className="d-flex flex-column align-items-center nav-link" activeClassName="active">
            <img src={horoscope} alt="Horoscope" className="nav-icon" />
            <div className="nav-text">Horoscope</div>
          </NavLink>
          <NavLink to="/friends" className="d-flex flex-column align-items-center nav-link" activeClassName="active">
            <FaUser className="nav-icon" />
            <div className="nav-text">Friends</div>
          </NavLink>
          <NavLink to="/tasks" className="d-flex flex-column align-items-center nav-link" activeClassName="active">
            <FaList className="nav-icon" />
            <div className="nav-text">Tasks</div>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BottomNavbar;