const numPlayers = 5;

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
    document.getElementById("")
}
function startGame(){
    // create and place decks
    clearTable();
    setCardPile(cardBack);
    setEventText("Decks divided and shuffled");
}
function clearTable(){
    setCardPile(noCard);
    setFlippedPile(noCard);
    for(player in players){
        players[player]._displayCard = noCard;
        players[player].displayCard();
    }
    setEventText("Welcome!");
}
window.onload = function() {
    clearTable();
};
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
function flipCard(cards, flippedCards){
    let nextCard = cards.pop();
    setFlippedPile(nextCard);
    if(cards.length > 0){
        setCardPile(cardBack);
    }
    else setCardPile(noCard);
    updateCardCounter(cards);
    flippedCards.push(nextCard);
    return nextCard;
}
function selectRoles(cards, players){
    // deal the player deck out
    // if a player recieved the tooker
    // then that player becomes cat herder
    // else redeal
    
    while(true){
        break;
    }
}

function Suit(name, color){
    this.name = name;
    this.color = color;
}
const suits = [
    new Suit("hearts", "red"),
    new Suit("diamonds", "red"),
    new Suit("spades", "black"),
    new Suit("clubs", "black")
];

function Card(suit, value, imageLoc){
    this.suit = suit;
    this.value = value;
    this.imageLoc = imageLoc;
}
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
const flippedDeck = []; // cards from the trump deck which have been flipped already
const utilityDeck = [ // fours, sixes, jokers
    cards[2],  cards[4],
    cards[15], cards[17],
    cards[28], cards[29],
    cards[41], cards[42],
    cards[52], cards[53]
];
function deal(cards, players){
    let numPlayers = players.length;
    let dealtCards = Array.from({ length: numPlayers }, () => []); // Initialize an empty array for each player

    for(let i = 0; i < cards.length; i++){
        dealtCards[i % numPlayers].push(cards[i]); // Distribute cards round-robin
    }
    // Assign cards to players
    for(let i = 0; i < numPlayers; i++){
        players[i].hand = dealtCards[i];
    }
    // Return the leftover cards (if any)
    let remainingCards = cards.slice(numPlayers * Math.floor(cards.length / numPlayers));
    return remainingCards;
}

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
function Player(name, number, isPlayer=false){
    this.name = name;
    this.number = number;
    this.isPlayer = isPlayer;
    this._score = 0;
    this.hand = [];
    this.setScore = function(value){
        this._score = value;
        this.updateScoreCounter();
    }
    this.addScore = function(value){
        this._score = this._score + value;
        this.updateScoreCounter();
    }
    this.updateScoreCounter = function(){
        let visualScore = this._score % 4;
        if(scorePointValues.hasOwnProperty(visualScore)){
            document.getElementById("player" + this.number + "_scoreCard").src = scorePointValues[visualScore];
        }
    }
    this._displayCard = null;
    this.selectCard = function(){
        // select a random card from the player's hand
    }
    this.displayCard = function(){
        document.getElementById(`player${this.number}_displayCard`).src = this._displayCard.imageLoc;
    }
}
const players = [
    new Player("You", 0, true),
    new Player("Anna", 1),
    new Player("Tom", 2),
    new Player("Lucy", 3),
    new Player("Matt", 4)
];

function determineTrickWinner(trumpSuit, cards, firstPlayed = 0){
    // assign a score to each card, then return the card with the highest score
    trickTrump = cards[firstPlayed].suit;
    let scores = [];
    for(let card in cards){
        //console.log(cards[card]);
        if(cards[card].suit.name == trumpSuit.name){
            scores[card] = 20 + cards[card].value;
        }
        else if(cards[card].suit.name == trickTrump.name){
            scores[card] = 0 + cards[card].value;
        }
        else scores[card] = 0;
    }
    console.log(scores)
    let maxScore = Math.max(...scores);
    let maxPosition = scores.indexOf(maxScore);
    return cards[maxPosition];
}