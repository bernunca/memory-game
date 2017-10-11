import shuffle from "shuffle-array";

export default (cards) => {
  // TODO: gerar quantidade menor de cartas do que existe na base
  var _cards = [];

  for (let i in cards) {
    let preLoadedImage = new Image();
    preLoadedImage.src = cards[i].image;
    _cards.push({ set: "a", index: i, data: cards[i], gameState: 1, preLoadedImage });
    _cards.push({ set: "b", index: i, data: cards[i], gameState: 1, preLoadedImage });
  }

  return shuffle(_cards);
};