import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();

    return (
      <>
        <header>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
              <div className="navbar-nav">
                <li
                  className="nav-item active mr-5"
                  onClick={() => history.push("/")}
                >
                  Home
                </li>
                <li
                  className="nav-item active"
                  onClick={() => history.push("/login")}
                >
                  Login
                </li>
                </div>
                <div className="navbar-nav ml-auto">
                <li
                  className="nav-item active"
                  onClick={() => history.push("/home")}
                >
                  Logout
                </li>
              </div>
            </nav>
          </div>
        </header>
      </>
    );
}
 
export default Header;