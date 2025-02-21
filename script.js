/* UTILITY FUNCTIONS */

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

/* CLASS DEFINITIONS */
function Suit(name, color){
    this.name = name;
    this.color = color;
}

function Card(suit, value, imageLoc){
    this.suit = suit;
    this.value = value;
    this.imageLoc = imageLoc;
}

function Player(name, number, isUser=false){
    this.name = name;
    this.number = number;
    this.isUser = isUser;
    this._score = 0;
    this._tricksWon = 0;
    this.hand = [];
    this.role = "";
    this.setScore = function(value){
        this._score = value;
        this.updateScoreCounter();
    }
    this.addScore = function(value){
        this._score += value;
        this.updateScoreCounter();
    }
    this.updateScoreCounter = function(){
        let visualScore = this._score % 4;
        if(scorePointValues.hasOwnProperty(visualScore)){
            document.getElementById("player" + this.number + "_scoreCard").src = scorePointValues[visualScore];
        }
    }
    this.addTricksWon = function(tricks = 1){
        this._tricksWon += tricks;
    }
    this._displayCard = null;
    this.displayCard = function(card){
        if(card){
            this._displayCard = card;
            document.getElementById(`player${this.number}_displayCard`).src = this._displayCard.imageLoc;
        }
    }
    this.chooseCard = function(roundTrump, trickTrump) {
        return new Promise((resolve) => {
            if (!this.isUser) {
                // AI selects a card automatically
                let chosenCard = this.hand.pop();
                resolve(chosenCard);
                return;
            }
            console.log("user's turn");
    
            // Allow user to select a card
            setVisibleButtons("play_card_button");
    
            document.getElementById("play_card_button").onclick = () => {
                // 
                if (!selectedCard) {
                    alert("Please select a card first!");
                    return;
                }
    
                // Find the selected card in hand
                let selectedIndex = parseInt(selectedCard.replace("player_hand_card", ""));
                if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= this.hand.length) return;

                let chosenCard = this.hand.splice(selectedIndex, 1)[0]; // Remove from hand
                selectedCard = null; // Reset selection
                setVisibleButtons(); // Hide play button

                document.getElementById(`player_hand_card${selectedIndex}`).src = noCard.imageLoc;
                selectedCard = null;

                resolve(chosenCard); // Return the chosen card
            };
        });
    };
    this.placeCard = async function(roundTrump, trickTrump) {
        let card = await this.chooseCard(roundTrump, trickTrump);
        console.log("Player played:", card);
        this.displayCard(card);
        placedCards.push(card);
    };
    
}

/* GLOBAL CONSTANTS AND VARIABLES */
const numPlayers = 5;
const buttonIDs = [
    "start_game_button",
    "determine_roles_button",
    "deal_button",
    "flip_card_button",
    "display_cards_button",
    "start_round_button",
    "play_card_button"
]
let rolesDetermined = false;
let stratChosen = false;
let selectedCard = null;
const flippedDeck = [];
const placedCards = [];
const players = [
    new Player("You", 0, true),
    new Player("Anna", 1),
    new Player("Tom", 2),
    new Player("Lucy", 3),
    new Player("Matt", 4)
]
const activePlayers = players;
const userPlayer = players[0];
const scorePointValues = {
    0: "score_0040.png",
    0.5: "score_05.png",
    1: "score_10.png",
    1.5: "score_15.png",
    2: "score_20.png",
    2.5: "score_25.png",
    3: "score_30.png",
    3.5: "score_35.png"
};
// CREATE SUITS
const suits = [
    new Suit("hearts", "red"),
    new Suit("diamonds", "red"),
    new Suit("spades", "black"),
    new Suit("clubs", "black")
];

