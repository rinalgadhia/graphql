// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
import React from "react";
import { useContext } from "react";
import { Redirect} from "react-router-dom";
import { AuthContext } from "../auth";
import { AUTH_TOKEN } from "../constants";

const Home = () => {

  // const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    // console.log(props);
    // console.log(props)

  const { user} = useContext(AuthContext)

  // console.log(user.username)
    if(localStorage.getItem(AUTH_TOKEN) === null)
    {
      return (
        <Redirect to="/" />
      )
    }
    
    return (
      <>
        <div>
          <h1>Welcome {user.username} !  </h1>
        </div>
      </>
    )
}

// const FETCH_POSTS_QUERY = gql`
//   { 
//     getPosts {
//       id
//       body
//       createdAt
//       username
//       likeCount
//       likes {
//         username
//       }
//       commentCount
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//     }
//   }
// `;
 
export default Home;