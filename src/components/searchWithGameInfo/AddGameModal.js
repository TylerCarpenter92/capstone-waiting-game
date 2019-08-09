import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Spinner from "react-bootstrap/Spinner";
import gameManager from "../../modules/gameManager";


export default class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      test: "",
      isLoaded: false,
      gameResults: [],
      game: {}
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    if(!this.state.isLoaded){
      let newState = {}
      newState.isLoaded = true
    gameManager
      .getGameById(this.props.gameData.results.similar_games[0].id)
      .then(game => (newState.game = game))
      .then(() => gameManager.grabGames())
      .then(handfullOfGames => (newState.handfullOfGames = handfullOfGames))
      .then(() => {
        newState.modal = !this.state.modal
        console.log(newState)
        this.setState(newState)
      })
    }
    else {
      this.setState(prevState => ({
        isLoaded: false,
        modal: !prevState.modal
      }))
    }
  }

  toggleNested(data) {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
      test: data
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
          Add Games
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            {this.state.isLoaded ? (
              <React.Fragment>
                <div>
                  <section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </section>
                  <Button
                    color="success"
                    onClick={() => this.toggleNested("test1")}
                  >
                    Show Nested Modal
                  </Button>
                </div>
                <div>
                  <section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </section>
                  <Button
                    color="success"
                    onClick={() => this.toggleNested("test2")}
                  >
                    Show Nested Modal
                  </Button>
                </div>
                <div>
                  <section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </section>
                  <Button
                    color="success"
                    onClick={() => this.toggleNested("test2")}
                  >
                    Show Nested Modal
                  </Button>
                </div>
              </React.Fragment>
            ) : (
              <Spinner animation="grow" />
            )}

            <br />

            <Modal
              isOpen={this.state.nestedModal}
              toggle={this.toggleNested}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>Nested Modal title</ModalHeader>
              <ModalBody>{this.state.test}</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => this.toggleNested("")}>
                  Done
                </Button>{" "}
                <Button color="secondary" onClick={this.toggleAll}>
                  All Done
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