/* CREATE DECKS */
const noCard = new Card(null, 0, "cards/blank.png");
const cardBack = new Card(null, 0, "cards/card_back.png");
const cards = [
    new Card(suits[0], 2,  "cards/2_of_hearts.png"),
    new Card(suits[0], 3,  "cards/3_of_hearts.png"),
    new Card(suits[0], 4,  "cards/4_of_hearts.png"),
    new Card(suits[0], 5,  "cards/5_of_hearts.png"),
    new Card(suits[0], 6,  "cards/6_of_hearts.png"),
    new Card(suits[0], 7,  "cards/7_of_hearts.png"),
    new Card(suits[0], 8,  "cards/8_of_hearts.png"),
    new Card(suits[0], 9,  "cards/9_of_hearts.png"),
    new Card(suits[0], 10, "cards/10_of_hearts.png"),
    new Card(suits[0], 11, "cards/jack_of_hearts.png"),
    new Card(suits[0], 12, "cards/queen_of_hearts.png"),
    new Card(suits[0], 13, "cards/king_of_hearts.png"),
    new Card(suits[0], 14, "cards/ace_of_hearts.png"),
    new Card(suits[1], 2,  "cards/2_of_diamonds.png"),
    new Card(suits[1], 3,  "cards/3_of_diamonds.png"),
    new Card(suits[1], 4,  "cards/4_of_diamonds.png"),
    new Card(suits[1], 5,  "cards/5_of_diamonds.png"),
    new Card(suits[1], 6,  "cards/6_of_diamonds.png"),
    new Card(suits[1], 7,  "cards/7_of_diamonds.png"),
    new Card(suits[1], 8,  "cards/8_of_diamonds.png"),
    new Card(suits[1], 9,  "cards/9_of_diamonds.png"),
    new Card(suits[1], 10, "cards/10_of_diamonds.png"),
    new Card(suits[1], 11, "cards/jack_of_diamonds.png"),
    new Card(suits[1], 12, "cards/queen_of_diamonds.png"),
    new Card(suits[1], 13, "cards/king_of_diamonds.png"),
    new Card(suits[1], 14, "cards/ace_of_diamonds.png"),
    new Card(suits[2], 2,  "cards/2_of_spades.png"),
    new Card(suits[2], 3,  "cards/3_of_spades.png"),
    new Card(suits[2], 4,  "cards/4_of_spades.png"),
    new Card(suits[2], 5,  "cards/5_of_spades.png"),
    new Card(suits[2], 6,  "cards/6_of_spades.png"),
    new Card(suits[2], 7,  "cards/7_of_spades.png"),
    new Card(suits[2], 8,  "cards/8_of_spades.png"),
    new Card(suits[2], 9,  "cards/9_of_spades.png"),
    new Card(suits[2], 10, "cards/10_of_spades.png"),
    new Card(suits[2], 11, "cards/jack_of_spades.png"),
    new Card(suits[2], 12, "cards/queen_of_spades.png"),
    new Card(suits[2], 13, "cards/king_of_spades.png"),
    new Card(suits[2], 14, "cards/ace_of_spades.png"),
    new Card(suits[3], 2,  "cards/2_of_clubs.png"),
    new Card(suits[3], 3,  "cards/3_of_clubs.png"),
    new Card(suits[3], 4,  "cards/4_of_clubs.png"),
    new Card(suits[3], 5,  "cards/5_of_clubs.png"),
    new Card(suits[3], 6,  "cards/6_of_clubs.png"),
    new Card(suits[3], 7,  "cards/7_of_clubs.png"),
    new Card(suits[3], 8,  "cards/8_of_clubs.png"),
    new Card(suits[3], 9,  "cards/9_of_clubs.png"),
    new Card(suits[3], 10, "cards/10_of_clubs.png"),
    new Card(suits[3], 11, "cards/jack_of_clubs.png"),
    new Card(suits[3], 12, "cards/queen_of_clubs.png"),
    new Card(suits[3], 13, "cards/king_of_clubs.png"),
    new Card(suits[3], 14, "cards/ace_of_clubs.png"),
    new Card("red", 0, "cards/red_joker.png"),
    new Card("black", 0, "cards/black_joker.png")
];
const playerDeck = [ // tooker, nines, tens, jacks, queens, kings
    cards[0],
    cards[7],  cards[8],  cards[9],  cards[10], cards[11], cards[12],
    cards[20], cards[21], cards[22], cards[23], cards[24], cards[25],
    cards[33], cards[34], cards[35], cards[36], cards[37], cards[38],
    cards[46], cards[47], cards[48], cards[49], cards[50], cards[51],
];
const trumpDeck = [ // twos (sans tooker), threes, fives, sevens, eights
               cards[1],   cards[3],  cards[5],  cards[6],
    cards[13], cards[14], cards[16], cards[18], cards[19],
    cards[26], cards[27], cards[29], cards[31], cards[32],
    cards[39], cards[40], cards[42], cards[44], cards[45]
];
const utilityDeck = [ // fours, sixes, jokers
    cards[2],  cards[4],
    cards[15], cards[17],
    cards[28], cards[29],
    cards[41], cards[42],
    cards[52], cards[53]
];

