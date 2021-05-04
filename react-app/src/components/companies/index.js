import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_companies } from "../../store/companies"

const MyCompanies = () => {
  const companies = useSelector(state => state.companies);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(get_companies())
  }, [dispatch])

  const renderCompanies = () => {
    return (
      companies && Object.values(companies).map(company => {
        return (
          <div>{company}</div>
        )
      })
    )
  }

  return (
    <>
      <div>Companies will be here</div>
      <div>{renderCompanies()}</div>
      <div>Apple NOT DB</div>
      <div>Facebook NOT DB</div>
      <div>HornPub NOT DB</div>
    </>
  )
}


export default MyCompanies
