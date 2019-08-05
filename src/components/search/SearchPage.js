import React, { Component } from "react";
import gameManager from "../../modules/gameManager";
import Spinner from "react-bootstrap/Spinner";
import SearchGameCard from "./SearchGameCard"

export default class SearchPage extends Component {
  state = {
    search: "",
    pageNMB: 1,
    isSearched: false
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  searchGames = evt => {
    let newState = this.state;
    gameManager
      .searchGame(this.state.search, this.state.pageNMB)
      .then(searchResults => {
        newState.searchResults = searchResults;
        newState.isSearched = true;
        console.log(newState);
        this.setState(newState);
      });
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <h1>Create a new list</h1>
        <h3>please enter the name of the game you are waiting for</h3>
        <fieldset>
          <input
            className="form-control"
            id="search"
            value={this.state.message}
            onChange={this.handleFieldChange}
            placeholder="enter here"
          />
          <button onClick={this.searchGames}>search</button>
        </fieldset>
        <div className="card">
          <h3>Results</h3>
        {this.state.isSearched ? (
          <React.Fragment>
            {this.state.searchResults.results.map(results => {
              return <SearchGameCard key={results.id}  results={results} />
            })}
          </React.Fragment>
        ) : (
          <h5>waiting for search</h5>
        )}
        </div>
      </React.Fragment>
    );
  }
}
