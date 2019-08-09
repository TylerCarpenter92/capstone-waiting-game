import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FullList.css";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import AddBookModal from "../searchWithGameInfo/AddBookModal";
import AddGameModal from "../searchWithGameInfo/AddGameModal";
import AddMovieModal from "../searchWithGameInfo/AddMovieModal";
import ListHandler from "../../modules/databaseManager/ListHandler";
import ListMovieHandler from "../../modules/databaseManager/ListMovieHandler";
import ListBookHandler from "../../modules/databaseManager/ListBookHandler";
import ListGameHandler from "../../modules/databaseManager/ListGameHandler";
import gameManager from "../../modules/gameManager";
import GameCard from "./GameCard";
import MovieCard from "./MovieCard";
import BookCard from "./BookCard";
import movieManager from "../../modules/movieManager";

export default class FullListEdit extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    let id = this.props.match.params.listId;
    let newState = {};
    if (!this.props.location.list) {
      newState.isLoaded = true;
      ListHandler.get(id)
        .then(list => (newState.list = list))
        .then(() => ListBookHandler.getAll(newState.list.id))
        .then(listBooks => (newState.listBooks = listBooks))
        .then(() => ListGameHandler.getAll(newState.list.id))
        .then(listGames => (newState.listGames = listGames))
        .then(() => ListMovieHandler.getAll(newState.list.id))
        .then(listMovies => (newState.listMovies = listMovies))
        .then(() => gameManager.get(newState.list.gameGUID))
        .then(gameResults => (newState.gameResults = gameResults))
        .then(() => movieManager.getGenres())
        .then(movieGenres => (newState.movieGenres = movieGenres))
        .then(() => {
          console.log(newState);
          this.setState(newState);
        });
    } else {
      newState = this.props.location.listInfo;
      movieManager
        .getGenres()
        .then(movieGenres => (newState.movieGenres = movieGenres))
        .then(() => {
          newState.isLoaded = true;
          this.setState(newState);
        });
    }
  }

  deleteBook = id => {
    ListBookHandler.delete(id)
      .then(() => ListBookHandler.getAll(this.state.list.id))
      .then(listBooks => this.setState({ listBooks: listBooks }));
  };

  deleteMovie = id => {
    ListMovieHandler.delete(id)
      .then(() => ListMovieHandler.getAll(this.state.list.id))
      .then(listMovies => this.setState({ listMovies: listMovies }));
  };

  deleteGame = id => {
    ListGameHandler.delete(id)
      .then(() => ListGameHandler.getAll(this.state.list.id))
      .then(listGames => this.setState({ listGames: listGames }));
  };

  createListGame = (game, list) => {
    let newListGame = {
      listId: list.id,
      gameGUID: game.guid,
      title: game.name,
      played: false
    };
    ListGameHandler.post(newListGame);
  };

  createListBook = book => {
    let newListBook = {
      listId: this.state.list.id,
      bookNMB: book.id,
      read: false,
      title: book.volumeInfo.title
    };
    ListBookHandler.post(newListBook).then(() =>
      ListBookHandler.getAll(this.state.list.id).then(listBooks =>
        this.setState({ listBooks: listBooks })
      )
    );
  };

  createListMovie = movie => {
    let newListMovie = {
      listId: this.state.list.id,
      movieNMB: movie.id,
      watched: false,
      title: movie.title
    };
    ListMovieHandler.post(newListMovie).then(() =>
      ListMovieHandler.getAll(this.state.list.id).then(listMovies =>
        this.setState({ listMovies: listMovies })
      )
    );
  };

  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <React.Fragment>
            <div>
              <h1>{this.state.list.listName}</h1>
              <button onClick={() => this.props.deleteList(this.state.list.id)}>
                delete
              </button>
              <GameCard list={this.state.list} game={this.state.list} />
            </div>
            <div className="card">
              <h3>{this.state.list.listName}: Movies</h3>
              <AddMovieModal
                movieGenres={this.state.movieGenres}
                createListMovie={this.createListMovie}
                gameData={this.state.gameResults}
              />
              {this.state.listMovies.map(movie => {
                return (
                  <MovieCard
                    deleteMovie={this.deleteMovie}
                    isEdit={true}
                    key={movie.id}
                    list={this.state.list}
                    movie={movie}
                  />
                );
              })}
            </div>
            <div className="card">
              <h3>{this.state.list.listName}: Books</h3>
              <AddBookModal
                createListBook={this.createListBook}
                gameData={this.state.gameResults}
              />
              {/* <button onClick={() => console.log("click")}>add</button> */}
              {this.state.listBooks.map(book => {
                return (
                  <BookCard
                    deleteBook={this.deleteBook}
                    isEdit={true}
                    key={book.id}
                    isLoaded={this.state.isLoaded}
                    list={this.state.list}
                    book={book}
                  />
                );
              })}
            </div>
            <div className="card">
              <h3>{this.state.list.listName}: Games</h3>
              {/* <button onClick={() => console.log("click")}>add</button> */}
              <AddGameModal gameData={this.state.gameResults} />
              {this.state.listGames.map(game => {
                return (
                  <GameCard
                    deleteGame={this.deleteGame}
                    isEdit={true}
                    key={game.id}
                    list={this.state.list}
                    game={game}
                  />
                );
              })}
            </div>
          </React.Fragment>
        ) : (
          <Spinner animation="grow" />
        )}
      </div>
    );
  }
}
