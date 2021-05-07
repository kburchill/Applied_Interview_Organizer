import React, { useState } from 'react';

import MyCompanies from "../components/companies"
import MyInterviews from "../components/interviews"
import MyApplications from "../components/applications"
import NavBar from "../components/navbar"
import './dashboard.css'

const showCompanies = <MyCompanies />
const showInterviews = <MyInterviews />
const showApplications = <MyApplications />


const MainBody = () => {
  const [showCompanies, setShowCompanies] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showInterviews, setShowInterviews] = useState(false);

  const setCompanies = () => {
    setShowCompanies(true)
    setShowApplications(false)
    setShowInterviews(false)
  }
  const setApplications = () => {
    setShowCompanies(false)
    setShowApplications(true)
    setShowInterviews(false)
  }
  const setInterviews = () => {
    setShowCompanies(false)
    setShowApplications(false)
    setShowInterviews(true)
  }
  return (
    <div className="main__container">
      <NavBar />
      <div className="container-labels">

        <div onClick={() => setCompanies()} className="company-label">Companies</div>
        <div onClick={() => setApplications()} className="application-label">Applications</div>
        <div onClick={() => setInterviews()} className="interview-label">Interviews</div>
      </div>
      {showCompanies && <MyCompanies />}
      {showApplications && <MyApplications />}
      {showInterviews && <MyInterviews />}
    </div>
  )
}

export default MainBody
