import React from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';
import { AUTH_TOKEN } from '../constants';

const Header = () => {

    const history = useHistory();
    const context = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    let token = localStorage.getItem(AUTH_TOKEN);
    return (
      <>
        <header>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
              <div className="navbar-nav">
                <li
                  className="nav-item active mr-5 cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/home")}
                >
                  {token ? user.username : "Home"}
                </li>
                <li
                  className={token ? "d-none" : "nav-item active d-block"}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/")}
                >
                  Login
                </li>
              </div>
              <div className="navbar-nav ml-auto">
                <li
                  className="nav-item active"
                  style={{ cursor: "pointer" }}
                  onClick={() => {history.push("/"); context.logout()}}
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