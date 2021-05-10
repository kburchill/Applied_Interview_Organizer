import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import "./navbar.css"


const NavBar = () => {
  return (
    <nav className="navbar-block">
        <div id="dashboard-button">
          {/* <NavLink to="/dashboard" exact={true} activeClassName="active">
            Dashboard
          </NavLink> */}
        </div>
        <div>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
