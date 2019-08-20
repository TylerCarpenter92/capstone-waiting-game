import React, { Component } from "react";
import "./FullList.css";
import bookManager from "../../modules/bookManager";
import Spinner from "react-bootstrap/Spinner";

export default class BookCard extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    let bookState = {
      isLoaded: true
    };
    bookManager
      .getBook(this.props.book.bookNMB)
      .then(bookDetails => (bookState.bookDetails = bookDetails))
      .then(() => this.setState(bookState));
  }

  render() {
    console.log(this.state);
    return (
      <div key={this.props.book.id} className="card">
        <h4>{this.props.book.title}</h4>
        {this.state.isLoaded ? (
          <React.Fragment>
            <section className="card-body gameCard">

                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.bookDetails.volumeInfo.description
                  }}
                />
              

              {/* {this.state.bookDetails.volumeInfo.description} */}
              <img
                className="img"
                src={this.state.bookDetails.volumeInfo.imageLinks.small}
                alt=""
              />
            </section>
              {this.props.isEdit ? (
                <button className="deleteBtn"
                  onClick={() => this.props.deleteBook(this.props.book.id)}
                >
                  delete
                </button>
              ) : null}
          </React.Fragment>
        ) : (
          <Spinner animation="grow" size="sm" />
          // this.getBookDetails(this.props.book)
        )}
      </div>
    );
  }
}
