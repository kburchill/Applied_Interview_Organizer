import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import "./navbar.css"


const NavBar = () => {
  return (
    <nav className="navbar-block">
        <div>
          <NavLink to="/dashboard" exact={true} activeClassName="active">
            Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
