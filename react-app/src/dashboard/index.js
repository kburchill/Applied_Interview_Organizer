import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import MyCompanies from "../components/companies"
import MyInterviews from "../components/interviews"
import MyApplications from "../components/applications"
import { get_companies } from "../store/companies"
import { get_applications } from "../store/applications"
import { get_interviews } from "../store/interviews"
import NavBar from "../components/navbar"
import './dashboard.css'
import MyUpcomingInterviews from '../components/interviews/upcoming';


const MainBody = () => {
  const [showCompanies, setShowCompanies] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showInterviews, setShowInterviews] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(get_companies())
    await dispatch(get_applications())
    await dispatch(get_interviews())
    setShowDashboard(true);
  }, [dispatch])

  const setCompanies = () => {
    setShowCompanies(true)
    setShowApplications(false)
    setShowInterviews(false)
    setShowDashboard(false)
  }
  const setApplications = () => {
    setShowCompanies(false)
    setShowApplications(true)
    setShowInterviews(false)
    setShowDashboard(false)
  }
  const setInterviews = () => {
    setShowCompanies(false)
    setShowApplications(false)
    setShowInterviews(true)
    setShowDashboard(false)
  }
  const setDashboard = () => {
    setShowCompanies(false)
    setShowApplications(false)
    setShowInterviews(false)
    setShowDashboard(true)
  }
  return (
    <div className="main__container">
      <div onClick={() => setDashboard()}>
      <NavBar />
      </div>
      <div className="container-labels">
        <div onClick={() => setCompanies()} className="company-label">Companies</div>
        <div onClick={() => setApplications()} className="application-label">Applications</div>
        <div onClick={() => setInterviews()} className="interview-label">Interviews</div>
      </div>
      {showDashboard && <MyUpcomingInterviews />}
      {showCompanies && <MyCompanies />}
      {showApplications && <MyApplications />}
      {showInterviews && <MyInterviews />}
    </div>
  )
}

export default MainBody
