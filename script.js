"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0 = document.querySelector(".current-score--0");
const currentScore1 = document.querySelector(".current-score--1");
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");
const player0Score = document.querySelector("#score--0");
const player1Score = document.querySelector("#score--1");

let scores, currentScore, activePlayer, playing;
//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.querySelector(`.current-score--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // if (activePlayer === 1) {
  //   player0.style.backgroundColor = "#cee5d0";
  //   player1.style.backgroundColor = "#94b49f";
  // } else {
  //   player0.style.backgroundColor = "#94b49f";
  //   player1.style.backgroundColor = "#cee5d0";
  // }
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//Rolling dice function
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `../PigGame/img/dice-${dice}.png`;

    //Check for rolled
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`.current-score--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // let totalScore = Number(
    //   document.getElementById(`score--${activePlayer}`).textContent
    // );
    // totalScore += currentScore;
    // document.getElementById(`score--${activePlayer}`).textContent = totalScore;

    //Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player--active");
    }
    //Switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
