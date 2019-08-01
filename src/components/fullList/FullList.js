import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FullList.css"
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import ListHandler from "../../modules/databaseManager/ListHandler";
import ListMoviesHandler from "../../modules/databaseManager/ListMovieHandler";
import ListBookHandler from "../../modules/databaseManager/ListBookHandler";
import ListGameHandler from "../../modules/databaseManager/ListGameHandler";
import gameManager from "../../modules/gameManager";
import GameSnipIt from "./GameSnipIt"

export default class FullList extends Component {
  state = {
    isLoaded: false
  }

  componentDidMount() {
    let id = this.props.match.params.listId;
    let newState = {};
    if (!this.props.location.list) {
      console.log("fetch")
      newState.isLoaded = true;
      ListHandler.get(id)
      .then(list => newState.list = list)
        .then(() => ListBookHandler.getAll(newState.list.id))
        .then(listBooks => (newState.listBooks = listBooks))
        .then(() => ListGameHandler.getAll(newState.list.id))
        .then(listGames => (newState.listGames = listGames))
        .then(() => ListMoviesHandler.getAll(newState.list.id))
        .then(listMovies => (newState.listMovies = listMovies))
        .then(() => gameManager.get(newState.list.gameGUID))
        .then(game => (newState.gameHolder = game))
        .then(() => this.setState(newState));
    } else {
      newState= this.props.location.listInfo
      newState.isLoaded = true
      this.setState(newState);
    }
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        {this.state.isLoaded ? (
          <div>
            <h1>{this.state.list.listName}</h1>
            <GameSnipIt list={this.state.list} gameHolder={this.state.gameHolder} />
          </div>
      ) :( <Spinner animation="grow" />
    )}
      </React.Fragment>

    );
  }
}
