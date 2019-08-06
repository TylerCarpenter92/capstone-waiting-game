import React, { Component } from "react";
import ListSnipIt from "../ListSnipIt/ListSnipIt";

export default class MainPage extends Component{
  render(){
    return (
      <React.Fragment>
        <h1 className="title">Everyones Waiting Lists</h1>
        <section>
          {this.props.lists.map(list => {
            let isUser = false
            if(list.userId === +sessionStorage.getItem("userId")){
              isUser =true
            }
            return <ListSnipIt key={list.id} isUser={isUser} list={list} {...this.props} />;
          })}
        </section>
      </React.Fragment>
    )
  }
}