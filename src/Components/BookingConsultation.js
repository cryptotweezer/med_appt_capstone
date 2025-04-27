import React, { useState } from 'react';
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

  const handleDoctorSelect = (speciality) => {
    setSelectedSpeciality(speciality);
  };

  return (
    <div className="searchpage-container">
      <FindDoctorSearch onDoctorSelect={handleDoctorSelect} />
      
      {selectedSpeciality && (
        <>
          <h2 style={{ textAlign: "center" }}>
            {doctors.filter(doc => doc.speciality === selectedSpeciality).length} doctors are available
          </h2>
          <h3 style={{ textAlign: "center" }}>Book appointments with minimum wait-time & verified doctor details</h3>

          <div className="search-results-container">
            {doctors.filter(doc => doc.speciality === selectedSpeciality).length > 0 ? (
              doctors
                .filter(doc => doc.speciality === selectedSpeciality)
                .map((doc) => (
                  <DoctorCard
                    key={doc.name}
                    name={doc.name}
                    speciality={doc.speciality}
                    experience={doc.experience}
                    ratings={doc.ratings}
                  />
                ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookingConsultation;
