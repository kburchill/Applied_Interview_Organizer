import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_interviews } from "../../store/interviews"

const MyInterviews = () => {
  const interviews = useSelector(state => state.interviews);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(get_interviews())
  }, [dispatch])

  const renderInterviews = () => {
    return (
      interviews && Object.values(interviews).map(interview => {
        return (
          <div>{interview}</div>
        )
      })
    )
  }

  return (
    <>
      <div>interviews will be here</div>
      <div>{renderInterviews()}</div>
      <div>Interview NOT DB</div>
      <div>Interview NOT DB</div>
    </>
  )
}


export default MyInterviews
