import React, { useState } from 'react';
import './FindDoctorSearch.css';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ENT) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearch = ({ onDoctorSelect }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    if (onDoctorSelect) {
      onDoctorSelect(speciality);
    }
  };

  return (
    <div className="finddoctor">
      <h1 className="finddoctor-title">Find a doctor and Consult instantly</h1>
      <div className="home-search-container">
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
            <img className="findIcon" src={process.env.PUBLIC_URL + '/images/search.svg'} alt="search" />
          </div>
          {!doctorResultHidden && (
            <div className="search-doctor-input-results">
              {initSpeciality.map((speciality) => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleDoctorSelect(speciality)}
                >
                  <span>
                    <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{ height: '10px', width: '10px' }} />
                  </span>
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDoctorSearch;
