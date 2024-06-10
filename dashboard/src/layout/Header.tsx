import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <NavLink to="/dashboard/list" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
            List
          </NavLink>
        </a>

        <a className="navbar-brand" href="#">
          <NavLink to="/dashboard/create" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
            Create
          </NavLink>    
        </a>
      </nav>
      
    </header>
  );
}
