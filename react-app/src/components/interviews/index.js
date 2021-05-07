import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_interviews, create_interview, update_interview, delete_interview, selected_interview } from "../../store/interviews"
import { get_applications } from "../../store/applications"
import CreateInterviewForm, { form_info } from "../forms/interview-form"
import './interviews.css'


const MyInterviews = () => {
  const applications = useSelector(state => state.applications.applications);
  const interviews = useSelector(state => state.interviews.interviews);


  const [showNewInterviewForm, setShowNewInterviewForm] = useState(false);
  const [showEditInterviewForm, setShowEditInterviewForm] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState()
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const openNewInterviewForm = () => {
    if (showNewInterviewForm) return;
    if (showEditInterviewForm) setShowEditInterviewForm(false);
    closeInterviewForm();
    setShowNewInterviewForm(true);
  };

  const openEditInterviewForm = async (interview_id) => {
    closeInterviewForm();
    setSelectedInterview(interview_id)
    await dispatch(selected_interview(interview_id))
    setShowEditInterviewForm(true);
  };

  const closeInterviewForm = () => {
    setSelectedInterview(null)
    setShowEditInterviewForm(false);
    setShowNewInterviewForm(false);
  };

  const handleDelete = async (id) => {
    const loaded = await dispatch(delete_interview(id))
    setLoaded(loaded)
  }
  useEffect(() => {
    if (interviews) return
    dispatch(get_interviews())
  }, [dispatch])

  useEffect(() => {
    if (applications) return
    dispatch(get_applications())
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      renderInterviews()
      setLoaded(false)
    }
  }, [loaded])

  useEffect(() => {
    renderEditForm(selectedInterview)
  }, [selectedInterview])

  const submitInterview = async (e) => {
    e.preventDefault();
    const info = form_info()
    const loaded = await dispatch(create_interview(info))
    setLoaded(loaded)
    closeInterviewForm();
  }

  const editInterview = async (e) => {
    e.preventDefault();

    const info = form_info()
    const id = e.target.id
    const interview_info = {}
    interview_info[id] = info;
    const loaded = await dispatch(update_interview(interview_info))
    setLoaded(loaded)
    closeInterviewForm();
  }

  const renderEditForm = (key) => {
    return (
      <>
        <form id={key} className="edit_interview-form" onSubmit={editInterview}>
          <div onClick={() => closeInterviewForm()}>X EDIT I FORM</div>
          {showEditInterviewForm && <CreateInterviewForm />}
          <button type="submit">Update</button>
        </form>
      </>
    )
  }
  const renderInterviews = () => {
    return (
      interviews && Object.keys(interviews).map(key => {
        return (
          <>
            <div id="list">
              <div className="each-holder">
                <div className="lines"></div>
                <div className="each-interview" id="li" onClick={() => openEditInterviewForm(key)}>
                  <div>{interviews[key].company_id} company id</div>
                  <button onClick={() => handleDelete(key)}>X</button>
                </div>
              </div>
            </div>
          </>
        )
      })
    )
  }

  return (
    <>
      <div className="interviews-block" id="interviews-block">
        <h4>Interviews</h4>
        {renderInterviews()}
        <button onClick={openNewInterviewForm}>Record New Interview</button>
      </div>
      <div id="interviews-form">
        <form className="create_interview_form" onSubmit={submitInterview}>
          {showNewInterviewForm && <div onClick={() => setShowNewInterviewForm(false)}>X<div>CREATE INT FORM</div></div>}
          {showNewInterviewForm && <CreateInterviewForm />}
          {showNewInterviewForm && <button type="submit">Create Interview!</button>}
          {selectedInterview && renderEditForm()}
        </form>
      </div>
    </>
  )
}



export default MyInterviews
