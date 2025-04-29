import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notification from './Components/Notification/Notification';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation'; 
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard'; // 👈 importado

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find-doctor" element={<FindDoctorSearch />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/review" element={<ReviewForm />} />
            <Route path="/profile" element={<ProfileCard />} /> {/* 👈 nueva ruta */}
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
