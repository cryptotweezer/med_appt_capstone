# 🩺 Med Appointment App

A full-stack web application that allows patients to:
- Search doctors by specialty
- Book medical appointments
- View and cancel booked appointments
- Edit their profile
- Access medical reports and leave reviews

---

## 🚀 Main Features

- User registration and login
- Doctor search by specialty
- Appointment booking with visual confirmation
- Patient dashboard with active appointments
- Profile editing (name, phone)
- Doctor reviews and downloadable PDF reports

---

## 🛠️ Tech Stack

- **Frontend:** React + React Router DOM
- **Backend:** Node.js + Express + MongoDB
- **Others:** UUID, BcryptJS, JWT, Express Validator

---

## ▶️ How to Run the Application

### 1. Clone the Repository
```bash
git clone <REPO_URL>
cd med_appt

2. Install Dependencies
Frontend (React)
cd frontend
npm install

Backend (Node/Express)
cd server
npm install

3. Run the Backend
cd server
node index.js

4. Run the Frontend
cd frontend
npm start


📌 Notes
Make sure MongoDB is running locally or configured via .env.

Appointments are stored in localStorage, so they persist in the browser.

User name updates globally via UserContext.



