// Create a card element
function createNewCard() {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>
  `;
  return cardElement;
}
createNewCardTest();
console.log(createNewCard());

// Append a new card to the parent element
function appendNewCard(parentElement) {
  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}
appendNewCardTest();

// Shuffle the card image classes
function shuffleCardImageClasses() {
  let cardClasses = [
    "image-1",
    "image-1",
    "image-2",
    "image-2",
    "image-3",
    "image-3",
    "image-4",
    "image-4",
    "image-5",
    "image-5",
    "image-6",
    "image-6",
  ];
  return _.shuffle(cardClasses);
}
shuffleCardImageClassesTest();

// Create cards and assign shuffled image classes
function createCards(parentElement, shuffledImageClasses) {
  let cardObjects = [];
  for (let i = 0; i < 12; i++) {
    let cardElement = appendNewCard(parentElement);
    cardElement.classList.add(shuffledImageClasses[i]);
    cardObjects.push({
      index: i,
      element: cardElement,
      imageClass: shuffledImageClasses[i],
    });
  }
  return cardObjects;
}
createCardsTest();

// Check if two cards match
function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}
doCardsMatchTest();

// Increment counters and update the UI
let counters = {};
function incrementCounter(counterName, parentElement) {
  if (!counters[counterName]) counters[counterName] = 0;
  counters[counterName]++;
  parentElement.innerText = counters[counterName];
}
incrementCounterTest();

// Global variables for game state
let lastCardFlipped = null;
let isFlipping = false;

// Handle card flip logic
function onCardFlipped(newlyFlippedCard) {
  if (isFlipping) return; // Prevent flipping more than two cards
  incrementCounter("flips", document.getElementById("flip-count"));

  if (!lastCardFlipped) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  isFlipping = true; // Block new flips until logic completes
  if (doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    incrementCounter("matches", document.getElementById("match-count"));
    lastCardFlipped.element.classList.add("glow");
    newlyFlippedCard.element.classList.add("glow");

    if (counters["matches"] === 6) {
      winAudio.play();
    } else {
      matchAudio.play();
    }

    lastCardFlipped = null;
    isFlipping = false; // Allow new flips
  } else {
    setTimeout(() => {
      lastCardFlipped.element.classList.remove("flipped");
      newlyFlippedCard.element.classList.remove("flipped");
      lastCardFlipped = null;
      isFlipping = false; // Allow new flips
    }, 1000); // Delay to allow viewing of the second card
  }
}

// Reset the game
function resetGame() {
  let cardContainer = document.getElementById("card-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  document.getElementById("flip-count").innerText = "0";
  document.getElementById("match-count").innerText = "0";

  counters = {};
  lastCardFlipped = null;
  setUpGame();
}

// ⛔️ Set up the game. Do not edit below this line! ⛔
setUpGame();
