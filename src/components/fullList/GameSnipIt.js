import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./FullList.css";

export default class GameSnipIt extends Component {
  render() {
    return (
      <div key={this.props.list.id} className="card">
        <h4>{this.props.gameHolder.results.name}</h4>
        <section className="card-body gameCard">
          {this.props.gameHolder.results.deck}
          <img
            className="img"
            src={this.props.gameHolder.results.image.thumb_url}
            alt=""
          />
        </section>
      </div>
    );
  }
}

// <div key={this.props.list.id} className="card">
// <h4>{this.props.gameHolder.results.name}</h4>
// <section className="card-body gameCard">
//   {this.props.gameHolder.results.deck}
//   <img
//     className="img"
//     src={this.props.gameHolder.results.image.small_url}
//     alt=""
//   />
// </section>
// </div>
