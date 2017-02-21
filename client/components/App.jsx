import React from 'react';
import $ from 'jquery';
import SearchBar from './SearchBar.jsx';
import GifList from './GifList.jsx';
import GifModal from './GifModal.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      selectedGif: null,
      modalIsOpen: false
    }
    this.handleTermChange = this.handleTermChange.bind(this);
  }
 

  handleTermChange(term) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(json => {
        this.setState({gifs: json.data});
    })
    .catch(error => {
        console.log(error);
    });
  }

  openModal(gif) {
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <SearchBar
          onTermChange={term => this.handleTermChange(term)}
        />
        <GifList 
          gifs={this.state.gifs} 
          onGifSelect={selectedGif => this.openModal(selectedGif) }
        />
        <GifModal 
          modalIsOpen={this.state.modalIsOpen}
          selectedGif={this.state.selectedGif}
          onRequestClose={ () => this.closeModal() } 
          />
      </div>);
  }
}