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
  const companies = useSelector(state => state.companies)

  //Variables to set state to originally
  let int_sent_date;
  let int_date_value;
  let int_completed = false;
  let int_contact = null;
  let int_type = null;
  let int_company_name = "Search"
  let int_company_id = 1

  //Set them to these if there is a selected interview
  if (interview) {
    int_company_id = interview[1].company_id;
    int_company_name = companies[interview[1].company_id].name;
    int_completed = interview[1].completed;
    int_sent_date = new Date(interview[1].date)
    int_date_value = int_sent_date.toISOString().substring(0, 10);
    int_contact = interview[1].contact_name
    int_type = interview[1].interview_type
  }

  //States
  const [company_id, setCompany_id] = useState(int_company_id);
  const [company_name, setCompany_name] = useState(int_company_name);
  const [completed, setCompleted] = useState(int_completed);
  const [date, setDate] = useState(int_date_value);
  const [contact_name, setContact_name] = useState(int_contact);
  const [interview_type, setInterview_type] = useState(int_type);

  const userId = user.id;

  info = {
    company_id: company_id,
    user_id: userId,
    date: date,
    contact_name: contact_name,
    completed: completed,
    interview_type: interview_type,
  }

  const search_companies = (input) => {
    setCompany_id(input)

    const return_array = []
    for (const company in companies) {
      const company_name = companies[company].name
      if (company_name.includes(input)) {
        return_array.push([company, companies[company].name])
      }
    }
    if (return_array.length >= 1) {
      setCompany_name(return_array[0][1])
      setCompany_id(return_array[0][0])
    } else {
      setCompany_name("No results")
    }
  }

  return (
    <>
      <label>Let's get your interview on the Calendar!</label>
      <input
        name="date"
        type="date"
        className="form-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>Where did you apply?</label>
      <div className="autocomplete">
        <input onChange={(e) => search_companies(e.target.value)}
          name="company"
          type="text"
          placeholder={company_name}
          className={`form-input`}
        />
        <div>{company_name}</div>
      </div>
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
      <select value={completed} onChange={(e) => setCompleted(e.target.value)}>
        <option value={true}>Yes</option>
        <option selected value={false}>No</option>
      </select>
    </>
  );
};

export default CreateInterviewForm;
