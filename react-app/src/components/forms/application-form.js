import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './form.css'

let info = {}

export const form_info = () => {
  return info;
}

const CreateApplicationForm = () => {
  //Variables
  const user = useSelector(state => state.session.user)
  const application = useSelector(state => state.applications.selected)

  const app_sent_date = new Date(application[1].sent_out) || new Date()
  const sent_date_value = app_sent_date.toISOString().substring(0, 10);
  let response_date_value;
  if (application[1].response_date) {
    const app_response_date = new Date(application[1].response_date)
    response_date_value = app_response_date.toISOString().substring(0, 10);
  } else {
    response_date_value = null
  }
  let interview_date_value;
  if (application[1].interview_date) {
    const app_interview_date = new Date(application[1].interview_date)
    interview_date_value = app_interview_date.toISOString().substring(0, 10);
  } else {
    interview_date_value = null
  }
  //States
  const [company_id, setCompany_id] = useState(1);
  const [sent_out, setSent_date] = useState(sent_date_value)
  const [response, setResponse] = useState(application[1].response);
  const [response_date, setResponse_date] = useState(response_date_value);
  const [interview, setInterview] = useState(application[1].interview);
  const [interview_date, setInterview_date] = useState(interview_date_value);
  const [interview_contact, setInterview_contact] = useState(application[1].contact_name);
  const [interview_type, setInterview_type] = useState(application[1].interview_type);
  const [showResponse, setShowResponse] = useState(false);
  const [showInterview, setShowInterview] = useState(false);

  const userId = user.id;

  info = {
    user_id: userId,
    sent_out: sent_out,
    company_id: company_id,
    response: response,
    response_date: response_date,
    interview: interview,
    interview_date: interview_date,
    interview_contact: interview_contact,
    interview_type: interview_type
  }

  useEffect(() => {
    setShowResponse(response)
    setShowInterview(interview);
  }, [response, interview])

  return (
    <div className="form-body">
      <div id="application-x-form">X</div>
      <label>Where did you apply?</label>
      <select onChange={(e) => setCompany_id(e.target.value)}>
        <option selected value="1">Apple</option>
        <option value="2">Facebook</option>
        <option value="3">Amazon</option>
      </select>
      <label>When did you send your application?</label>
      <input
        name="date"
        type="date"
        className="form-input"
        value={response_date}
        onChange={(e) => setSent_date(e.target.value)}
      />
      <label>Have you heard back?</label>
      <select value={`${response}`} onChange={(e) => setResponse(e.target.value)}>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <label className={`view-${showResponse}`}>Awesome! When did you hear back?</label>
      <input
        hidden={!response}
        name="date"
        type="date"
        className={`form-input view-${showResponse}`}
        value={response_date}
        onChange={(e) => setResponse_date(e.target.value)}
      />
      <label className={`view-${showResponse}`}>Do you have an interview date?</label>
      <select value={`${interview}`} className={`view-${showResponse}`} onChange={(e) => setInterview(e.target.value)}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <label className={`view-${showInterview}`}>Woohoo! When is your interview?</label>
      <input
        name="date"
        type="date"
        className={`form-input view-${showInterview}`}
        value={interview_date}
        onChange={(e) => setInterview_date(e.target.value)}
      />
      <label className={`view-${showInterview}`} hidden={!interview}>Who are you in contact with for your interview?
      </label>
      <input
        name="contact-name"
        value={interview_contact}
        onChange={(e) => setInterview_contact(e.target.value)}
        className={`form-input view-${showInterview}`}
      />
      <label className={`view-${showInterview}`} hidden={!interview}>Who type of interview is this?</label>
      <input
        hidden={!interview}
        name="contact-name"
        value={interview_type}
        onChange={(e) => setInterview_type(e.target.value)}
        className={`form-input view-${showInterview}`}
      />
    </div>
  );
};

export default CreateApplicationForm;
