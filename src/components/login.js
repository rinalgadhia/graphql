import React, { useContext, useState } from "react";
import {AUTH_TOKEN} from "../constants"

import { gql, useMutation } from "@apollo/client"
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../auth";

const SIGNUP_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Login = () => {

    const initialState = {
        login: true,
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
    }

    const history = useHistory();
    const context = useContext(AuthContext);

    const [state, setState] = useState(initialState); 

    const [LoginMutation] = useMutation(LOGIN_MUTATION, {
      update(_, { data: { login: userData } }) 
      {
        context.login(userData)
        history.push({pathname: "/home", state: userData});
      },
    });
    
    const [SignupMutation] = useMutation(SIGNUP_MUTATION, {
      update(_, {data: { register: userData }})
      {
        context.login(userData)
        history.push("/home")
      }
    });
        
        const login = () => {
          state.login
            ? LoginMutation({
                variables: {
                  username: state.username,
                  password: state.password,
                },
              })
            : SignupMutation({
                variables: {
                  username: state.username,
                  email: state.email,
                  password: state.password,
                  confirmPassword: state.confirmPassword,
                },
              });

        }
    
    if(localStorage.getItem(AUTH_TOKEN) !== null) 
    {
      return (
        <Redirect to="/home" />
      )
    }
    return (
      <>
        <div className="main">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    <h1>{state.login ? "Login" : "Sign-up"}</h1>
                  </div>
                </div>
              </div>

              <div className="col-md-12 mt-5">
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    <div className="form-group">
                      <label>UserName</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={state.username}
                        onChange={(e) =>
                          setState({ ...state, username: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={state.login ? "row d-none" : "row d-block"}>
                  <div className="col-md-4 offset-md-4">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={state.email}
                        onChange={(e) =>
                          setState({ ...state, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={state.password}
                        onChange={(e) =>
                          setState({ ...state, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={state.login ? "row d-none" : "row d-block"}>
                  <div className="col-md-4 offset-md-4">
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={state.confirmPassword}
                        onChange={(e) =>
                          setState({
                            ...state,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 offset-md-5">
                    <button className="btn btn-info" onClick={() => login()}>
                      {state.login ? "Login" : "Sign-up"}
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    <span>
                      {state.login
                        ? "Don't have account? "
                        : "Already Have an Account? "}
                    </span>
                    <span
                      style={{ color: "#17a2b8", cursor: "pointer" }}
                      onClick={() =>
                        setState({ ...state, login: !state.login })
                      }
                    >
                      {state.login ? "SIGN UP" : "LOGIN"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default Login;