import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const reports = [
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      speciality: 'Cardiology',
      reportLink: '/patient_report.pdf',
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      speciality: 'Dermatology',
      reportLink: '/patient_report.pdf',
    },
  ];

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <a
                  href={report.reportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  View Report
                </a>
              </td>
              <td>
                <a
                  href={report.reportLink}
                  download
                  className="btn"
                >
                  Download Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
