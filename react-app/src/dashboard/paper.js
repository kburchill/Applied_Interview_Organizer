import React from 'react';
import './dashboard.css'


const create_paper = () => {
  return (
    <>
    <div className="paper-div">
      <h4>Notes</h4>
      <div class="lines"></div>
      <ul id="list">
        <li>Eat Breakfeast</li>
        <li>Feed Pugsly, the cow</li>
        <li>Sit Down</li>
        <li>Eat lunch</li>
        <li>Call mom</li>
        <li>Tweet about feeding my cow, pugsly</li>
        <li>Join a hangout in google+</li>
        <li>Prepare Dinner</li>
        <li>Eat Dinner</li>
        <li>Get ready for bed</li>
        <li>Go to bed</li>
      </ul>
    </div>
    </>
  )
}

export default create_paper;
