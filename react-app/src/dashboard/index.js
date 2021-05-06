import React from 'react';

import MyCompanies from "../components/companies"
import MyInterviews from "../components/interviews"
import MyApplications from "../components/applications"
import NavBar from "../components/navbar"
import './dashboard.css'



const MainBody = () => {

  const showCompanies = () => {
    const company_block = document.getElementById("companies-block");
    const application_block = document.getElementById("applications-block");
    const interviews_block = document.getElementById("interviews-block");
    company_block.className = "show-block-info"
    application_block.className = "applications-block"
    interviews_block.className = "interviews-block"
  }
  const showApplications = () => {
    const company_block = document.getElementById("companies-block");
    const application_block = document.getElementById("applications-block");
    const interviews_block = document.getElementById("interviews-block");
    company_block.className = "companies-block"
    application_block.className = "show-block-info"
    interviews_block.className = "interviews-block"
  }
  const showInterviews = () => {
    const company_block = document.getElementById("companies-block");
    const application_block = document.getElementById("applications-block");
    const interviews_block = document.getElementById("interviews-block");
    company_block.className = "companies-block"
    application_block.className = "applications-block"
    interviews_block.className = "show-block-info"
  }
  return (
    <div className="main__container">
      <NavBar />
      <div className="container-labels">

        <div onClick={() => showCompanies()} className="company-label">Companies</div>
        <div onClick={() => showApplications()} className="application-label">Applications</div>
        <div onClick={() => showInterviews()} className="interview-label">Interviews</div>
      </div>
      <MyCompanies />
      <MyApplications />
      <MyInterviews />
    </div>
  )
}

export default MainBody
