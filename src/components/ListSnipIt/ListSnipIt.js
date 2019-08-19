import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ListSnipIt.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import ListMoviesHandler from "../../modules/databaseManager/ListMovieHandler";
import ListBookHandler from "../../modules/databaseManager/ListBookHandler";
import ListGameHandler from "../../modules/databaseManager/ListGameHandler";
import gameManager from "../../modules/gameManager";
export default class ListSnipIt extends Component {
  state = {
    listGames: [],
    listBooks: [],
    listMovies: [],
    gameHolder: "",
    isLoaded: false,
    canView: true
  };

  componentDidMount() {
    let newState = {};
    newState.isLoaded = true;
    ListBookHandler.getAll(this.props.list.id)
      .then(listBooks => (newState.listBooks = listBooks))
      .then(() => ListGameHandler.getAll(this.props.list.id))
      .then(listGames => (newState.listGames = listGames))
      .then(() => ListMoviesHandler.getAll(this.props.list.id))
      .then(listMovies => (newState.listMovies = listMovies))
      .then(() => gameManager.get(this.props.list.gameGUID))
      .then(game => (newState.gameHolder = game))
      .then(() => this.setState(newState));
  }
  displayList = listItem => {
    return <li key={listItem.id}>{listItem.title}</li>;
  };

  render() {
    return (
      <div key={this.props.list.id} className="card list-snipit-card">
        <h4 className="card-title">{this.props.list.listName}</h4>
        <div className="card-body listCard">
          {this.state.isLoaded ? (
            <React.Fragment>
              {/* <p>{this.state.gameHolder.results.name} </p> */}

              {/* <div className="container">
                <h5>list of games</h5>
                <ul className="listItem">
                  {this.state.listGames.map(listGame =>
                    this.displayList(listGame)
                  )}
                </ul>
              </div> */}
              <div className="container">
                <h5>list of Books</h5>
                <ul className="listItem">
                  {this.state.listBooks.map(listBook =>
                    this.displayList(listBook)
                  )}
                </ul>
              </div>
              <div className="container">
                <h5>list of Movies</h5>
                <ul className="listItem">
                  {this.state.listMovies.map(listMovie =>
                    this.displayList(listMovie)
                  )}
                </ul>
              </div>
              <img
                className="img"
                src={this.state.gameHolder.results.image.small_url}
                alt=""
              />
            </React.Fragment>
          ) : (
            <Spinner animation="grow" size="sm" />
          )}


        </div>
        {this.props.isUser ? (
            <Link
              className="linkTag"
              to={{
                pathname: `/list/${this.props.list.id}/edit`,
                list: this.props.list,
                listInfo: {
                  list: this.props.list,
                  listGames: this.state.listGames,
                  listBooks: this.state.listBooks,
                  listMovies: this.state.listMovies,
                  gameResults: this.state.gameHolder
                }
              }}
            >
              View Your List
            </Link>
          ) : (
            <Link
            className="linkTag"
            to={{
              pathname: `/list/${this.props.list.id}`,
              list: this.props.list,
              listInfo: {
                list: this.props.list,
                listGames: this.state.listGames,
                listBooks: this.state.listBooks,
                listMovies: this.state.listMovies,
                gameHolder: this.state.gameHolder
              }
            }}
          >
            View List
          </Link>
          )}
      </div>
    );
  }
}

//
