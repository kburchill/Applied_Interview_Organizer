import React from "react";
import './introPage.css'

const IntroPage = () => {
  return (
    <div className="intro-page">
      <h1>
        Job searching. Simplified.
      </h1>
      <a href="/sign-up" className="signup-link">
        Need an account? Sign up here!
      </a>
      <a href="/login" className="login-link">
        Have an account? Login here!
      </a>
    </div>
  )
}

export default IntroPage;
