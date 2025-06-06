import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../../UserContext';

const Navbar = () => {
  const { userName, userEmail, setUserEmail } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    setUserEmail('');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">StayHealthy</Link>
      </div>

      <div className="nav__icon">
        <i className="fa fa-bars"></i>
      </div>

      <ul className="nav__links active">
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/booking-consultation">Appointments</Link>
        </li>

        {!userEmail ? (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        ) : (
          <li className="link dropdown">
            <span className="dropdown-toggle">
              {userName || 'User'} ▼
            </span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/profile">Your Profile</Link>
              </li>
              <li>
                <Link to="/reports">Your Reports</Link>
              </li>
              <li>
                <Link to="/review">Reviews</Link>
              </li>
              <li>
                <button className="btn1" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
