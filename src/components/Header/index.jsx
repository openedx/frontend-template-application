import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/js/src/collapse';

import Img from '../Img';
import EnterpriseLogo from '../../images/enterprise-logo.png';
import Search from '../Search';
import './Header.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
            <Link className="navbar-brand" to="/">
              <Img src={EnterpriseLogo} alt="Enterprise logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="navbar-nav ml-auto">
                <Search />
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
