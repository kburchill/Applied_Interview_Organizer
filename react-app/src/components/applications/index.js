import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_applications } from "../../store/applications"
import CreateApplicationForm from "../forms/application-form"

const MyApplications = () => {
  //State
  const applications = useSelector(state => state.applications);

  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);

  const dispatch = useDispatch();


  const openNewApplicationForm = () => {
    if (showNewApplicationForm) return;
    setShowNewApplicationForm(true);
  };

  useEffect(() => {
    dispatch(get_applications())
  }, [dispatch])

  const renderApplications = () => {
    return (
      applications && Object.values(applications).map(application => {
        return (
          <div>{application}</div>
        )
      })
    )
  }

  return (
    <>
      <div>applications will be here</div>
      <div>{renderApplications()}</div>
      <div>Application NOT DB</div>
      <div>Application NOT DB</div>
      <button onClick={openNewApplicationForm}>Record New Application</button>
      {showNewApplicationForm && <CreateApplicationForm />}
    </>
  )
}


export default MyApplications
