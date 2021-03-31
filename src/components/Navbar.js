import React from 'react';
import LanguageIcon from '@material-ui/icons/Language';

function Navbar(props) {
  return (
    <nav className="nav">
      <div className="left-div">
        <div className="logo">
          <LanguageIcon className="globe-icon" fontSize="small" />
          {'< ConnectUs />'}
        </div>
      </div>
      <div className="search-container">
        <img
          className="search-icon"
          src="https://image.flaticon.com/icons/svg/483/483356.svg"
          alt="search-icon"
        />
        <input placeholder="Search" />

        <div className="search-results">
          <ul>
            <li className="search-results-row">
              <img
                src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                alt="user-dp"
              />
              <span>Arindam</span>
            </li>
            <li className="search-results-row">
              <img
                src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
                alt="user-dp"
              />
              <span>Aryan</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-nav">
        <div className="user">
          <img
            src="https://image.flaticon.com/icons/svg/3135/3135715.svg"
            alt="user-dp"
            id="user-dp"
          />
          <span>Abstract</span>
        </div>
        <div className="nav-links">
          <ul>
            <li>Log in</li>
            <li>Log out</li>
            <li>Register</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
