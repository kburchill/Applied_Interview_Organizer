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
  const companies = useSelector(state => state.companies)

  let app_sent_value;
  let app_respone_value = false;
  let response_date_value;
  let interview_response_value = false;
  let interview_date_value;
  let interview_contact_value = null;
  let interview_type_value = null;
  let app_company_name = "Results"
  let app_company_id = 1;
  if (application) {
    app_respone_value = application[1].response;
    app_company_name = companies[application[1].company_id].name;
    app_company_id = application[1].company_id;
    interview_response_value = application[1].interview;
    interview_contact_value = application[1].contact_name;
    interview_type_value = application[1].interview_type;
    if (application[1].sent_out) {
      const app_sent_date = new Date(application[1].sent_out) || new Date()
      app_sent_value = app_sent_date.toISOString().substring(0, 10);
    } else {
      app_sent_value = null;
    }

    if (application[1].response_date) {
      const app_response_date = new Date(application[1].response_date)
      response_date_value = app_response_date.toISOString().substring(0, 10);
    } else {
      response_date_value = null
    }

    if (application[1].interview_date) {
      const app_interview_date = new Date(application[1].interview_date)
      interview_date_value = app_interview_date.toISOString().substring(0, 10);
    } else {
      interview_date_value = null
    }
  }
  //States
  const [company_id, setCompany_id] = useState(app_company_id);
  const [company_name, setCompany_name] = useState(app_company_name);
  const [sent_out, setSent_date] = useState(app_sent_value)
  const [response, setResponse] = useState(app_respone_value);
  const [response_date, setResponse_date] = useState(response_date_value);
  const [interview, setInterview] = useState(interview_response_value);
  const [interview_date, setInterview_date] = useState(interview_date_value);
  const [interview_contact, setInterview_contact] = useState(interview_contact_value);
  const [interview_type, setInterview_type] = useState(interview_type_value);
  const [showResponse, setShowResponse] = useState(false);
  const [showInterview, setShowInterview] = useState(false);
  const [search, setSearch] = useState("Search")

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

  const search_companies = (input) => {
      setCompany_id(input)
      const return_array = []
      for (const company in companies){
          const company_name = companies[company].name
          if (company_name.includes(input)){
            return_array.push([company, companies[company].name])
          }
      }
      if (return_array.length >= 1){
        setCompany_name(return_array[0][1])
        setCompany_id(return_array[0][0])
      } else {
        setCompany_name("No results")
      }
  }


  return (
    <>
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
      <label>When did you send your application?</label>
      <input
        name="date"
        type="date"
        className="form-input"
        value={sent_out}
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
        <option value="false">No</option>
        <option value="true">Yes</option>
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
    </>
  );
};

export default CreateApplicationForm;
