import React, { Component } from "react";
import ListSnipIt from "../ListSnipIt/ListSnipIt";

export default class MainPage extends Component{
  render(){
    console.log(this.props.users)
    return (
      <React.Fragment>
        <h1 className="title">Everyones Waiting Lists</h1>
        <section>
          {this.props.lists.map(list => {
            return <ListSnipIt key={list.id}  list={list} {...this.props} />;
          })}
        </section>
      </React.Fragment>
    )
  }
}