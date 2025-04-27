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
  const [specialities, setSpecialities] = useState(initSpeciality);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    if (onDoctorSelect) {
      onDoctorSelect(speciality);
    }
  };

  return (
    <div className="finddoctor">
      <h1 style={{ textAlign: 'center' }}>Find a doctor and Consult instantly</h1> {/* ✅ Center con CSS */}
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
    </div>
  );
};

export default FindDoctorSearch;
