import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [showFormDoctor, setShowFormDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  useEffect(() => {
  const name = sessionStorage.getItem('name') || '';
  const doctorData = JSON.parse(localStorage.getItem('doctorData'));
  setFormData((prev) => ({ ...prev, name }));

  const bookedAppointments = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Excluir reviews y otras claves que no son citas
    if (
      key === 'doctorData' ||
      key.startsWith('review_') ||
      key.startsWith('config') ||
      key.startsWith('auth') ||
      key === 'email'
    ) {
      continue;
    }

    const appt = JSON.parse(localStorage.getItem(key));

    if (appt?.date && appt?.time) {
      // Usar doctorData como respaldo si no hay speciality en la cita
      const doctorSpeciality =
        appt.speciality || (doctorData?.name === key ? doctorData.speciality : 'Unknown');

      const reviewKey = `review_${key}`;
      const savedReview = localStorage.getItem(reviewKey);

      bookedAppointments.push({
        doctorName: key,
        speciality: doctorSpeciality,
        review: savedReview ? JSON.parse(savedReview) : null,
      });
    }
  }

  setAppointments(bookedAppointments);
}, []);


  const handleClickHere = (doctorName) => {
    setShowFormDoctor(doctorName);
    const name = sessionStorage.getItem("name") || "";
    setFormData({ name, review: '', rating: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, review, rating } = formData;
    if (!name || !review || rating === 0) {
      alert("Please fill all fields and select a rating.");
      return;
    }

    const reviewData = { name, review, rating };
    const key = `review_${showFormDoctor}`;
    localStorage.setItem(key, JSON.stringify(reviewData));
    setShowFormDoctor(null);
    alert("Review submitted successfully!");
    window.location.reload(); // refrescar para cargar review en tabla
  };

  return (
    <div className="review-wrapper">
      <h2>Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => {
            const reviewKey = `review_${appt.doctorName}`;
            const review = JSON.parse(localStorage.getItem(reviewKey));
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.speciality}</td>
                <td>
                  {review ? (
                    <button disabled>Submitted</button>
                  ) : (
                    <button onClick={() => handleClickHere(appt.doctorName)}>Click Here</button>
                  )}
                </td>
                <td>
                  {review ? (
                    <div className="review-text">
                      <p>{review.review}</p>
                      <p>{'★'.repeat(review.rating)}</p>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Formulario fuera de la tabla */}
      {showFormDoctor && (
        <div className="review-form-container">
          <form onSubmit={handleSubmit} className="review-form-box">
            <h3>Give Your Review</h3>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label>Review:</label>
              <textarea
                name="review"
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              />
            </div>
            <div>
              <label>Rating:</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    color: star <= formData.rating ? "gold" : "gray",
                    fontSize: "20px",
                    marginRight: "4px"
                  }}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
