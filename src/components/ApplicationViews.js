import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./welcome/welcome";
import Login from "./welcome/Login.js"
import Register from "./welcome/register"
import UserHandler from "../modules/databaseManager/UserHandler";

export default class ApplicationViews extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    let newState = {};
    UserHandler.getAll()
      .then(users => (newState.users = users))
      .then(() => this.setState(newState));
  }

  addUser = user =>
    UserHandler.post(user)
      .then(() => UserHandler.getAll())
      .then(users =>
        this.setState({
          users: users
        })
      );

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  render() {
    return (
      <React.Fragment>
        <Route
          //dashboard
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
        <Route
          //welcome page
          exact
          path="/welcome"
          render={props => {
            return <Welcome users={this.state.users} {...props} />;
          }}
        />
        <Route
          path="/welcome/login"
          render={props => {
            return <Login users={this.state.users} {...props} />;
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
          path="/welcome/register"
          render={props => {
            return (
              <Register
                users={this.state.users}
                addUser={this.addUser}
                {...props}
              />
            );
          }}
        />
        <Route
          //user page
          path="/my list"
          render={props => {
            return null;
          }}
        />
        <Route
          //single list page
          path="/create list"
          render={props => {
            return null;
          }}
        />
      </React.Fragment>
    );
  }
}
