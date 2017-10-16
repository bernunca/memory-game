import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import "materialize-css/dist/css/materialize.min.css";
import './App.css';
import Card from "./Card.js";

let separator = ":";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: props.cards,
      lastCard: null,
      wait: false,
      score: 0,
      errors: 0,
      maximumScore: Object.keys(props.cards).length / 2, // Pegando o número de cartas
      hasWon: false
    };
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
          this.updateScoreCount();
          this.checkVictory();
          this.removeCards(index);
          this.clearLastCard();
        }.bind(this),
        400
      );

      return;
    }

    setTimeout(
      function() {
        this.updateErrorCount();
        this.hideCards(index);
        this.clearLastCard();
      }.bind(this),
      400
    );
  }

  updateErrorCount() {
    let newErrorsCount = this.state.errors + 1;
    this.setState({errors: newErrorsCount});
  }

  updateScoreCount() {
    let newScoreCount = this.state.score + 1;
    this.setState({score: newScoreCount});
  }

  checkVictory() {
    if (this.state.score === this.state.maximumScore){
      this.setState({hasWon: true});
    }
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
    this.setState({wait: true});
  }

  disableWait() {
    this.setState({wait: false});
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            showMenuIconButton={false}
            title={`Jogo da Memória ${this.props.name} - Pares abertos: ${this.state.score + this.state.errors}`}
          />
        </MuiThemeProvider>

        <div className="section">
          <div className="row">
            <div className="col s12 l12">
              Clique nas cartas para virá-la. Forme todos os pares para vencer.
            </div>
          </div>
          <div className="bmg-row">
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
        </div>

        { this.state.hasWon ?
        <div id="winPopup">
            Você venceu! <br />
            (Recarregue a página para jogar novamente)
        </div>
        :
        ""
        }
      </div>
    );
  }
}

export default App;
