import React, { Component } from "react";
import ListSnipIt from "../ListSnipIt/ListSnipIt";


export default class ShowLists extends Component {


  render() {
    return (
      <React.Fragment>
        <h1 className="title">Your Waiting Lists</h1>
        <section>
          {this.props.lists.map(list => {
            return <ListSnipIt key={list.id}  list={list} {...this.props} />;
          })}
        </section>
      </React.Fragment>
    );
  }
}
