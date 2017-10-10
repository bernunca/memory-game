import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import "./App.css";
import Card from "./Card.js";
import Data from "./data/pt_BR/computer-scientists.json";
import shuffle from "shuffle-array";

let separator = ":";

class App extends Component {
  generateCards() {
    // TODO: gerar quantidade menor de cartas do que existe na base
    var cards = [];

    for (let i in Data.cards) {
      let preLoadedImage = new Image();
      preLoadedImage.src = Data.cards[i].image;
      cards.push({ set: "a", index: i, data: Data.cards[i], gameState: 1, preLoadedImage });
      cards.push({ set: "b", index: i, data: Data.cards[i], gameState: 1, preLoadedImage });
    }

    return shuffle(cards);
  }

  constructor() {
    super();

    this.state = {
      name: Data.name,
      cards: null,
      lastCard: null,
      wait: false
    };
  }

  componentWillMount(){
    this.setState({cards: this.generateCards()})
  }

  handleClick(set, key, index, id) {
    if (this.state.cards[index].gameState > 2 || this.state.wait) {
      return;
    }

    this.seeCard(index);

    if (!this.state.lastCard) {
      this.setLastCard({ key: key, set: set, index: index });

      return;
    }

    let lastCard = this.state.lastCard;

    if (lastCard.set === set && lastCard.key === key) {
      return;
    }

    this.enableWait();
    if (lastCard.set !== set && lastCard.key === key) {
      setTimeout(
        function() {
          this.removeCards(index);
          this.clearLastCard();
        }.bind(this),
        400
      );

      // TODO: Contar acertos
      // TODO: Checar vitória

      return;
    }

    setTimeout(
      function() {
        // TODO: Contar erros
        this.hideCards(index);
        this.clearLastCard();
      }.bind(this),
      400
    );
  }

  setLastCard(newLastCard) {
    let newState = this.state;
    newState.lastCard = newLastCard;
    this.setState(newState);
  }

  clearLastCard() {
    this.setLastCard(null);
    this.disableWait();
  }

  seeCard(i) {
    let newState = this.state;
    let cards = newState.cards;

    cards[i]["gameState"] = 2;

    newState.cards = cards;
    this.setState(newState);
  }

  hideCards(i) {
    let newState = this.state;
    let cards = newState.cards;

    cards[i]["gameState"] = 1;
    cards[newState.lastCard.index]["gameState"] = 1;

    newState.cards = cards;
    this.setState(newState);
  }

  removeCards(i) {
    let newState = this.state;
    let cards = newState.cards;

    cards[i]["gameState"] = 3;
    cards[newState.lastCard.index]["gameState"] = 3;

    newState.cards = cards;
    this.setState(newState);
  }

  enableWait() {
    let newState = this.state;
    newState.wait = true;
    this.setState(newState);
  }

  disableWait() {
    let newState = this.state;
    newState.wait = false;
    this.setState(newState);
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          showMenuIconButton={false}
          title={`Jogo da Memória ${this.state.name}`}
        />
        <div className="row">
          {this.state.cards.map((item, i) => (
            <div>
            <Card
              image={"url(" + item.preLoadedImage.src + ")"}
              key={item.set + separator + item.index}
              id={item.set + separator + item.index}
              name={item.data.name}
              gameState={item.gameState}
              onClick={id => this.handleClick(item.set, item.index, i, id)}
            />
            </div>
          ))}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
