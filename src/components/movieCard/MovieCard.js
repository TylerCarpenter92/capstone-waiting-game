import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./MovieCard.css";
import movieManager from "../../modules/movieManager";

export default class MovieCard extends Component {
  state = {
    isLoaded: false,
    help: ""
  };


  // componentDidMount() {
  //   let newState = {};
  //   newState.isLoaded = true;
  //   movieManager
  //     .getMovie(this.props.movie.movieNMB)
  //     .then(movie => (newState.movieDetails = movie))
  //     .then(() => {
  //       this.setState(newState);
  //     });
  // }

  // componentWillUnmount(){
  //   console.log("MoviekCard Unmounted")
  // }

  generateImage = () => {
    let sauce =
      "https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path;
    return sauce;
  };


  render() {
    return (
      <div key={this.props.movie.id} className="card">
        <h4>{this.props.movie.title}</h4>
          <section className="card-body gameCard">
            {this.props.movie.overview}
            <img className="img" src={this.generateImage()} alt="" />
          </section>
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
