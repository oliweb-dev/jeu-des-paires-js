const gameHtml = document.getElementById("game");
const infoHtml = document.getElementById("info");
const scoreHtml = document.getElementById("score");
const btnStartHtml = document.getElementById("btnStart");
const btnLevel1Html = document.getElementById("level1");
const btnLevel2Html = document.getElementById("level2");
const btnLevel3Html = document.getElementById("level3");
const btnLevel4Html = document.getElementById("level4");
let startTime = 0;
let isSelected = false;
let result = undefined;
let cardNumber = 6;
let selectedCardsArray = [];
let cardsArray = [];
let cardLeft = cardNumber;
let attempts = 0;
let picturesArray = [];
const allButtons = [btnLevel1Html, btnLevel2Html, btnLevel3Html, btnLevel4Html];

function setCardToRed(id) {
   const cardHtml = document.getElementById(`card-${id}`);
   cardHtml.classList.replace("cardGreen", "cardRed");
}

function removeEventCard(id) {
   const cardHtml = document.getElementById(`card-${id}`);
   cardHtml.removeEventListener("click", handleClick);
   cardHtml.style.cursor = "auto";
}

function addEventCard(id) {
   const cardHtml = document.getElementById(`card-${id}`);
   cardHtml.addEventListener("click", handleClick);
   cardHtml.style.cursor = "pointer";
}

function hideValueCard(id) {
   const card = getCard(id);
   const cardHtml = document.getElementById(`card-${card.id}`);
   cardHtml.innerHTML = ""; //card.picture.img;
   cardHtml.classList.remove("cardGreen", "cardRed");
   cardHtml.classList.add("cardBack");
}

function displayValueCard(id) {
   const card = getCard(id);
   const cardHtml = document.getElementById(`card-${card.id}`);
   cardHtml.innerHTML = card.picture.img;
   cardHtml.classList.replace("cardBack", "cardGreen");
}

function displayResults(attempts) {
   let endTime = Date.now();
   let timeInSeconds = Math.floor((endTime - startTime) / 1000);
   infoHtml.innerText = `Bravo, vous avez gagné  !`;
   scoreHtml.innerHTML = `Stats: ${attempts} coups et ${timeInSeconds} secondes`;
}

function notFound(result) {
   for (let c of result.selectedCards) {
      setCardToRed(c.card.id);
   }
   setTimeout(() => {
      for (let c of result.selectedCards) {
         hideValueCard(c.card.id);
         addEventCard(c.card.id);
         isSelected = false;
      }
   }, 2000);
}

function win(result) {
   displayResults(result.attempts);
   isSelected = false;
}

function handleClick(event) {
   const idHtml = event.currentTarget.id;
   const id = parseInt(idHtml.split("-").at(1));
   if (!isSelected) {
      displayValueCard(id);
      removeEventCard(id);
      result = checkSelectedCards(id);
   }
   if (typeof result !== "undefined" && !isSelected) {
      isSelected = true;
      switch (result.state) {
         case "found":
            isSelected = false;
            break;
         case "notFound":
            notFound(result);
            break;
         case "win":
            win(result);
            break;
      }
   }
}

function displayGame(cards) {
   for (let c of cards) {
      const div = document.createElement("div");
      //div.innerText = c.picture.img;
      div.setAttribute("id", `card-${c.id}`);
      div.classList.add("cardBack");
      div.addEventListener("click", handleClick);
      gameHtml.append(div);
   }
}

function init() {
   btnStartHtml.innerText = "Recommencer";
   infoHtml.innerText = "";
   scoreHtml.innerText = "";
   gameHtml.innerHTML = "";
   startTime = Date.now();

   cardsArray = [];
   cardLeft = cardNumber
   attempts = 0;
   initPicturesArray();
}

function start() {
   init();
   const cards = shuffle();
   displayGame(cards);
}

btnStartHtml.addEventListener("click", start);

function handleButtonClick(btnElement, cardCount) {
   btnElement.addEventListener("click", () => {
      allButtons.forEach(button => {
         button.classList.replace('btn-outline-primary', 'btn-primary');
      });

       btnElement.classList.replace('btn-primary', 'btn-outline-primary');
       cardNumber = cardCount;
   });
}

handleButtonClick(btnLevel1Html, 6);
handleButtonClick(btnLevel2Html, 12);
handleButtonClick(btnLevel3Html, 18);
handleButtonClick(btnLevel4Html, 24);

/* -------------------------------------------------------------------------------------*/

function getCard(idCard) {
   const index = cardsArray.findIndex((c) => c.id === idCard);
   if (index === -1) return false;
   return cardsArray.at(index);
}

function checkSelectedCards(idCard) {
   setSelectedCardsArray(idCard);
   if (selectedCardsArray.length === 2) {
      attempts++;
      if (selectedCardsArray.at(0).card.picture.id !== selectedCardsArray.at(1).card.picture.id) {
         result = { state: 'notFound', selectedCards: selectedCardsArray, attempts: attempts };
      } else {
         cardLeft -= 2;
         if (cardLeft === 0) {
            result = { state: "win", selectedCards: selectedCardsArray, attempts: attempts };
         } else {
            result = { state: "found", selectedCards: selectedCardsArray, attempts: attempts };
         } 
      }
      selectedCardsArray = [];
      return result;
   }
}

function setSelectedCardsArray(idCard) {
   selectedCardsArray.push({
      card: getCard(idCard),
   });
}

function shuffle() {
   picturesArray = picturesArray.sort(() => Math.random() - 0.5);
   let indexPic = 0;
   let cpt = 1;
   for (let i = 0; i < cardNumber; i++) {
      cardsArray.push({
         id: i,
         picture: picturesArray.at(indexPic),
      });
      if (cpt === 2) {
         indexPic++;
         cpt = 0;
      }
      cpt++;
   }
   cardsArray = cardsArray.sort(() => Math.random() - 0.5);
   return cardsArray;
}

function initPicturesArray() {
   if (picturesArray.length > 0) return;

   picturesArray.push(
      {id: 0, img: "🥝"},
      {id: 1, img: "🍍"},
      {id: 2, img: "🍇"},
      {id: 3, img: "🍉"},
      {id: 4, img: "🍏"},
      {id: 5, img: "🍙"},
      {id: 6, img: "🍧"},
      {id: 7, img: "🌺"},
      {id: 8, img: "🌮"},
      {id: 9, img: "🌈"},
      {id: 10, img: "🌟"},
      {id: 11, img: "🏵"},
      {id: 12, img: "🍭"},
      {id: 13, img: "🌴"},
      {id: 14, img: "🍕"},
      {id: 15, img: "🍱"},
      {id: 16, img: "🍂"},
      {id: 17, img: "☕"},
      {id: 18, img: "🍰"},
      {id: 19, img: "🥐"},
      {id: 20, img: "🍀"},
      {id: 21, img: "💦"},
      {id: 22, img: "❓"},
      {id: 23, img: "😎"},
      {id: 24, img: "⛳"},
      {id: 25, img: "🥇"},
      {id: 26, img: "⏰"},
      {id: 27, img: "📌"},
      {id: 28, img: "💡"},
      {id: 29, img: "🩹"},
      {id: 30, img: "📸"}
   );
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}
