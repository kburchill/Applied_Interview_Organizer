import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_interviews, create_interview, update_interview, delete_interview } from "../../store/interviews"
import CreateInterviewForm, { form_info } from "../forms/interview-form"

const MyInterviews = () => {
  const interviews = useSelector(state => state.interviews);

  const [showNewInterviewForm, setShowNewInterviewForm] = useState(false);
  const [showEditInterviewForm, setShowEditInterviewForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const openNewInterviewForm = () => {
    if (showNewInterviewForm) return;
    setShowNewInterviewForm(true);
  };

  const openEditInterviewForm = () => {
    if (showEditInterviewForm) return;
    setShowEditInterviewForm(true);
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
  }

  const editInterview = async (e) => {
    e.preventDefault();

    const info = form_info()
    const id = e.target.id
    const interview_info = {}
    interview_info[id] = info;
    const loaded = await dispatch(update_interview(interview_info))
    setLoaded(loaded)
  }

  const renderInterviews = () => {

    return (
      interviews && Object.keys(interviews).map(key => {
        return (
          <div>
            <div>{interviews[key].company_id}</div>
            <button onClick={() => handleDelete(key)}>Delete Interview</button>
            <div>
              <button onClick={openEditInterviewForm}>Update Interview</button>
              <form id={key} className="edit_Interview_form" onSubmit={editInterview}>
                {showEditInterviewForm && <CreateInterviewForm />}
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
      <div>interviews will be here</div>
      <div>{renderInterviews()}</div>
      <div>Interview NOT DB</div>
      <div>Interview NOT DB</div>

      <div>
        <button onClick={openNewInterviewForm}>Record New Interview</button>
        <form className="create_Interview_form" onSubmit={submitInterview}>
          {showNewInterviewForm && <CreateInterviewForm />}
          <button type="submit">Create Interview!</button>
        </form>
      </div>
    </>
  )
}


export default MyInterviews
