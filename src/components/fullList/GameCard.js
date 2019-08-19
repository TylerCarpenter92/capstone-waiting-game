import React, { Component } from "react";
import "./FullList.css";
import Spinner from "react-bootstrap/Spinner";
import gameManager from "../../modules/gameManager";

export default class GameCard extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    let gameState = {
      isLoaded: true
    };
    gameManager
      .get(this.props.game.gameGUID)
      .then(gameDetails => (gameState.gameDetails = gameDetails))
      .then(() => this.setState(gameState));
  }

  render() {
    return (
      <div key={this.props.game.id} className="card">
        <h4>{this.props.game.title}</h4>
        {this.state.isLoaded ? (
          <React.Fragment>
            <section className="card-body gameCard">
              <div>{this.state.gameDetails.results.deck}</div>

              {/* <td className="card"
            dangerouslySetInnerHTML={{
              __html: this.state.gameDetails.results.description
            }}
          /> */}

              <img
                className="img"
                src={this.state.gameDetails.results.image.small_url}
                alt=""
              />
              {this.props.isEdit ? (
                <button
                  onClick={() => this.props.deleteGame(this.props.game.id)}
                >
                  delete
                </button>
              ) : null}
            </section>
          </React.Fragment>
        ) : (
          <Spinner animation="grow" size="sm" />
        )}
      </div>
    );
  }
}
