import React, { Component } from 'react';

let defaultImage = "url(https://avatars0.githubusercontent.com/u/24419737)";

class Card extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  render() {

    let image = defaultImage;

    if (this.props.gameState === 2) {
      image = this.props.image;
    }

    if (this.props.gameState === 3) {
      image = "none";
    }

    return (
      <div className="bmg-card" onClick={this.handleClick} style={{backgroundImage: image }}>
        {this.props.gameState === 2 ? <div className="bmg-card-title">{this.props.name}</div>: ''}
      </div>
    );
  }
}

export default Card;
