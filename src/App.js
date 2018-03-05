import React, { Component } from 'react';
import './App.css';

import images from './cards.js';
import back from './cardBackground.js';
import getRandomIndexes from './random.js';
import Game  from './components/Game.js';
import ScoreBoard from './components/ScoreBoard.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      score : 0,
      hasWon : false,
      openedCards : 0,
      openedPairs : 0,
      cards : images,
      back : back
    }
    this.handleCardClick = this.handleCardClick.bind(this);
    this.getRandomImages = this.getRandomImages.bind(this);
    this.flipAllCards = this.flipAllCards.bind(this);
    this.flippedHandler = this.flippedHandler.bind(this);
     this.changeComparedCards =  this.changeComparedCards.bind(this);
  }
  componentDidMount(){
    this.setState({
      cards : this.getRandomImages(getRandomIndexes(), this.state.cards)
    });
    console.log(this.state.cards);
    setTimeout(this.flipAllCards, 3000);
  }

  getRandomImages(arr, cards){
    let cardImages = [];
    for (let i = 0 ; i<arr.length; i++){
      let k  = +arr[i]
      cardImages.push({image : cards[k], id : i, isFlipped: true, back : this.state.back[i]});
    }
    return cardImages;
  }

  flippedHandler(arr, id1, id2){ //state для замены при переворачивании карты
      let arr1 = arr.slice();
      if(arr1[id1].isFlipped === false){
        arr1[id1].isFlipped = true;
      }
      else {
        arr1[id1].isFlipped = false;
      }

      if(id2 !== undefined){
      if(arr1[id2].isFlipped === false){
        arr1[id2].isFlipped = true;
      }}
      return arr1;
  };

  allFlippedState(arr){ //state когда все перевернуты
  let  arr1 = arr.slice();
    for ( let i = 0 ; i<arr1.length; i++){
      arr1[i].isFlipped = false;
    }
    return arr1;
  };

  flipAllCards(){
    this.setState({
      cards : this.allFlippedState(this.state.cards)
    })
  }

    handleCardClick(e){
      let a = e.target.id;
      if (this.state.openedCards == 1){
      let x = this.findOpenedCards(this.state.cards);
      let img  = x[0].image;
      if(img == e.target.getAttribute('src')){
        this.setState({
          cards : this.flippedHandler(this.state.cards,a),
          openedCards : 0
        })
      }
      else{
      this.setState({
        cards : this.flippedHandler(this.state.cards,a),
        openedCards : ++this.state.openedCards
      })}}

else {
  this.setState({
    cards : this.flippedHandler(this.state.cards,a),
    openedCards : ++this.state.openedCards
  })
}

  if(this.state.openedCards === 2){
  this.compareCards()};
    console.log(this.state)
}
    findOpenedCards(arr){
      let opened = [];
      for(let i = 0; i<arr.length; i++){
        if (arr[i].isFlipped == true){
          let x  = arr[i];
          opened.push(x);
        }
      }
      return opened
    }

    findOpenedCard(arr){ //index flipped cards
      let opened = [];
      for(let i = 0; i<arr.length; i++){
        if (arr[i].isFlipped == true){
          opened.push(i);
        }
      }
      return opened
    }


    changeComparedCards(arr, a, b){ //убираем отгаданные
      let arr1 = arr.slice();
      for(let i = 0; i<arr1.length; i++){
        if (arr1[i]==a || arr1[i]==b){
arr1[i].isFlipped = false;
          arr[i].image = undefined;
        }
      }
      return arr1;
    }


    compareCards(){
      let opened = this.findOpenedCards(this.state.cards)
      console.log(opened);
        if (opened[0].image == opened[1].image){
       setTimeout(function() {this.setState({
         cards : this.changeComparedCards(this.state.cards, opened[0], opened[1]),
         openedCards : 0,
         openedPairs : ++this.state.openedPairs,
         score : this.state.score + ((9 - this.state.openedPairs)*42)
       }) }.bind(this), 500);

        }
        else {
        this.setState({
          openedCards : 0,
          score : this.state.score - this.state.openedPairs*42
        });
        setTimeout(function() {this.setState({
            cards : this.allFlippedState(this.state.cards)
          }) }.bind(this), 500);

        }


    }




  render() {
    return (
      <div className="App">
      <Game cards={this.state.cards}
            onCardClick={this.handleCardClick}
            />
          <ScoreBoard score = {this.state.score}/>
      </div>
    );
  }
}

export default App;
