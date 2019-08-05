import React, { Component } from "react";
import "./FullList.css";
import bookManager from "../../modules/movieManager";

export default class MovieCard extends Component {
  state = {
    isLoaded: false,
    help: ""
  };



  componentDidUpdate() {
    console.log("update")
    let newState = {};
    newState.isLoaded = true;
    bookManager.getBook(this.props.book.bookNMB)
      .then(book => (newState.bookDetails = book))
      .then(() => {
        console.log(newState);
        this.setState(newState);
      });
  }

  componentWillUnmount(){
    console.log("bookCard Unmounted")
  }



  render() {
    return (
      <div key={this.props.book.id} className="card">
        <h4>{this.props.book.volumeInfo.title}</h4>
          <section className="card-body gameCard">
            <td dangerouslySetInnerHTML={{__html: this.props.book.volumeInfo.description}} />
            {/* {this.props.book.volumeInfo.description} */}
            <img className="img" src={this.props.book.volumeInfo.imageLinks.small} />
          </section>
      </div>
    );
  }
}

{/* <img className="img" src={this.props.book.volumeInfo.imageLinks.small} /> */}