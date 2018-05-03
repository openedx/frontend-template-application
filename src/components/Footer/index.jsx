import React from 'react';
import { Link } from 'react-router-dom';

import Img from '../Img';
import EdxLogo from '../../images/edx-logo.png';
import EnterpriseLogo from '../../images/enterprise-logo.png';
import './Footer.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <footer className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-xs-12 col-md-4 logo-links">
            <Link className="logo" to="/">
              <Img src={EdxLogo} alt="edX logo" />
            </Link>
            <Link className="logo" to="/">
              <Img src={EnterpriseLogo} alt="Enterprise logo" />
            </Link>
          </div>
          <div className="col-xs-12 col-md footer-links">
            <nav>
              <ul className="nav justify-content-end">
                <li className="nav-item"><Link className="nav-link" to="/terms-of-service">Terms of Service</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/privacy-policy">Privacy Policy</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/faq">FAQ &amp; Support</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    );
  }
}

export default Header;
