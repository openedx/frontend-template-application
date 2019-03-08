import React from 'react';
import { Link } from 'react-router-dom';

import EdXLogo from '../../images/edx-logo.png';

const Header = () => (
  <header className="mb-4">
    <div className="container">
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={EdXLogo} alt="edX logo" />
        </Link>
        <ul className="nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/dashboard">My Courses</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
