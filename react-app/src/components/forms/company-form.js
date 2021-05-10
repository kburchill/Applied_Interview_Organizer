import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './form.css'

let info = {}

export const form_info = () => {
  return info;
}

const CreateCompanyForm = () => {
  //Stores
  const user = useSelector(state => state.session.user)

  //States
  const [name, setName] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [address_1, setAddress1] = useState();
  const [address_2, setAddress2] = useState();
  const [job_openings, setJob_openings] = useState();


  info = {
    name: name,
    state: state,
    city: city,
    address_1: address_1,
    address_2: address_2,
    job_openings: job_openings,
  }


  //We can add update in here and use this form

  return (
    <>
        <label>Company Name</label>
        <input
          name="company-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
        <label>City</label>
        <input
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-input"
        />
        <label>State</label>
        <input
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="form-input"
        />
        <label>Address-1</label>
        <input
          name="address-1"
          value={address_1}
          onChange={(e) => setAddress1(e.target.value)}
          className="form-input"
        />
        <label>Address-2</label>
        <input
          name="address-2"
          value={address_2}
          onChange={(e) => setAddress2(e.target.value)}
          className="form-input"
        />
        <label>Job Listings Page</label>
        <input
          name="job-listings"
          value={job_openings}
          onChange={(e) => setJob_openings(e.target.value)}
          className="form-input"
        />
    </>
  );
};

export default CreateCompanyForm;
