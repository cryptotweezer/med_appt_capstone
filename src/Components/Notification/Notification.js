import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Buscar todas las citas posibles en localStorage
    const allAppointments = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key !== 'doctorData' && key !== 'auth-token' && key !== 'email') {
        const appointment = JSON.parse(localStorage.getItem(key));
        const doctorData = JSON.parse(localStorage.getItem('doctorData'));

        if (appointment && doctorData && key === doctorData.name) {
          allAppointments.push({ doctor: doctorData, appointment });
        }
      }
    }

    if (allAppointments.length > 0) {
      setAppointments(allAppointments);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="notification-container">
        {isLoggedIn && appointments.length > 0 && appointments.map((item, index) => (
          <div className="appointment-card" key={index}>
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message"><strong>Doctor:</strong> {item.doctor.name}</p>
              <p className="appointment-card__message"><strong>Speciality:</strong> {item.doctor.speciality}</p>
              <p className="appointment-card__message"><strong>Name:</strong> {username.split('@')[0]}</p>
              <p className="appointment-card__message"><strong>Phone Number:</strong> {item.appointment.phoneNumber}</p>
              <p className="appointment-card__message"><strong>Date of Appointment:</strong> {item.appointment.date}</p>
              <p className="appointment-card__message"><strong>Time Slot:</strong> {item.appointment.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Aquí renderizamos el contenido de cada ruta */}
      {children}
    </div>
  );
};

export default Notification;
