import React, { Component } from "react";
import ListSnipIt from "../ListSnipIt/ListSnipIt";
import "./ShowYourLists.css"


export default class ShowLists extends Component {


  render() {
    return (
      <React.Fragment>
        <h1 className="title">Your Waiting Lists</h1>
        <section className="list-all">
          {this.props.lists.map(list => {
            return <ListSnipIt key={list.id} isUser={true} list={list} {...this.props} />;
          })}
        </section>
      </React.Fragment>
    );
  }
}
