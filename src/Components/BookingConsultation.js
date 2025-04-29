import React, { useState, useEffect } from 'react';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const doctors = [
  { name: 'Dr. John Smith', speciality: 'Dentist', experience: 10, ratings: '⭐⭐⭐⭐' },
  { name: 'Dr. Sarah Brown', speciality: 'Gynecologist/obstetrician', experience: 8, ratings: '⭐⭐⭐' },
  { name: 'Dr. Emily Davis', speciality: 'Dermatologist', experience: 5, ratings: '⭐⭐⭐⭐⭐' },
  { name: 'Dr. Mark Wilson', speciality: 'Dentist', experience: 12, ratings: '⭐⭐⭐⭐' },
];

const BookingConsultation = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setUsername(storedUsername.split('@')[0]);
    }

    const allAppointments = [];
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      if (key !== 'doctorData' && key !== 'auth-token' && key !== 'email') {
        const appointmentData = JSON.parse(localStorage.getItem(key));
        if (appointmentData) {
          allAppointments.push({ doctorName: key, appointmentData });
        }
      }
    });

    setAppointments(allAppointments);
  }, []);

  const handleCancelAppointment = (doctorName) => {
    localStorage.removeItem(doctorName);
    setAppointments(prev => prev.filter(app => app.doctorName !== doctorName));
  };

  const handleDoctorSelect = (speciality) => {
    setSelectedSpeciality(speciality);
  };

  const filteredDoctors = doctors.filter(doc => doc.speciality === selectedSpeciality);

  return (
    <div className="searchpage-container">
      <FindDoctorSearch onDoctorSelect={handleDoctorSelect} />

      {selectedSpeciality && (
        <>
          <h2 style={{ textAlign: "center" }}>
            {filteredDoctors.length} doctors are available
          </h2>
          <h3 style={{ textAlign: "center" }}>
            Book appointments with minimum wait-time & verified doctor details
          </h3>

          <div className="search-results-container">
            {filteredDoctors.map((doc) => (
              <DoctorCard
                key={doc.name}
                name={doc.name}
                speciality={doc.speciality}
                experience={doc.experience}
                ratings={doc.ratings}
              />
            ))}
          </div>
        </>
      )}

      {appointments.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Your Appointments</h2>
          <div className="search-results-container">
            {appointments.map((item, index) => (
              <div key={index} style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                width: '400px',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
              }}>
                <h3 style={{ textAlign: 'center' }}>Appointment Details</h3>
                <p><strong>Doctor:</strong> {item.doctorName}</p>
                <p><strong>Speciality:</strong> {JSON.parse(localStorage.getItem('doctorData'))?.speciality || ''}</p>
                <p><strong>Name:</strong> {username}</p>
                <p><strong>Phone Number:</strong> {item.appointmentData.phoneNumber}</p>
                <p><strong>Date of Appointment:</strong> {item.appointmentData.date}</p>
                <p><strong>Time Slot:</strong> {item.appointmentData.time}</p>

                <button
                  onClick={() => handleCancelAppointment(item.doctorName)}
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConsultation;
