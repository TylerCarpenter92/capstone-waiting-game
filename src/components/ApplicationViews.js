import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";
import Welcome from "./welcome/welcome";
import Login from "./welcome/Login.js";
import Register from "./welcome/register";
import ShowLists from "./showLists/ShowYourLists";
import FullList from "./fullList/FullList";
import FullListEdit from "./fullList/FullListEdit";
import MainPage from "./mainPage/MainPage";
import SearchPage from "./search/SearchPage";
import UserHandler from "../modules/databaseManager/UserHandler";
import ListHandler from "../modules/databaseManager/ListHandler";


class ApplicationViews extends Component {
  state = {
    users: [],
    lists: []
  };
  componentDidMount() {
    let newState = {};
    UserHandler.getAll()
      .then(users => (newState.users = users))
      .then(ListHandler.getAll)
      .then(lists => (newState.lists = lists))
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

  createList = game => {
    let newList = {
      userId: +sessionStorage.getItem("userId"),
      siteId: game.id,
      gameGUID: game.guid,
      listName: `${game.name} Waiting List`
    };
    ListHandler.post(newList).then(lists => {
      this.setState({ lists: lists });
      this.props.history.push("/myList");
    });
  };

  deleteList = id => {
    ListHandler.delete(id)
    .then(lists =>{
      this.setState({lists: lists})
      this.props.history.push("/myList")
    })
  }


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
              return (
                <MainPage
                  users={this.state.users}
                  lists={this.state.lists}
                  {...props}
                />
              );
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
          path="/myList"
          render={props => {
            if (this.isAuthenticated()) {
              let userList = this.state.lists
                .filter(
                  list => list.userId === +sessionStorage.getItem("userId")
                )
                .sort((curr, next) => curr.id - next.id);
              return <ShowLists lists={userList} {...props} />;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
        <Route
          //user page
          exact path="/List/:listId(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return <FullList {...props} />;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
        <Route
          //user page
          exact path="/List/:listId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
              return <FullListEdit deleteList={this.deleteList} {...props} />;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
        <Route
          //single list page
          path="/createList"
          render={props => {
            if (this.isAuthenticated()) {
              return <SearchPage createList={this.createList} {...props} />;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);

// if (this.isAuthenticated()) {
//   return null;
// } else {
//   return <Redirect to="/welcome" />;
// }
