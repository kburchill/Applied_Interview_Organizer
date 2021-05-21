import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import MyCompanies from "../components/companies"
import MyInterviews from "../components/interviews"
import MyApplications from "../components/applications"
import { get_companies } from "../store/companies"
import { get_applications } from "../store/applications"
import { get_interviews } from "../store/interviews"
import NavBar from "../components/navbar"
import Footer from "../components/footer"
import './dashboard.css'



const MainBody = () => {
  const [showCompanies, setShowCompanies] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showInterviews, setShowInterviews] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(get_companies())
    await dispatch(get_applications())
    await dispatch(get_interviews())
  }, [dispatch])

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
      <NavBar/>
      <div className="container-labels">
        <div onClick={() => setCompanies()} className="company-label">Companies</div>
        <div onClick={() => setApplications()} className="application-label">Applications</div>
        <div onClick={() => setInterviews()} className="interview-label">Interviews</div>
      </div>
      {showCompanies && <MyCompanies />}
      {showApplications && <MyApplications />}
      {showInterviews && <MyInterviews />}
      <Footer />
    </div>
  )
}

export default MainBody
