import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Data from "./data/pt_BR/computer-scientists.json";
import ShuffleCards from "./ShuffleCards";

ReactDOM.render(<App name={Data.name} cards={ShuffleCards(Data.cards)} />, document.getElementById('root'));
registerServiceWorker();
