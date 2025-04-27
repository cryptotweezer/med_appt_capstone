import React, { useState } from 'react';
import './FindDoctorSearch.css';
import DoctorCard from '../DoctorCard/DoctorCard';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ENT) Specialist',
  'Homeopath',
  'Ayurveda'
];

// Lista de doctores de ejemplo
const doctors = [
  { name: 'Dr. John Smith', speciality: 'Dentist', experience: 10, ratings: '⭐⭐⭐⭐' },
  { name: 'Dr. Sarah Brown', speciality: 'Gynecologist/obstetrician', experience: 8, ratings: '⭐⭐⭐' },
  { name: 'Dr. Emily Davis', speciality: 'Dermatologist', experience: 5, ratings: '⭐⭐⭐⭐⭐' },
  { name: 'Dr. Mark Wilson', speciality: 'Dentist', experience: 12, ratings: '⭐⭐⭐⭐' },
];

const FindDoctorSearch = () => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialities, setSpecialities] = useState(initSpeciality);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    setSelectedSpeciality(speciality);
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
            <div className="findiconimg">
              <img className="findIcon" src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" />
            </div>
            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialities.map((speciality) => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleDoctorSelect(speciality)}
                >
                  <span>
                    <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{ height: '10px', width: '10px' }} width="12" />
                  </span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mostrar DoctorCard cuando seleccionen una especialidad */}
        <div style={{ marginTop: '20px' }}>
          {selectedSpeciality && (
            doctors
              .filter((doc) => doc.speciality === selectedSpeciality)
              .map((doc) => (
                <DoctorCard
                  key={doc.name}
                  name={doc.name}
                  speciality={doc.speciality}
                  experience={doc.experience}
                  ratings={doc.ratings}
                />
              ))
          )}
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
