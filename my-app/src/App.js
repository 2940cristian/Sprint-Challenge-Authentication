import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import Jokes from "./Components/Jokes/Jokes"


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Signup}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/jokes" component={Jokes}/>

      </Switch>
    );
  }
}

export default App;
