import React, { useState } from 'react';
import { useSelector } from 'react-redux';

let info = {}

export const form_info = () => {
  return info;
}

const CreateInterviewForm = () => {
  //Stores
  const user = useSelector(state => state.session.user)

  //States
  const [company_id, setCompany_id] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [date, setDate] = useState();
  const [contact_name, setContact_name] = useState("");
  const [interview_type, setInterview_type] = useState("");

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
    <div>
      <label>Let's get your interview on the Calendar!</label>
      <input
        name="date"
        type="date"
        className="form-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>Where are you interviewing??</label>
        <select onChange={(e) => setCompany_id(e.target.value)}>
          <option selected value="1">Apple</option>
          <option value="2">Facebook</option>
          <option value="3">Amazon</option>
        </select>
      <label>Who are you in contact with for your interview?</label>
      <textarea
        name="contact-name"
        value={contact_name}
        onChange={(e) => setContact_name(e.target.value)}
        className="form-input"
      />
      <label>What type of interview is this?</label>
      <textarea
        name="interview-type"
        value={interview_type}
        onChange={(e) => setInterview_type(e.target.value)}
        className="form-input"
      />
      <label>Interview completed</label>
      <select onChange={(e) => setCompleted(e.target.value)}>
          <option value="true">Yes</option>
          <option selected value="false">No</option>
        </select>
    </div>

  );
};

export default CreateInterviewForm;
