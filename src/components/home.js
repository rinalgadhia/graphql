import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    // console.log(data);
    return (
      <>
        <div>
          <h1>Welcome!</h1>
        </div>
      </>
    );
}

const FETCH_POSTS_QUERY = gql`
  { 
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
 
export default Home;