/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import PopUp from "./components/PopUp";

const cardImages = [
  { src: "/img/christmas.jpg", matched: false },
  { src: "/img/park-day.jpg", matched: false },
  { src: "/img/eu.jpg", matched: false },
  { src: "/img/park-night-walk.jpg", matched: false },
  { src: "/img/spa.jpg", matched: false },
  { src: "/img/sky.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
    setIsGameWon(false);
    setGameStarted(true);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevState) => {
          return prevState.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (gameStarted) {
      const allCardsMatched = cards.every((card) => card.matched);
      if (allCardsMatched && cards.length > 0) {
        setIsGameWon(true);
        setPopupVisible(true);
        console.log(allCardsMatched);
        console.log("gameWon:" + isGameWon);
        console.log("isVisible:" + isPopupVisible);
      }
    }
  }, [cards, gameStarted]);

  // useEffect(() => {
  //   setCards((prevState) => {
  //     return prevState.every((card) => {
  //       if (card.matched) {
  //         setIsGameWon(true);
  //         setPopupVisible(true);
  //       }
  //     });
  //   });
  // }, []);

  return (
    <div className="App">
      <h1>Teodor's Magic</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="popup">
        {isPopupVisible ? <PopUp onClose={() => setPopupVisible(false)} /> : ""}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
