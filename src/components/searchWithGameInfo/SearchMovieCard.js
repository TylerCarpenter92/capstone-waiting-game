import React, { Component } from "react";
import { Button } from "reactstrap";


export default class SearchMovieCard extends Component {
  state = {
    isMovieLoaded: false,
    Movie: {}
  };

  generateImage = () => {
    let sauce =
      "https://image.tmdb.org/t/p/w500" + this.props.movieItem.poster_path;
    return sauce;
  };


  render() {
    return (
      <div key={this.props.movieItem.id} className="card">
        <section className="card-body gameCard">
          <h4>{this.props.movieItem.title}</h4>
          <img
            className="img"
            src={this.generateImage()}
            alt=""
          />
        </section>
        <Button
          color="success"
          onClick={() =>
            this.props.toggleNested(
              this.props.movieItem,
              this.props.movieItem.overview,
              this.props.movieItem.title
            )
          }
        >
          show Movie Description
        </Button>
        <Button color="secondary" onClick={() => this.props.createListMovie(this.props.movieItem) } >
          Add Movie to List
        </Button>
      </div>
    );
  }
}