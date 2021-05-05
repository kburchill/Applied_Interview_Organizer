import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_interviews, create_interview, update_interview, delete_interview } from "../../store/interviews"
import CreateInterviewForm, { form_info } from "../forms/interview-form"
import './interviews.css'


const MyInterviews = () => {
  const interviews = useSelector(state => state.interviews);
  const user = useSelector(state => state.user);


  const [showNewInterviewForm, setShowNewInterviewForm] = useState(false);
  const [showEditInterviewForm, setShowEditInterviewForm] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState()
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const openNewInterviewForm = () => {
    if (showNewInterviewForm) return;
    setShowNewInterviewForm(true);
  };

  const openEditInterviewForm = (interview_id) => {
    if (showEditInterviewForm) return;
    setSelectedInterview(interview_id)
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
    dispatch(get_interviews())
  }, [dispatch])

  useEffect(() => {
    if (loaded) {
      renderInterviews()
      setLoaded(false)
    }
  }, [loaded])

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

  const renderInterviews = () => {

    return (
      interviews && Object.keys(interviews).map(key => {
        return (
          <div>
            <div>{interviews[key].company_id}</div>
            <button onClick={() => handleDelete(key)}>Delete Interview</button>
            <div>
              <button onClick={()=> openEditInterviewForm(key)}>Update Interview</button>
              {(selectedInterview == key) &&
              <form id={key} className="edit_Interview_form" onSubmit={editInterview}>
                <div onClick={() => closeInterviewForm()}>X</div>
                {showEditInterviewForm && <CreateInterviewForm />}
                <button type="submit">Update</button>
              </form>}
            </div>
          </div>
        )
      })
    )
  }

  return (
    <div className="interviews-block" hidden={user}>
      <div>interviews will be here</div>
      <div>{renderInterviews()}</div>
      <div>Interview NOT DB</div>
      <div>Interview NOT DB</div>

      <div>
        <button onClick={openNewInterviewForm}>Record New Interview</button>
        <form className="create_Interview_form" onSubmit={submitInterview}>
          {showNewInterviewForm && <div onClick={()=> setShowNewInterviewForm(false)}>X</div>}
          {showNewInterviewForm && <CreateInterviewForm />}
          {showNewInterviewForm && <button type="submit">Create Interview!</button>}
        </form>
      </div>
    </div>
  )
}


export default MyInterviews
