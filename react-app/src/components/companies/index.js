import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_company, delete_company } from "../../store/companies"
import CreateCompanyForm, { form_info } from "../forms/company-form"
import './companies.css'



const MyCompanies = () => {
  const companies = useSelector(state => state.companies);
  const applications = useSelector(state => state.applications.applications);
  const user = useSelector(state => state.session.user);

  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  // const [showCompanyInfo, setShowCompanyInfo] = useState(false);
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
    // setShowCompanyInfo(true);
  }

  const closeCompanyInfo = () => {
    setShowNewCompanyForm(false);
    // setShowCompanyInfo(false);
    setSelectedCompany(false);
    return
  }

  //handle delete
  const handleDelete = async (id) => {
    const loaded = await dispatch(delete_company(id))
    setSelectedCompany(null)
    setLoaded(loaded)
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
        <form className="form-body" onSubmit={submitCompany} autocomplete="off">
          <div className="close-button" onClick={() => setShowNewCompanyForm(false)}>X</div>
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
        <div className="form-body company-form" >
            <h1 id="company-info">{company.name}</h1>
            <div>City: {company.city}</div>
            <div>State: {company.state}</div>
            <div>{"Address 1: " && company.address_1}</div>
            <div>{"Address 2: " && company.address_2}</div>
            <div><a href={company.job_openings} target="_blank"> Job Openings</a></div>
        </div>
      </>
    )
  }

  const renderCompanies = () => {
    { appliedCompanies() }
    return (
      companies && Object.keys(companies).map(key => {
        const company = companies[key]
        return (
          <div id="list">
            <div class="each-holder">
              <div class="lines"></div>
              <div className="each-company" id="li" onClick={() => openCompanyInfo(key)}>
                <div className={`applied-${companies_with_applications.includes(Number(key))}`}>{company.name}</div>
                <div className={`applied-${companies_with_applications.includes(Number(key))}`}>{company.state}</div>
              </div>
              <button id="delete_company" hidden={!user.admin} onClick={()=> handleDelete(key)}>X</button>
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
        <div id="list">
          <div className="each-holder">
            <div className="lines"></div>
            <div id="li" className="each-company new" onClick={() => openNewCompanyForm()}>New Company</div>
          </div>
        </div>
        {renderCompanies()}

      </div>
      <div id="companies-form">
        {showNewCompanyForm && renderNewForm()}
        {selectedCompany && renderCompanyInfo(selectedCompany)}
      </div>
    </>
  )
}



export default MyCompanies
