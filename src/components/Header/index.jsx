import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Img from '../Img';
import EnterpriseLogo from '../../images/enterprise-logo.png';
import './Header.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <header>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <Img src={EnterpriseLogo} alt="Enterprise logo" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
