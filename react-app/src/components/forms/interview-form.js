import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './form.css'
let info = {}

export const form_info = () => {
  return info;
}

const CreateInterviewForm = () => {
  //Stores
  const user = useSelector(state => state.session.user)
  const interview = useSelector(state => state.interviews.selected)

  const int_sent_date = new Date(interview[1].date) || new Date()
  const int_date_value = int_sent_date.toISOString().substring(0, 10);

  //States
  const [company_id, setCompany_id] = useState(1);
  const [completed, setCompleted] = useState(interview[1].completed);
  const [date, setDate] = useState(int_date_value);
  const [contact_name, setContact_name] = useState(interview[1].contact_name);
  const [interview_type, setInterview_type] = useState(interview[1].interview_type);

  const userId = user.id;

  info = {
    company_id: company_id,
    user_id: userId,
    date: date,
    contact_name: contact_name,
    completed: completed,
    interview_type: interview_type,
  }

  return (
    <div className="form-body">
      <div>
        <label>Let's get your interview on the Calendar!</label>
        <input
          name="date"
          type="date"
          className="form-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Where are you interviewing??</label>
        <select onChange={(e) => setCompany_id(e.target.value)}>
          <option selected value="1">Apple</option>
          <option value="2">Facebook</option>
          <option value="3">Amazon</option>
        </select>
      </div>
      <div>
        <label>Who are you in contact with for your interview?</label>
        <textarea
          name="contact-name"
          value={contact_name}
          onChange={(e) => setContact_name(e.target.value)}
          className="form-input"
        />
      </div>
      <div>
        <label>What type of interview is this?</label>
        <textarea
          name="interview-type"
          value={interview_type}
          onChange={(e) => setInterview_type(e.target.value)}
          className="form-input"
        />
      </div>
      <div>
        <label>Interview completed</label>
        <select value={completed} onChange={(e) => setCompleted(e.target.value)}>
          <option value="true">Yes</option>
          <option selected value="false">No</option>
        </select>
      </div>
    </div>
  );
};

export default CreateInterviewForm;
