import React, { Component } from "react";

export default class GameName extends Component{
  render(){
    return (
      <p>{this.props.gameHolder.results.name}</p>
    )
  }
}