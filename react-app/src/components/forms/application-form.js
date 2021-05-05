import React, { useState } from 'react';
import { useSelector } from 'react-redux';


let info = {}

export const form_info = () => {
  return info;
}

const CreateApplicationForm = () => {
  //Stores
  const user = useSelector(state => state.session.user)

  //States
  const [company_id, setCompany_id] = useState(1);
  const [sent_out, setSent_date] = useState(new Date())
  const [response, setResponse] = useState(false);
  const [response_date, setResponse_date] = useState();
  const [interview, setInterview] = useState(false);
  const [interview_date, setInterview_date] = useState();
  const [interview_contact, setInterview_contact] = useState("");
  const [interview_type, setInterview_type] = useState("");

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


  //We can add update in here and use this form

  return (
      <div>
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
          value={sent_out}
          onChange={(e) => setSent_date(e.target.value)}
        />
        <label>Have you heard back?</label>
        <select onChange={(e) => setResponse(e.target.value)}>
          <option value="true">Yes</option>
          <option selected value="false">No</option>
        </select>
        <label hidden={!response}>Awesome! When did you hear back?</label>
        <input
          hidden={!response}
          name="date"
          type="date"
          className="form-input"
          value={response_date}
          onChange={(e) => setResponse_date(e.target.value)}
        />
        <label hidden={!response}>Do you have an interview date?</label>
        <select hidden={!response} onChange={(e) => setInterview(e.target.value)}>
          <option value="true">Yes</option>
          <option selected value="false">No</option>
        </select>
        <label hidden={!interview}>Woohoo! When is your interview?</label>
        <input hidden={!interview}
          name="date"
          type="date"
          className="form-input"
          value={interview_date}
          onChange={(e) => setInterview_date(e.target.value)}
        />
        <label hidden={!interview}>Who are you in contact with for your interview?
                </label>
        <textarea
          hidden={!interview}
          name="contact-name"
          value={interview_contact}
          onChange={(e) => setInterview_contact(e.target.value)}
          className="form-input"
        />
        <label hidden={!interview}>Who type of interview is this?</label>
        <textarea
          hidden={!interview}
          name="contact-name"
          value={interview_type}
          onChange={(e) => setInterview_type(e.target.value)}
          className="form-input"
        />
      </div>

  );
};

export default CreateApplicationForm;
