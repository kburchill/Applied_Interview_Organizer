import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_applications, delete_application, create_application, update_application, selected_application, remove_selected_application } from "../../store/applications"
import { create_interview, get_interviews } from "../../store/interviews";
import CreateApplicationForm, { form_info } from "../forms/application-form"
import './applications.css'

const MyApplications = () => {
  //State
  const applications = useSelector(state => state.applications.applications);
  const interviews = useSelector(state => state.interviews)

  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [showEditApplicationForm, setShowEditApplicationForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState()
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  //State handlers
  const openNewApplicationForm = async () => {
    if (showNewApplicationForm) return;
    if (showEditApplicationForm) setShowEditApplicationForm(false);
    closeApplicationForm();
    await dispatch(remove_selected_application())
    setShowNewApplicationForm(true);
  };

  const openEditApplicationForm = async (application_id) => {
    closeApplicationForm();
    setSelectedApplication(application_id)
    await dispatch(selected_application(application_id))
    setShowEditApplicationForm(true);
  };

  const closeApplicationForm = () => {
    setSelectedApplication(null)
    setShowEditApplicationForm(false);
    setShowNewApplicationForm(false);
    return
  };

  //Handle delete
  const handleDelete = async (id) => {
    const loaded = await dispatch(delete_application(id))
    await dispatch(remove_selected_application())
    setSelectedApplication(null)
    setLoaded(loaded)
  }

  //Use Effects
  useEffect(() => {
    if (applications) return
    dispatch(get_applications())
  }, [dispatch])

  useEffect(() => {
    if (interviews) return
    dispatch(get_interviews())
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      renderApplications()
      setLoaded(false)
    }
  }, [loaded])

  useEffect(() => {
    renderEditForm(selectedApplication)
  }, [selectedApplication])



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
    if (info.response) {
      await dispatch(create_interview(interview_info))
    }
    setLoaded(loaded);
    closeApplicationForm();
  }

  const editApplication = async (e) => {
    e.preventDefault();
    const info = form_info()
    const id = e.target.id
    const application_info = {}
    application_info[id] = info;
    const loaded = await dispatch(update_application(application_info))
    setLoaded(loaded)
    closeApplicationForm();
  }


  const renderEditForm = (key) => {
    return (
      <>
        <form id={key} className="edit_application_form" onSubmit={editApplication}>
          <div id="close-button" onClick={() => closeApplicationForm()}>X</div>
          {showEditApplicationForm && <CreateApplicationForm />}
          <button type="submit">Update</button>
        </form>
      </>
    )
  }

  const renderApplications = () => {
    return (
      applications && Object.keys(applications).map(key => {
        return (
          <>
            <div id="list">
              <div className="each-holder">
                <div className="lines"></div>
                <div className="each-application" id="li" onClick={() => openEditApplicationForm(key)}>
                  <div>{applications[key].company_id}</div>
                </div>
                  <button onClick={() => handleDelete(key)}>X</button>
              </div>
            </div>
          </>
        )
      })
    )
  }

  return (
    <>
      <div className="applications-block" id="applications-block">
        <h4>Applications</h4>
        {renderApplications()}
        <button onClick={openNewApplicationForm}>Record New Application</button>
      </div>
      <div id="applications-form">
        <form className="create_application_form" onSubmit={submitApplication}>
          {showNewApplicationForm && <div onClick={() => setShowNewApplicationForm(false)}>X</div>}
          {showNewApplicationForm && <CreateApplicationForm />}
          {showNewApplicationForm && <button type="submit">I Applied!</button>}
          {selectedApplication && renderEditForm(selectedApplication)}
        </form>
      </div>
    </>
  )
}


export default MyApplications
