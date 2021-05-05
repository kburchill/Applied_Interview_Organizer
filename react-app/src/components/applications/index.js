import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_applications, delete_application, create_application } from "../../store/applications"
import CreateApplicationForm, { form_info } from "../forms/application-form"

const MyApplications = () => {
  //State
  const applications = useSelector(state => state.applications);

  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const openNewApplicationForm = () => {
    if (showNewApplicationForm) return;
    setShowNewApplicationForm(true);
  };

  const handleDelete = async (id) => {
    const loaded = await dispatch(delete_application(id))
    setLoaded(loaded)
  }
  useEffect(() => {
    dispatch(get_applications())
  }, [dispatch])

  useEffect(() => {
    if(loaded){
    renderApplications()
    setLoaded(false)
    }
  }, [loaded])

  const submitApplication = async (e) => {
    e.preventDefault();
    //call fetch function
    const info = form_info()
    const loaded = await dispatch(create_application(info))
    setLoaded(loaded)
  }

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
      <form onSubmit={submitApplication}>
      {showNewApplicationForm && <CreateApplicationForm />}
      <button type="submit">I Applied!</button>
      </form>
    </>
  )
}


export default MyApplications
