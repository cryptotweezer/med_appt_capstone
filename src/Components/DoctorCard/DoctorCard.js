import React, { useState, useEffect } from 'react';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem(name));
    if (storedAppointments) {
      setAppointments([storedAppointments]);
    }
  }, [name]);

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    setAppointments([newAppointment]);
    setShowForm(false);

    const doctorData = {
      name: name,
      speciality: speciality,
    };

    const appointmentDetails = {
      phoneNumber: appointmentData.phoneNumber,
      date: appointmentData.appointmentDate,
      time: appointmentData.appointmentTime,
    };

    localStorage.setItem('doctorData', JSON.stringify(doctorData));
    localStorage.setItem(name, JSON.stringify(appointmentDetails));
  };

  const handleCancelAppointment = () => {
    setAppointments([]);
    localStorage.removeItem('doctorData');
    localStorage.removeItem(name);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>

        <div className="doctor-card-options-container">
          <button
            className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
            onClick={appointments.length > 0 ? handleCancelAppointment : () => setShowForm(true)}
          >
            {appointments.length > 0 ? 'Cancel Appointment' : 'Book Appointment'}
          </button>

          {showForm && (
            <AppointmentForm
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
