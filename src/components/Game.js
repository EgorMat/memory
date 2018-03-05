import React, {Component} from 'react';
import Card from './Card.js'
import getRandomIndexes from '../random.js';

import './game.css';

class Game extends React.Component {
    render()
    {let onCardClick = this.props.onCardClick ;
      return(
        <div className = 'gameBoard'>
       {this.props.cards.map(function(item, index) {
         if(item.image !== undefined){
           if (item.isFlipped == false){
            return(
              <Card
               image={item.back}
               id = {item.id}
               isFlipped = {item.isFlipped}
               onClick={onCardClick}
               key = {index}
               />)
            }
            else {
              return(
              <Card
               image={item.image}
               id = {item.id}
               isFlipped = {item.isFlipped}
               onClick={onCardClick}
               key = {index}
               />)
            }}
            else{
              return (
                <div key = {index} className='empty'>
                </div>


              )


            }

          })}
            </div>)



    }
    }

export default Game;
