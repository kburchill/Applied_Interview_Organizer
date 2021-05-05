import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_applications, delete_application, create_application, update_application } from "../../store/applications"
import { create_interview } from "../../store/interviews";
import CreateApplicationForm, { form_info } from "../forms/application-form"

const MyApplications = () => {
  //State
  const applications = useSelector(state => state.applications);

  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [showEditApplicationForm, setShowEditApplicationForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const openNewApplicationForm = () => {
    if (showNewApplicationForm) return;
    setShowNewApplicationForm(true);
  };

  const openEditApplicationForm = () => {
    if (showEditApplicationForm) return;
    setShowEditApplicationForm(true);
  };

  const handleDelete = async (id) => {
    const loaded = await dispatch(delete_application(id))
    setLoaded(loaded)
  }
  useEffect(() => {
    dispatch(get_applications())
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      renderApplications()
      setLoaded(false)
    }
  }, [loaded])

  const submitApplication = async (e) => {
    e.preventDefault();
    const info = form_info()
    const interview_info = {
      company_id: info.company_id,
      user_id: info.user_id,
      date: info.interview_date,
      contact_name: info.interview_contact,
      completed: false,
      interview_type: info.interview_type
    }
    const loaded = await dispatch(create_application(info))
    if(info.response){
      await dispatch(create_interview(interview_info))
    }
    setLoaded(loaded)
  }

  const editApplication = async (e) => {
    e.preventDefault();

    const info = form_info()
    const id = e.target.id
    const application_info = {}
    application_info[id] = info;
    const loaded = await dispatch(update_application(application_info))
    setLoaded(loaded)
  }

  const renderApplications = () => {
    return (
      applications && Object.keys(applications).map(key => {
        return (
          <div>
            <div>{applications[key].company_id}</div>
            <button onClick={() => handleDelete(key)}>Delete application</button>
            <div>
              <button onClick={openEditApplicationForm}>Update Application</button>
              <form id={key} className="edit_application_form" onSubmit={editApplication}>
                {showEditApplicationForm && <CreateApplicationForm />}
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <>
      <div>
        <div>applications will be here</div>
        <div>{renderApplications()}</div>
      </div>
      <div>
        <button onClick={openNewApplicationForm}>Record New Application</button>
        <form className="create_application_form" onSubmit={submitApplication}>
          {showNewApplicationForm && <CreateApplicationForm />}
          <button type="submit">I Applied!</button>
        </form>
      </div>
    </>
  )
}


export default MyApplications
