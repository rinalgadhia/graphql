
import './App.css';
import Login from './components/login';
import "bootstrap/dist/css/bootstrap.css"
import {BrowserRouter as Router, Route} from "react-router-dom"
import { ApolloProvider } from "@apollo/client";
import {client} from "./client"
import Home from './components/home';
import Header from './components/header';
import { AuthProvider } from './auth';


function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <Header />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Login} />
          </Router>
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
