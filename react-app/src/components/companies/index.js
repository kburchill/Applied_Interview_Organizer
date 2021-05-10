import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_company } from "../../store/companies"
import CreateCompanyForm, { form_info } from "../forms/company-form"
import './companies.css'



const MyCompanies = () => {
  const companies = useSelector(state => state.companies);
  const applications = useSelector(state => state.applications.applications);

  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState()
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();


  const openNewCompanyForm = () => {
    if (showNewCompanyForm) return;
    closeCompanyInfo();
    setShowNewCompanyForm(true);
  };

  const openCompanyInfo = (company_id) => {
    closeCompanyInfo();
    setSelectedCompany(company_id)
    setShowCompanyInfo(true);
  }

  const closeCompanyInfo = () => {
    setShowNewCompanyForm(false);
    setShowCompanyInfo(false);
    setSelectedCompany(false);
    return
  }

  useEffect(() => {
    if (loaded) {
      renderCompanies()
      setLoaded(false)
    }
  }, [dispatch, loaded])


  const companies_with_applications = []
  const appliedCompanies = () => {
    for (const application in applications) {
      companies_with_applications.push(applications[application].company_id)
    }
  }

  const submitCompany = async (e) => {
    e.preventDefault();
    const info = form_info()
    const loaded = await dispatch(create_company(info));
    setLoaded(loaded);
    setShowNewCompanyForm(false);
  }

  const renderNewForm = () => {
    return (
      <>
        <form className="form-body" onSubmit={submitCompany}>
          <div className="close-button" onClick={() => setShowNewCompanyForm(false)}></div>
          {showNewCompanyForm && <CreateCompanyForm />}
          <button type="submit">Submit</button>

        </form>
      </>
    )
  }

  const renderCompanyInfo = (key) => {
    const company = companies[key];
    return (
          <>
            <div className="company-info">
            <div>{company.name}</div>
            <div>City: {company.city}</div>
            <div>State: {company.state}</div>
            <div>Address 1: {company.address_1}</div>
            <div>Address 2: {company.address_2}</div>
            <div>Job Listings <a href={company.job_openings}>Job Openings</a></div>
            </div>
          </>
        )
  }

  const renderCompanies = () => {
    {appliedCompanies()}
    return (
      companies && Object.keys(companies).map(key => {
        const company = companies[key]
        return (
          <div id="list" class="each-holder">
            <div class="lines"></div>
            <div className="each-company" id="li" onClick={() => openCompanyInfo(key)}>
            <div className={`applied-${companies_with_applications.includes(Number(key))}`}>{company.name}</div>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <>
      <div className="companies-block" id="companies-block">
        <h4>Companies</h4>
        <button id="add_button" onClick={openNewCompanyForm}>Add Company</button>
        <div id="list">{renderCompanies()}</div>

      </div>
      <div id="companies-form">
          {showNewCompanyForm && renderNewForm()}
          {selectedCompany && renderCompanyInfo(selectedCompany)}
      </div>
    </>
  )
}



export default MyCompanies
