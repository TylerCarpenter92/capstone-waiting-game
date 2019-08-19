import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import bookManager from "../../modules/bookManager";
import SearchBookCard from "./SearchBookCard";

export default class AddBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      isLoaded: false,
      books: {},
      description: "",
      title: "",
      thisBook: {}
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    if (!this.state.isLoaded) {
      let themeString = "";
      this.props.gameData.results.themes.forEach(theme => {
        themeString += `${theme.name} `;
      });
      bookManager.searchBooks(themeString).then(books => {
        this.setState(prevState => ({
          books: books,
          isLoaded: true,
          modal: !prevState.modal
        }));
      });
    } else {
      this.setState(prevState => ({
        isLoaded: true,
        modal: !prevState.modal
      }));
    }
  }

  toggleNested(thisBook, description, title) {
    this.setState({
      thisBook: thisBook,
      description: description,
      title: title,
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Add Books
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Book Suggestions for {this.props.gameData.results.name}
          </ModalHeader>
          <ModalBody>
            {this.state.isLoaded
              ? this.state.books.items.map(bookItem => {
                  return (
                    <SearchBookCard
                      key={bookItem.id}
                      toggleNested={this.toggleNested}
                      bookItem={bookItem}
                      createListBook={this.props.createListBook}
                    />
                  );
                })
              : ""}
            <br />
            <Modal
              isOpen={this.state.nestedModal}
              toggle={this.toggleNested}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>{this.state.title}</ModalHeader>
              <ModalBody>
                <div>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: this.state.description
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.createListBook(this.state.thisBook);
                    this.toggleNested({}, "", "");
                  }}
                >
                  Add Book to List
                </Button>{" "}
                <Button
                  color="secondary"
                  onClick={() => this.toggleNested({}, "", "")}
                >
                  Back
                </Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
