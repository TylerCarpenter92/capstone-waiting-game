import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FullList.css";
import Spinner from "react-bootstrap/Spinner";
import ListHandler from "../../modules/databaseManager/ListHandler";
import ListMoviesHandler from "../../modules/databaseManager/ListMovieHandler";
import ListBookHandler from "../../modules/databaseManager/ListBookHandler";
import ListGameHandler from "../../modules/databaseManager/ListGameHandler";
import GameCard from "./GameCard";
import MovieCard from "./MovieCard";
import BookCard from "./BookCard";

export default class FullList extends Component {
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
        .then(() => ListMoviesHandler.getAll(newState.list.id))
        .then(listMovies => (newState.listMovies = listMovies))
        .then(() => {
          this.setState(newState);
        });
    } else {
      newState = this.props.location.listInfo;
      newState.isLoaded = true;
      this.setState(newState);
    }
  }

  pushToEdit(){
    this.props.history.push(`/List/${this.state.list.id}/edit`)
  }



  render() {
    return (
      <div>
        {this.state.isLoaded ? (
          <React.Fragment>
            <div>
              <h1>{this.state.list.listName}</h1>
              {this.state.list.userId === +sessionStorage.getItem("userId") ? (
                <button onClick={()=> this.pushToEdit()}>edit list</button>
              ): (null)}
              <GameCard game={this.state.list} />
            </div>
            <div className="card">
              <h3>{this.state.list.listName}: Movies</h3>
              {this.state.listMovies.map(movie => {
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
              {this.state.listBooks.map(book => {
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
              {this.state.listGames.map(game => {
                return (
                  <GameCard key={game.id} list={this.state.list} game={game} />
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
