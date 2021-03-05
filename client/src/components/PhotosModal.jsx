import React from 'react';
import Photo from './Photo.jsx';
import FontAwesome from '@fortawesome/fontawesome-free/js/all.js';

export default class PhotosModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      photoCount: 0,
      photoArray: [],
      currentPhoto: '',
      currentPhotoIndex: 0,
      nextVisibility: 'inline',
      previousVisibility: 'none'
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      roomId: props.roomId
    };
  }

  componentDidUpdate() {
    if (this.state.photoCount === 0) {
      this.fetchPhotos();
    }
  }

  fetchPhotos() {
    fetch(`/rooms/${this.state.roomId}/getPhotosByRoomId`)
      .then((response) => response.json())
      .then((photos) => {
        this.setState({
          photoArray: photos,
          photoCount: photos.length,
          currentPhoto: photos[0]
        });
      });
  }

  handleCloseButtonClick(e) {
    e.preventDefault();
    this.props.hideModal();
    this.setState({
      currentPhoto: this.state.photoArray[0],
      currentPhotoIndex: 0,
      nextVisibility: 'inline',
      previousVisibility: 'none'
    });
  }

  handleNextButtonClick(e) {
    e.preventDefault();
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex + 1,
      currentPhoto: this.state.photoArray[this.state.currentPhotoIndex + 1],
      previousVisibility: 'inline',
      nextVisibility: this.state.currentPhotoIndex + 1 === this.state.photoCount - 1 ? 'none' : 'inline'
    });
  }

  handlePreviousButtonClick(e) {
    e.preventDefault();
    this.setState({
      currentPhotoIndex: this.state.currentPhotoIndex - 1,
      currentPhoto: this.state.photoArray[this.state.currentPhotoIndex - 1],
      nextVisibility: 'inline',
      previousVisibility: this.state.currentPhotoIndex - 1 === 0 ? 'none' : 'inline'
    });
  }

  render() {
    return (
      <div className='photos-modal'>
        <div className = 'photo-carousel-header'>
          <div>
            <button className = 'btn-carousel-close' onClick={this.handleCloseButtonClick.bind(this)}><i className="fas fa-times"></i> Close</button>
          </div>
          <div className = 'photo-counter'>
            { this.state.currentPhotoIndex + 1 }&nbsp;/&nbsp;{this.state.photoCount}
          </div>
          <div>
            <i className="far fa-heart"></i>
          </div>
        </div>
        <div className = 'photo-carousel-body'>
          <div>
            <button className = 'btn-carousel' style = {{display: this.state.previousVisibility}} onClick={this.handlePreviousButtonClick.bind(this)}><i className="fas fa-angle-left"></i></button>
          </div>
          <Photo imageURL = {this.state.currentPhoto.storage_url} />
          <div>
            <button className = 'btn-carousel' style = {{display: this.state.nextVisibility}} onClick={this.handleNextButtonClick.bind(this)}><i className="fas fa-angle-right"></i></button>
          </div>
        </div>
      </div>
    );
  }
}