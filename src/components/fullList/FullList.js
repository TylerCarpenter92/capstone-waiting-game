import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FullList.css";
import Spinner from "react-bootstrap/Spinner";
import ListHandler from "../../modules/databaseManager/ListHandler";
import ListMoviesHandler from "../../modules/databaseManager/ListMovieHandler";
import ListBookHandler from "../../modules/databaseManager/ListBookHandler";
import ListGameHandler from "../../modules/databaseManager/ListGameHandler";
import gameManager from "../../modules/gameManager";
import movieManager from "../../modules/movieManager";
import bookManager from "../../modules/bookManager";
import GameCard from "./GameCard";
import MovieCard from "./MovieCard";
import BookCard from "./BookCard";

export default class FullList extends Component {
  state = {
    isLoaded: false
  };

  fetchBooks = list => {
    let bookDetailsArray = [];
    list.forEach(listBook => {
      bookManager.getBook(listBook.bookNMB).then(book => {
        bookDetailsArray.push(book);
      });
    });
    return bookDetailsArray;
  };

  fetchMovies = list => {
    let movieDetailsArray = [];
    list.forEach(listMovie => {
      movieManager.getMovie(listMovie.movieNMB).then(movie => {
        movieDetailsArray.push(movie);
      });
    });
    return movieDetailsArray;
  };

  foo () {
    console.log("here in foo")
  }

  fetchGames = list => {
    let gameDetailsArray = [];
    list.forEach(listGame => {
      gameManager.get(listGame.gameGUID).then(game => {
        gameDetailsArray.push(game);
      });
    });
    setTimeout(this.foo,100)
    return gameDetailsArray;
  };

  componentDidMount() {
    console.log("mounted");
    let id = this.props.match.params.listId;
    let newState = {
      listBookDetails: [],
      listMovieDetails: [],
      listGameDetails: [],
      isLoaded: ""
    };
    if (!this.props.location.list) {
      newState.isLoaded = true;
      ListHandler.get(id)
        .then(list => (newState.list = list))
        .then(() => ListBookHandler.getAll(newState.list.id))
        .then(listBooks => (newState.listBooks = listBooks))
        .then(() => this.fetchBooks(newState.listBooks))
        .then(bookArray => (newState.listBookDetails = bookArray))
        .then(() => ListGameHandler.getAll(newState.list.id))
        .then(listGames => (newState.listGames = listGames))
        .then(() => ListMoviesHandler.getAll(newState.list.id))
        .then(listMovies => (newState.listMovies = listMovies))
        .then(() => this.fetchMovies(newState.listMovies))
        .then(movieArray => (newState.listMovieDetails = movieArray))
        .then(() => this.fetchGames(newState.listGames))
        .then(gameArray => (newState.listGameDetails = gameArray))
        .then(() => gameManager.get(newState.list.gameGUID))
        .then(game => (newState.gameHolder = game))
        .then(() => {
          console.log(Date.now())
          console.log(Date.now());
          this.setState(newState);
        });
    } else {
      newState = this.props.location.listInfo;
      newState.listBookDetails = [];
      newState.listMovieDetails = [];
      newState.listGameDetails = [];
      newState.isLoaded = true;
      newState.listBooks.forEach(listBook => {
        bookManager
          .getBook(listBook.bookNMB)
          .then(book => newState.listBookDetails.push(book));
      });

      newState.listMovies.forEach(listMovie => {
        movieManager
          .getMovie(listMovie.movieNMB)
          .then(movie => newState.listMovieDetails.push(movie));
      });

      newState.listGames.forEach(listGame => {
        gameManager
          .get(listGame.gameGUID)
          .then(game => newState.listGameDetails.push(game));
      });

      console.log(newState);
      this.setState(newState);
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <React.Fragment>
            <div>
              <h1>{this.state.list.listName}</h1>
              <GameCard list={this.state.list} game={this.state.gameHolder} />
            </div>
            <div className="card">
              <h3>{this.state.list.listName}: Movies</h3>
              {this.state.listMovieDetails.map(movie => {
                console.log(movie)
                return (
                  <MovieCard
                    key={movie.id}
                    list={this.state.list}
                    movie={movie}
                  />
                );
              })}
            </div>
            <div className="card">
              <h3>{this.state.list.listName}: Books</h3>
              {this.state.listBookDetails.map(book => {
                return (
                  <BookCard
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
              {this.state.listGameDetails.map(game => {
                return (
                  <GameCard key={game.results.id} list={this.state.list} game={game} />
                )
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