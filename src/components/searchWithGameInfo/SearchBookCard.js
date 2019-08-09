import React, { Component } from "react";
import { Button } from "reactstrap";


export default class SearchBookCard extends Component {
  state = {
    isBookLoaded: false,
    book: {}
  };



  render() {
    return (
      <div key={this.props.bookItem.id} className="card">
        <section className="card-body gameCard">
          <h4>{this.props.bookItem.volumeInfo.title}</h4>
          <img
            className="img"
            src={this.props.bookItem.volumeInfo.imageLinks.thumbnail}
            alt=""
          />
        </section>
        <Button
          color="success"
          onClick={() =>
            this.props.toggleNested(
              this.props.bookItem,
              this.props.bookItem.volumeInfo.description,
              this.props.bookItem.volumeInfo.title
            )
          }
        >
          show Book Description
        </Button>
        <Button color="secondary" onClick={() => this.props.createListBook(this.props.bookItem) } >
          Add Book to List
        </Button>
      </div>
    );
  }
}
