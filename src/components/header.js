import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';
import { AUTH_TOKEN } from '../constants';

const Header = () => {

  const initialState = {
    login: true,
    home: false
  }

    const [state, setState] = useState(initialState)
    const history = useHistory();
    const context = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    let token = localStorage.getItem(AUTH_TOKEN);
    return (
      <>
        <header>
          <div className="container" style={{height: "70px"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
              <div className="navbar-nav">
                <li
                  className={token ? "nav-item active mr-5 cursor-pointer" : "nav-item mr-5 cursor-pointer"}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/home")}
                >
                  {token ? user.username : "Home"}
                  {/* Home */}
                </li>
                <li
                  className={token ? "d-none" : state.login ? "nav-item active d-block" : "nave-item d-block"}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/")}
                >
                  Login
                </li>
              </div>
              <div className="navbar-nav ml-auto">
                <li
                  className={token ? "d-block nav-item" : "d-none nav-item"}
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