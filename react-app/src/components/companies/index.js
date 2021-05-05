import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_companies, create_company } from "../../store/companies"
import CreateCompanyForm, { form_info } from "../forms/company-form"

const MyCompanies = () => {
  const companies = useSelector(state => state.companies);

  const [showNewCompanyForm, setShowNewCompanyForm] = useState(false);
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
    if (loaded) {
      renderCompanies()
      setLoaded(false)
    }
  }, [loaded])

  const submitCompany = async (e) => {
    e.preventDefault();
    const info = form_info()

    const loaded = await dispatch(create_company(info))
    setLoaded(loaded)
  }

  const renderCompanies = () => {
    return (
      companies && Object.values(companies).map(company => {
        return (
          <div>{company.name}</div>
        )
      })
    )
  }

  return (
    <>
      <div>Companies will be here</div>
      <div>{renderCompanies()}</div>
      <div>
        <button onClick={openNewCompanyForm}>Add Company</button>
        <form className="create_company_form" onSubmit={submitCompany}>
          {showNewCompanyForm && <CreateCompanyForm />}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}


export default MyCompanies
