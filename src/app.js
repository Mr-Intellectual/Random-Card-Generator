/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const symbols = ["♣", "♠", "♥", "♦"];
const cardType = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];
let boardPos = document.getElementById("main"),
  cardX = 250,
  cardY = 400,
  cardAdj = 0.0,
  cardCount = 1,
  numOfCard = 0,
  offX = 0,
  offY = 0,
  time = 10;

async function timerr() {
  await countdown();
}

window.onload = function() {
  //write your code her
  cardAdj = cardDimensions();

  start(offX, offY);
};
function cardDimensions() {
  let cWidth = prompt("Please enter your card dimensional width:", "250");
  if (cWidth == null || cWidth == "") {
    return 250;
  } else {
    return cWidth;
  }
}

function start(X, Y) {
  setTimeout(firstCard(X, Y), 1000);
  bindEvents(X, Y);
  countdown();
}

function bindEvents(X, Y) {
  setInterval(timerr, 17700);

  window.addEventListener("click", event => {
    if (event.type === "click") {
      addCard(offX, offY);
      numOfCard++;

      if (numOfCard > 5) {
        resetBoard();
      }
    }
  });
}

function resetBoard() {
  document.getElementById("board").remove();
  let board = document.createElement("div");
  board.className = "d-flex justify-content-center";
  board.id = "board";
  let row = document.createElement("div");
  row.className = "row position-fixed top-50 start-50 translate-middle";
  row.id = "fixed";
  let h1 = document.createElement("h1");
  h1.className = "display-1";
  h1.appendChild(document.createTextNode("Dealing Cards..."));
  let timer = document.createElement("div");
  timer.className = "d-flex fixed-bottom justify-content-center h1 mb-4";
  timer.id = "timer";
  timer.appendChild(document.createTextNode("10"));
  row.appendChild(h1);
  board.appendChild(row);
  document.getElementById("main").appendChild(board);
  numOfCard = 0;

  firstCard();
}

function getRanSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getNumSymbol() {
  return cardType[Math.floor(Math.random() * cardType.length)];
}

function getBoardPosCenter() {
  return {
    x:
      boardPos.offsetLeft +
      // document.getElementById("card").offsetWidth / 2 -
      0,
    y:
      boardPos.offsetTop +
      // document.getElementById("card").offsetHeight / 2 -
      0
  };
}

function drawCard(D) {
  let ranSym = getRanSymbol();
  let cardColor = "";
  let cDimensions = D;

  if (ranSym === "♦") {
    cardColor = "red";
  } else if (ranSym === "♥") {
    cardColor = "red";
  } else {
    cardColor = "black";
  }

  let row = document.createElement("div");
  row.className = "row ";
  let cardBody = document.createElement("div");
  cardBody.className = "col-12 rounded-5 card border border-dark border-4";
  cardBody.style.color = cardColor;
  cardBody.style.width = `${cDimensions}px`;
  cardBody.style.height = `${cDimensions * 1.6}px`;
  cardBody.id = "card";
  let topSuit = document.createElement("div");
  topSuit.className = "align-self-start px-3";
  topSuit.style.fontSize = `${cDimensions * 0.28}px`;
  topSuit.id = "top-suit";
  let cardNum1 = document.createElement("div");
  cardNum1.className =
    "card-body d-flex align-items-center justify-content-center";
  let cardNum2 = document.createElement("h1");
  cardNum2.className = "display-1";
  cardNum2.id = "cardNum";
  cardNum2.style.fontSize = `${cDimensions * 0.4}px`;
  let bottomSuit = document.createElement("div");
  bottomSuit.className = "align-self-end px-3";
  bottomSuit.id = "bottom-suit";
  bottomSuit.style.fontSize = `${cDimensions * 0.28}px`;
  topSuit.appendChild(document.createTextNode(ranSym));
  cardNum2.appendChild(document.createTextNode(getNumSymbol()));
  bottomSuit.appendChild(document.createTextNode(ranSym));

  cardBody.appendChild(topSuit);
  cardNum1.appendChild(cardNum2);
  cardBody.appendChild(cardNum1);
  cardBody.appendChild(bottomSuit);
  row.appendChild(cardBody);
  document.getElementById("board").appendChild(row);

  return cardBody;
}

function firstCard(X, Y) {
  let tl = gsap.timeline(),
    pos = getBoardPosCenter(),
    cardBody = drawCard(cardAdj);

  cardCount++;

  gsap.set(cardBody, {
    y: boardPos.offsetHeight / 2,
    x: boardPos.offsetWidth / 2,
    zIndex: cardCount
  });
  // let offsetX = 1,
  //   offsetY = 1;
  tl.addLabel("start")
    .to(
      cardBody,
      {
        duration: 1.5,
        ease: Power2.easeOut,
        x: pos.x,
        y: pos.y
      },
      "start"
    )
    .to(
      cardBody,
      {
        duration: 1.4,
        ease: Power2.easeOut,
        rotation: 360
      },
      "start"
    );
  offX = pos.x - 50;
  offY = pos.y + document.getElementById("fixed").offsetHeight / 2;
  numOfCard++;
}

function addCard(X, Y) {
  let tl = gsap.timeline(),
    // pos = getBoardPosCenter(),
    cardBody = drawCard(cardAdj);

  cardCount++;

  gsap.set(cardBody, {
    y: boardPos.offsetHeight / 2,
    x: boardPos.offsetWidth / 2,
    zIndex: cardCount
  });
  // let offsetX = 1,
  //   offsetY = 1;
  tl.addLabel("start")
    .to(
      cardBody,
      {
        duration: 1.5,
        ease: Power2.easeOut,
        x: X,
        y: Y
      },
      "start"
    )
    .to(
      cardBody,
      {
        duration: 1.4,
        ease: Power2.easeOut,
        rotation: 360
      },
      "start"
    );
  offX = X - cardX / 5;
  offY = Y + cardY / 10;
}

function countdown(T) {
  if (time > 0) {
    document.getElementById("timer").innerHTML = String(time);
    time--;
    setTimeout(countdown, 1000);
  } else {
    document.getElementById("timer").innerHTML = String(time);
    setTimeout(() => {
      document.getElementById("timer").innerHTML = String("Drawing new card");
      setTimeout(() => {
        document.getElementById("timer").innerHTML = String(
          "Drawing new card."
        );
        setTimeout(() => {
          document.getElementById("timer").innerHTML = String(
            "Drawing new card.."
          );
          setTimeout(() => {
            document.getElementById("timer").innerHTML = String(
              "Drawing new card..."
            );
            setTimeout(() => {
              if (numOfCard > 4) {
                resetBoard();
              } else {
                numOfCard++;
                addCard(offX, offY);
              }
            }, 1500);
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1000);
    return (time = 10);
  }
}
