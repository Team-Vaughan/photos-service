import React from 'react';

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img className = 'photo-carousel-body-img' src = {this.props.imageURL} />
      </div>
    );
  }
}