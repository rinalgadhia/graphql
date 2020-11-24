import React, { useState } from "react";
import {AUTH_TOKEN} from "../constants"
// import {Mutation} from "react-apollo"
// import gql from "graphql-tag";
import { gql, useMutation } from "@apollo/client"
import { useHistory } from "react-router-dom";

 const SIGNUP_MUTATION = gql`
   mutation SignupMutation(
     $email: String!
     $password: String!
     $name: String!
   ) {
     signup(email: $email, password: $password, name: $name) {
       token
     }
   }
 `;

 const LOGIN_MUTATION = gql`
   mutation LoginMutation($email: String!, $password: String!) {
     login(email: $email, password: $password) {
       token
     }
   }
 `;

const Login = () => {

    const initialState = {
        login: true,
        email: "",
        password: "",
        name: "",
    }

    const history = useHistory();

    const [state, setState] = useState(initialState); 

        const [LoginMutation] = useMutation(LOGIN_MUTATION, {onCompleted: (data) => _confirm(data)})
        const [SignupMutation] = useMutation(SIGNUP_MUTATION, {onCompleted: (data) => _confirm(data)})
        // console.log(data)

        const _confirm = async (data) => {
          console.log(data)
          const token = data
          state.login ? LoginMutation({variables: {email: state.email, password: state.password}}) : SignupMutation({variables: {email: state.email, password: state.password, name: state.name}});
          saveUserData(token);
          history.push("/");
        };

        const saveUserData = (token) => {
          localStorage.setItem(AUTH_TOKEN, token)
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
                <div className={state.login ? "row d-none" : "row d-block"}>
                  <div className="col-md-4 offset-md-4">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={state.name}
                        onChange={(e) =>
                          setState({ ...state, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
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
                <div className="row">
                  <div className="col-md-2 offset-md-5">
                      {/* <Mutation
                        mutation={state.login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={ state.email, state.password, state.name }
                        onCompleted={data => _confirm(data)}
                    >
                      {mutation => (
                    <button className="btn btn-info" onClick={mutation}>{state.login ? "Login" : "Sign-up"}</button>

                      )}
                    </Mutation> */}
                    
                    <button className="btn btn-info" onClick={() => _confirm()}>{state.login ? "Login" : "Sign-up"}</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 offset-md-4">
                    <span>{state.login ? "Don't have account? " : "Already Have an Account? "} </span>
                    <span style={{ color: "#17a2b8", cursor: "pointer" }} onClick={() => setState({...state, login: !state.login})}>{state.login ? "SIGN UP" : "LOGIN"}</span>
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