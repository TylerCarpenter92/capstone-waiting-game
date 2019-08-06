import React, { Component } from "react";

export default class SearchGameCard extends Component {
  render() {
    return (
      <div key={this.props.results.id} className="card">
        <h4>{this.props.results.name}</h4>
        <section className="card-body gameCard">
          {this.props.results.deck}
          {/* <td className="card"
            dangerouslySetInnerHTML={{
              __html: this.props.results.description
            }}
          /> */}
          <img
            className="img"
            src={this.props.results.image.small_url}
            alt=""
          />
        </section>
        <button onClick={() => this.props.createList(this.props.results)}>Build list with this game</button>
      </div>
    );
  }
}