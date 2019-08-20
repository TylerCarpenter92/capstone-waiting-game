import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import movieManager from "../../modules/movieManager";
import SearchMovieCard from "./SearchMovieCard";

export default class AddMovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      isLoaded: false,
      movies: {},
      description: "",
      title: "",
      thisMovie: {}
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    if (!this.state.isLoaded) {
      console.log(this.props.movieGenres)
      let themeString = "";
      this.props.gameData.results.themes.forEach(theme => {
        if(theme.name === "Sci-Fi"){
          theme.name = "Science Fiction"
        }
        this.props.movieGenres.genres.forEach(genre => {
          if(genre.name === theme.name){
            themeString += `${genre.id},`
          }
        })
      });
      console.log(themeString)
      movieManager.discoverMoviesByGenre(themeString).then(movies => {
        console.log(movies)
        this.setState(prevState => ({
          movies: movies,
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

  toggleNested(thisMovie, description, title) {
    this.setState({
      thisMovie: thisMovie,
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
          Add Movies
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Movie Suggestions for {this.props.gameData.results.name}</ModalHeader>
          <ModalBody>
            {this.state.isLoaded
              ? this.state.movies.results.map(movieItem => {
                  return (
                    <SearchMovieCard
                      key={movieItem.id}
                      toggleNested={this.toggleNested}
                      movieItem={movieItem}
                      createListMovie={this.props.createListMovie}
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
              <ModalBody>{this.state.description}</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() =>{
                   this.props.createListBook(this.state.thisMovie)
                   this.toggleNested({}, "", "")
                }}>
                  Add Movie to List
                </Button>{" "}
                <Button color="secondary" onClick={() => this.toggleNested({}, "", "")}>
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