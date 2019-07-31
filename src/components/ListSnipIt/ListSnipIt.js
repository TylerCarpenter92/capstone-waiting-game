import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Spinner from "react-bootstrap/Spinner"
import ListMoviesHandler from "../../modules/databaseManager/ListMovieHandler";
import ListBookHandler from "../../modules/databaseManager/ListBookHandler";
import ListGameHandler from "../../modules/databaseManager/ListGameHandler";
import gameManager from "../../modules/gameManager"
import GameName from "./GameName"
export default class ListSnipIt extends Component {
  state = {
    listGames: [],
    listBooks: [],
    listMovies: [],
    gameHolder: "",
    isLoaded: false

  };


  componentDidMount() {
    let newState = {};
    newState.isLoaded = true
    ListBookHandler.getAll(this.props.list.id)
      .then(listBooks => (newState.listBooks = listBooks))
      .then(() => ListGameHandler.getAll(this.props.list.id))
      .then(listGames => (newState.listGames = listGames))
      .then(() =>ListMoviesHandler.getAll(this.props.list.id))
      .then(listMovies => (newState.listMovies = listMovies))
      .then(() => gameManager.get(this.props.list.gameGUID))
      .then(game => newState.gameHolder = game)
      .then(() => this.setState(newState));
  }



  render() {
    return (
      <div key={this.props.list.id} className="card">
        <div className="card-body">
          <h5>{this.props.list.listName}</h5>
          {
            this.state.isLoaded ?
            <p>{this.state.gameHolder.results.name} </p>
            : <Spinner animation="grow" />
          }


        </div>
      </div>
    );
  }
}

//
