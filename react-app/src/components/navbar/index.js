import React from 'react';
import LogoutButton from '../auth/LogoutButton'
import "./navbar.css"
import { useSelector } from "react-redux";


const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <nav className="navbar-block">
        <a href="/dashboard" className="username">{user.username}</a>
          <LogoutButton />
    </nav>
  );
}

export default NavBar;