/* GAME CONTROL FUNCTIONS */
window.onload = function() {
    clearTable();
    setVisibleButtons("start_game_button");
};
function exitGame(){
    let response = confirm("Exiting now will end the current game. Are you sure?");
    if(response){
        window.location.href='index.html';
    }
}
function newGame(){
    let response = confirm("Beginning a new game now will end the current game. Are you sure?");
    if(response){
        window.location.href='gameScreen.html';
    }
}
function startGame(){
    // create and place decks
    clearTable();
    setCardPile(cardBack);
    shuffle(playerDeck);
    shuffle(trumpDeck);
    updateCardCounter(trumpDeck);
    setEventText("Decks divided and shuffled");
    rolesDetermined = false;
    setVisibleButtons("determine_roles_button");
}
function clearTable(){
    setCardPile(noCard);
    setFlippedPile(noCard);
    clearPlacedCards();
    for(let i = 0; i < 5; i++){
        //console.log(`player_hand_card${i}`);
        document.getElementById(`player_hand_card${i}`).src = noCard.imageLoc;
    }
    setEventText("Welcome! Click 'Start Game' to complete setup");
}
function clearPlacedCards(){
    placedCards.length = 0;
    players.forEach(player => player.displayCard(noCard));
}

/* UI Helper Functions */
function setVisibleButtons(buttons = []){
    // if only one button is passed, make a singleton array
    if(typeof(buttons) == "string") buttons = [buttons];
    buttonIDs.forEach(button => document.getElementById(button).style.display = "none");
    buttons.forEach(button => document.getElementById(button).style.display = "inline-block");
}
function setEventText(text){
    document.getElementById("eventsLabel").innerHTML = text;
}
function setCardPile(card){
    document.getElementById("cardPile").src = card.imageLoc;
}
function setFlippedPile(card){
    document.getElementById("flippedPile").src = card.imageLoc;
}
function updateCardCounter(cards){
    document.getElementById("cardsCounter").innerHTML = cards.length;
}
async function determineRoles(players, deck){
    setVisibleButtons();
    setEventText("Determining roles...");
    await delay(200);
    let counter = 0;
    for(let card of deck){
        players[counter % players.length].displayCard(card);

        if(card.suit.name === "hearts" && card.value === 2){
            //console.log((counter+2) % players.length);
            assignRoles(players, counter);
            await delay(1500);
            rolesDetermined = true;
            break;
        }
        counter++;
        await delay(200);
    }
    if(rolesDetermined) prepareDeal(deck, players);
}
function assignRoles(players, index) {
    players[index % players.length].role = "cat_herder";
    players[(index + 1) % players.length].role = "dealer";
    players[(index + 2) % players.length].role = "lead";
    console.log();
    setEventText(`${players[index % players.length].name} ${players[index % players.length].isUser ? "are" : "is"} the Cat Herder. ${players[(index + 1) % players.length].name} ${players[(index+1) % players.length].isUser ? "are" : "is"} the Dealer.`);
}
async function deal(cards, players){
    setVisibleButtons();
    setEventText("Dealing...");
    shuffle(cards);
    let hands = Array.from({ length: numPlayers }, () => []);
    cards.forEach((card, i) => hands[i % numPlayers].push(card));
    players.forEach((player, i) => player.hand = hands[i]);
    for(let player of players){
        player.displayCard(cardBack);
        await delay(500);
    }
    players.forEach(player => player.displayCard(noCard));
    setEventText("Cards dealt");
    await showPlayerCards();
    setVisibleButtons("start_round_button");
}
async function showPlayerCards(){
    for(let i = 0; i < 5; i++){
        console.log(`player_hand_card${i}`);
        document.getElementById(`player_hand_card${i}`).src = cardBack.imageLoc;
    }
    await delay(500);
    document.getElementById("player_hand_card4").src = userPlayer.hand[4].imageLoc;
    stratChosen = true;
}
function flipCard(cards, flippedCards){
    let nextCard = cards.pop();
    setFlippedPile(nextCard);
    setCardPile(cards.length > 0 ? cardBack : noCard);
    updateCardCounter(cards);
    flippedCards.push(nextCard);
    return nextCard;
}

/* PLAYER ACTIONS */


