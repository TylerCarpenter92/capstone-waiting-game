import React, { Component } from "react";
import "./FullList.css";

export default class GameCard extends Component {
  render() {
    return (
      <div key={this.props.game.results.id} className="card">
        <h4>{this.props.game.results.name}</h4>
        <section className="card-body gameCard">
          {this.props.game.results.deck}
          {/* <td className="card"
            dangerouslySetInnerHTML={{
              __html: this.props.game.results.description
            }}
          /> */}
          <img
            className="img"
            src={this.props.game.results.image.small_url}
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
