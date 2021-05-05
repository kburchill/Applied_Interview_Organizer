import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_applications, delete_application, show_applications } from "../../store/applications"
import CreateApplicationForm from "../forms/application-form"

const MyApplications = () => {
  //State
  const applications = useSelector(state => state.applications);

  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [rerender, setRerender] = useState(false);

  const dispatch = useDispatch();

  const openNewApplicationForm = () => {
    if (showNewApplicationForm) return;
    setShowNewApplicationForm(true);
  };


  const handleDelete = async (id) => {
    const rerender = await dispatch(delete_application(id))
    setRerender(rerender)
  }
  useEffect(() => {
    dispatch(get_applications())
  }, [dispatch])

  useEffect(() => {
    if(rerender){
    renderApplications()
    setRerender(false)
    }
  }, [rerender])

  const renderApplications = () => {
    return (
      applications && Object.keys(applications).map(key => {
        return (
          <div>
            <div>{applications[key].company_id}</div>
            <button onClick={()=> handleDelete(key)}>Delete application</button>
          </div>
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