function shuffle(array) {
    // Fisher-Yates Shuffle
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] =
            [array[randomIndex], array[currentIndex]];
    }
}
function prepareDeal(cards, players){

    setVisibleButtons();
    shuffle(cards);
    let dealer;
    for(let player of players){
        player.displayCard(noCard);
        if(player.role == "dealer") dealer = player;
    }
    if(dealer.isUser){
        // the user player should be the one to deal the cards
        setVisibleButtons("deal_button");
    }
    else{
        // another player is the dealer 
        deal(cards, players);
    }
}
async function doRound(){
    flipCard(trumpDeck, flippedDeck);
    let roundTrump = flippedDeck[0].suit;
    setEventText(`Trump is ${roundTrump.name.toTitleCase()}`);
    setVisibleButtons();
    for(let i = 0; i < 5; i++){
        await doTrick(roundTrump);
        await delay(2000);
        clearPlacedCards();
    }

    let pointsEarned = updatePlayerPoints();
    displayEarnedPoints(pointsEarned);
    console.log("round done");
}
function updatePlayerPoints(){
    let pointsEarned = [];
    let singlesCount = 0;
    for(let player of activePlayers){
        if(player._tricksWon === 1){
            singlesCount++;
        }
        if(player._tricksWon === 2){
            player.addScore(1);
            pointsEarned.push(1);
        }
        else if(player._tricksWon === 4){
            player.addScore(2);
            pointsEarned.push(2);
        }
        else if(player._tricksWon === 5){
            player.addScore(0.5);
            pointsEarned.push(0.5);
        }
        else {
            pointsEarned.push(0);
        }
    }
    if(singlesCount === numPlayers-1){
        activePlayers.forEach(player => player.addScore(-1));
        pointsEarned = Array(5).fill(-1);
    }
    return pointsEarned;
}
function displayEarnedPoints(pointsEarned) {
    let result = "";
    for (let i = 0; i < pointsEarned.length; i++) {
        result += `${activePlayers[i].name} earned ${pointsEarned[i]} points. `;
    }
    console.log(result);
    setEventText(result);
}
async function doTrick(roundTrump){
    let leader = activePlayers.find(player => player.role === "lead");
    await delay(1500);

    // have each player select and play their card in turn
    for(let i = leader.number, count = 0; count < numPlayers; i = (i + 1) % numPlayers, count++){
        setEventText(`${activePlayers[i].name}${activePlayers[i].isUser ? "r" : "'s"} turn to play`);
        await delay(1500);
        await activePlayers[i].placeCard();
        await delay(250);
    }

    // Determine the winner
    let winningCard = determineTrickWinner(roundTrump, placedCards);
    let winningIndex = placedCards.findIndex(card => card.suit.name === winningCard.suit.name && card.value === winningCard.value);
    if (winningIndex === -1) {
        console.error("Winning card not found in placedCards!");
        return;
    }
    let winningPlayer = activePlayers[winningIndex];
    winningPlayer.addTricksWon();

    setEventText(`${winningPlayer.name} win${winningPlayer.isUser ? "" : "s"} the trick!`);
}

// Function to handle card selection
function selectCard(cardId) {
    // Deselect the previously selected card
    if (selectedCard) {
        document.getElementById(selectedCard).classList.remove("selected");
    }

    // Select the new card (or deselect if clicking the same one)
    if (selectedCard === cardId) {
        selectedCard = null; // Deselect if clicked again
    } else {
        selectedCard = cardId;
        if(true || stratChosen){
            document.getElementById(selectedCard).classList.add("selected");
        }
    }
}
// Add event listeners to each hand card
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < 5; i++) {
        const cardElement = document.getElementById(`player_hand_card${i}`);
        cardElement.addEventListener("click", () => selectCard(`player_hand_card${i}`));
    }
});
function playCard() {
    if (selectedCard) {
        console.log("Playing card:", selectedCard);
        // Implement logic to move the card to the play area
    } else {
        alert("Please select a card to play!");
    }
}

function determineTrickWinner(trumpSuit, cards, firstPlayed = 0) {
    console.log(cards);
    let trickTrump = cards[firstPlayed].suit;
    let scores = [];
    
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardValue = card.value;
        
        if (card.suit.name === trumpSuit.name) {
            if (card.value === 11) {
                scores[i] = 100; // Jack of trump suit is highest
            } else if (card.suit.color === trumpSuit.color && card.value === 11) {
                scores[i] = 90; // Jack of opposite suit in same color is second highest
            } else {
                scores[i] = 20 + card.value; // Regular trump cards
            }
        } else if (card.suit.name === trickTrump.name) {
            scores[i] = card.value; // Followed suit cards use normal value
        } else {
            scores[i] = 0; // Off-suit cards have no value
        }
    }
    
    console.log(scores);
    let maxScore = Math.max(...scores);
    let maxPosition = scores.indexOf(maxScore);
    return cards[maxPosition];
}
