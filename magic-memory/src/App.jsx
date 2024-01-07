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

  const [isPopupVisible, setPopupVisible] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
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
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
  
    if (allMatched) {
      setTimeout(() => {
        setPopupVisible(true);
      }, 0); // Delay set to 0 milliseconds
    }
  }, [cards]);
  

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
          />
        ))}
      </div>

      <div className="popup">
      {isPopupVisible && <PopUp onClose={togglePopup} />}
      </div>
      
    </div>
  );
}

export default App;
