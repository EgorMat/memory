import React, {Component} from 'react'
import getRandomIndexes from '../random.js'
import './card.css';


class Card extends React.Component{
  render(){
    return (
      <div className = 'card'>
      <img src={this.props.image} onClick={this.props.onClick} id={this.props.id}/>
      </div>
    );
  }
  }
export default Card;
