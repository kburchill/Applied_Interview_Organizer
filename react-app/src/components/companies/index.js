import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_companies, create_company } from "../../store/companies"
import { get_applications } from "../../store/applications"
import CreateCompanyForm, { form_info } from "../forms/company-form"
import './companies.css'



const MyCompanies = () => {
  const companies = useSelector(state => state.companies);
  const applications = useSelector(state => state.applications.applications);

  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  const openNewCompanyForm = () => {
    if (showNewCompanyForm) return;
    setShowNewCompanyForm(true);
  };

  useEffect(() => {
    dispatch(get_companies())
  }, [dispatch])

  useEffect(() => {
    if (applications) return
    dispatch(get_applications())
  }, [dispatch])

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


  const renderCompanies = () => {
    {appliedCompanies()}
    return (
      companies && Object.keys(companies).map(key => {
        const company = companies[key]
        return (
          <div class="each-holder">
            <div class="lines"></div>
            <div className="each-company" id="li">
            <div>{company.name}</div><div className={`applied-${companies_with_applications.includes(company.id)}`}>{`applied-${companies_with_applications.includes(Number(key))}`}</div> <div>{companies_with_applications}</div>
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
        <div id="list">{renderCompanies()}</div>
        <button onClick={openNewCompanyForm}>Add Company</button>
      </div>
      <div id="companies-form">
        <form className="create_company_form" onSubmit={submitCompany}>
          {showNewCompanyForm && <div onClick={() => setShowNewCompanyForm(false)}>X</div>}
          <div className="sticky">
            {showNewCompanyForm && <CreateCompanyForm />}
            {showNewCompanyForm && <button type="submit">Submit</button>}
          </div>
        </form>
      </div>
    </>
  )
}



export default MyCompanies
