import React, { Component } from "react";
import "./FullList.css";
import Spinner from "react-bootstrap/Spinner"
import movieManager from "../../modules/movieManager";

export default class MovieCard extends Component {
  state = {
    isLoaded: false,
    help: ""
  };

  componentDidMount() {
    let movieState = {};
    movieState.isLoaded = true;
    movieManager
      .getMovie(this.props.movie.movieNMB)
      .then(movieDetails => (movieState.movieDetails = movieDetails))
      .then(() => {
        this.setState(movieState);
      });
  }


  generateImage = () => {
    let sauce =
      "https://image.tmdb.org/t/p/w500" + this.state.movieDetails.poster_path;
    return sauce;
  };


  render() {
    return (
      <div key={this.props.movie.id} className="card">
        {this.state.isLoaded ? (
          <React.Fragment>
            <h4>{this.state.movieDetails.title}</h4>
            <section className="card-body gameCard">
              {this.state.movieDetails.overview}
              <img className="img" src={this.generateImage()} alt="" />
              {this.props.isEdit ? (
              <button onClick={() => this.props.deleteMovie(this.props.movie.id) }>delete</button>
            ) : (null)}
            </section>
          </React.Fragment>
        ) : (
          <Spinner animation="grow" size="sm" />
          // this.getMovieDetails(this.props.movie)
        )}
      </div>
    );
  }
}
// ,
//     {
//       "id": 2,
//       "listId": 1,
//       "movieNMB": "1399",
//       "watched": false,
//       "title": "Game of Thrones"
//     }
