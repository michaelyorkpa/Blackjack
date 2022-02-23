//Adjustable Game Variables
let betBtn1 = 1 //Value for bet button 1
let betBtn2 = 5 //Value for bet button 2
let betBtn3 = 10 //Value for bet button 3
let betBtn4 = 20 //Value for bet button 4
let numberOfDecks = 4 //Number of decks to draw from
let money = 100 //Starting player's bank
let dealerDrawTo = 17 //The number at which the dealer stays
//Initialize variables !!DON'T CHANGE ANY VARIABLES BELOW THIS LINE!!
let cardStack = [] //Holds full stack of cards, to include numberOfDecks below
let playerHand = [] //Player's current hand
let dealerHand = [] //Dealer's current hand
let pHandAces = 0 //How many aces in the player's hand
let dHandAces = 0 //How many aces in the dealer's hand
let pHandVal = [] //Player's current hand, card value only, sorted with Aces at the back
let dHandVal = [] //Dealer's current hand, card value only, sorted with Aces at the back
let playerSum = 0 //Sum of the player's cards
let dealerSum = 0 //Sum of the dealer's cards
let dealerSumShow = 0 //Sum of the dealer's cards shown if not dealer's turn
let isDealerTurn = false //variable puts program in loop until dealer draws 17 or more.
let roundOver = true //variable determines whether START GAME, HIT, and STAND buttons are active
let cardID = 0 //variable used solely for determining random card number to pull from cardStack
let bet = 0 //Value for bet, initialized at zero but gets its value as soon as player clicks a bet button
let statuses = ["Want to play a round?", "HIT, STAND, or DOUBLE DOWN?", "HIT or STAND?", "Dealer Bust! You win!", "You Win!", 
            "Blackjack! You Win!", "PUSH! It's a tie!", "PUSH! Double Blackjack", "Dealer Blackjack!", "You Lose!", "You went over 21! You lose!"]
let message = statuses[0] //For displaying messages on the UI
//DOM Object Variable Initialization
let dealerCardsEl = document.getElementById("dealer-cards-el") //Stores the DOM object dealer cards
let playerCardsEl = document.getElementById("player-cards-el") //Stores the DOM object player cards
let messageEl = document.getElementById("message-el") //Stores the DOM object player cards
let betBn1 = document.getElementById("betbtn1") //Stores the DOM object Bet Button 1
let betBn2 = document.getElementById("betbtn2") //Stores the DOM object Bet Button 2
let betBn3 = document.getElementById("betbtn3") //Stores the DOM object Bet Button 3
let betBn4 = document.getElementById("betbtn4") //Stores the DOM object Bet Button 4
let hitBtn = document.getElementById("hitbtn") //Stores the DOM object Hit Button
let standBtn = document.getElementById("standbtn") //Stores the DOM object Stand Button
let doubleBtn = document.getElementById("doublebtn") //Stores the DOM object Double Button
let pBank = document.getElementById("pbank") //Stores the DOM object player bank (player money)
let cBet = document.getElementById("cbet") //Stores the DOM object current bet
let dealerSumEl = document.getElementById("dealer-sum-el") //Stores the DOM object Dealer Sum
// Stats variable initialization
let roundsPlayed = 0
let totalBetAmount = 0
let totalCardsDrawn = 0
let timesDeckShuffled = 0
let totalAmountWon = 0
let totalAmountLost = 0
let roundsWon = 0
let roundsLost = 0
let roundsTied = 0
let playerBlackjacks = 0
let dealerBlackjacks = 0
let dealerBusts = 0

//Render the bet buttons and show player money (Basically just for the first load)
betBn1.textContent = "$" + betBtn1 + " BET"
betBn2.textContent = "$" + betBtn2 + " BET"
betBn3.textContent = "$" + betBtn3 + " BET"
betBn4.textContent = "$" + betBtn4 + " BET"
pBank.textContent = "Money: $"+money.toFixed(2)

//Set bet using bet 1 and start the game
function betButton1() {
    bet = betBtn1
    if (money-bet >= 0) {
        startGame()
    } else {
        noMoney()
    }
}
//Set bet using bet 2 and start the game
function betButton2() {
    bet = betBtn2
    if (money-bet >= 0) {
        startGame()
    } else {
        noMoney()
    }
}
//Set bet using bet 3 and start the game
function betButton3() {
    bet = betBtn3
    if (money-bet >= 0) {
        startGame()
    } else {
        noMoney()
    }
}
//Set bet using bet 4 and start the game
function betButton4() {
    bet = betBtn4
    if (money-bet >= 0) {
        startGame()
    } else {
        noMoney()
    }
}

//When start game is clicked, empty the player and dealer hands, deal the cards, then display everything
function startGame() {
    if (roundOver === true) {
        money -= bet //Take bet amount from player for initial bet
        totalBetAmount += bet
        roundsPlayed++
        isDealerTurn = false // Turn off the dealer turn variable at start of each round
        roundOver = false // Reset roundover to false so hit and stand buttons are activated
        // This for loop clears the cards from the table before rebuilding. Puts two face down cards in both player and dealer's hands
        for (i=0;i<10;i++) {
            if (i === 0 || i === 1) {
                srcId = "pcard"+i
                document.getElementById(srcId).src = "images/green_back.png"
                srcId = "dcard"+i
                document.getElementById(srcId).src = "images/green_back.png"
            } else {
                srcId = "pcard"+i
                document.getElementById(srcId).src = ""
                srcId = "dcard"+i
                document.getElementById(srcId).src = ""
            }
        }

        //Clear out dealer and player hands
        if (playerHand.length > 0) {
            playerHand.splice(0,playerHand.length)
            dealerHand.splice(0,dealerHand.length)
        }

        //Perform initial deal
        for (di=0; di<2; di++) { //Loops twice, giving player and dealer 2 cards each
            cardID = getRandomCard() //Get the random card
            playerHand.push(cardStack[cardID]) //Put the random card in the player's hand
            cardStack.splice(cardID, 1) //Remove the random card from the cardStack
            cardID = getRandomCard() //Get the random card
            dealerHand.push(cardStack[cardID]) //Put the random card in the Dealer's hand
            cardStack.splice(cardID, 1) //Remove the random card from the cardStack
        }

        renderGame() // Display deal and sums to Player and Dealer
    } 
}

//Used to pull a random card from the cardstack. Checks to see if the cardstack is empty then rebuilds if it is.
function getRandomCard() {
    if (cardStack.length === 0) {
        timesDeckShuffled++
        for (bi=0; bi<numberOfDecks; bi++) {
            cardStack.push("AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
            "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
            "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
            "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS")
        }
    }
    totalCardsDrawn++
    let newCard = Math.floor((Math.random() * cardStack.length) + 0)
    return newCard
}

//This function renders the UI, including messages, player cards, dealer cards, and sums.
function renderGame() {
    sumCards() //Get sum totals and messages
    //If the round is over light up the start game buttons and gray out the play buttons
    if (roundOver === true) {
        betBn1.style.backgroundColor = 'goldenrod'
        betBn2.style.backgroundColor = 'goldenrod'
        betBn3.style.backgroundColor = 'goldenrod'
        betBn4.style.backgroundColor = 'goldenrod'
        hitBtn.style.backgroundColor = 'darkgray'
        standBtn.style.backgroundColor = 'darkgray'
        doubleBtn.style.backgroundColor = 'darkgray'
    } else { // If round is active light up the play buttons and gray out the bet buttons
        betBn1.style.backgroundColor = 'darkgray'
        betBn2.style.backgroundColor = 'darkgray'
        betBn3.style.backgroundColor = 'darkgray'
        betBn4.style.backgroundColor = 'darkgray'
        hitBtn.style.backgroundColor = 'goldenrod'
        standBtn.style.backgroundColor = 'goldenrod'
        if (playerHand.length === 2) { //Only activate the Double Down button if the player is on their first turn
            doubleBtn.style.backgroundColor = 'goldenrod'
        } else {
            doubleBtn.style.backgroundColor = 'darkgray'
        }
    }
    //Render player's current bank account; .toFixed forces 2 decimal points to account for coins
    pBank.textContent = "Money: $" + money.toFixed(2) 
    cBet.textContent = "Bet: $" + bet //Render the current bet amount (may change during play if double down is pressed)
    messageEl.textContent = message //Render messages
    if (message === statuses[0] || message === statuses[1] || message === statuses[2]) {
        messageEl.style.color = "black"
    } else if (message === statuses[3] || message === statuses[4] || message === statuses[5]) {
        messageEl.style.color = "green"  // rgb(51, 65, 29)
    } else if (message === statuses[6] || message === statuses[7]) {
        messageEl.style.color = "orange"
    } else if (message === statuses[8] || message === statuses[9] || message === statuses[10]) {
        messageEl.style.color = "red"
    }

    //Render player cards, card images, and card value
    document.getElementById("player-sum-el").textContent = "Value: " + playerSum
    playerCardsEl.textContent = "Cards: "
    for (i=0; i<playerHand.length; i++) { //This loop loads and prints out the card values from the array as well as loading the card images
        playerCardsEl.textContent += playerHand[i]+" "
        let srcId = "pcard"+i
        document.getElementById(srcId).src = "images/" + playerHand[i] + ".png"
    }
    let cardBlanks = 11 - playerHand.length
    for (i=0; i<cardBlanks; i++) { //This loop reloads the blank/unused card spaces
        let tempId = playerHand.length+i
        let srcId = "pcard"+tempId
        document.getElementById(srcId).src = ""
    }

    //Render dealer cards and card value. Logic and structure is identical to the player card render
    if (isDealerTurn === true) {
        dealerSumEl.textContent = "Value: " + dealerSum
    } else {
        if (dealerSumShow === 11) {
            dealerSumEl.textContent = "Value: 1/11"
        } else {
        dealerSumEl.textContent = "Value: " + dealerSumShow
        }
    }
    dealerCardsEl.textContent = "Cards: "
    if (isDealerTurn === true) { //Only render all cards if it's the dealer turn. Otherwise only display first card
        for (i=0; i<dealerHand.length; i++) {
            dealerCardsEl.textContent += dealerHand[i]+" "
            let srcId = "dcard"+i
            document.getElementById(srcId).src = "images/" + dealerHand[i] + ".png"
        }
        cardBlanks = 11 - dealerHand.length
        for (i=0; i<cardBlanks; i++) {
            let tempId = dealerHand.length+i
            let srcId = "dcard"+tempId
            document.getElementById(srcId).src = ""
        }
    } else {
        dealerCardsEl.textContent += dealerHand[0]+" "
        document.getElementById("dcard0").src = "images/" + dealerHand[0] + ".png"
        document.getElementById("dcard1").src = "images/green_back.png"
        cardBlanks = 6
        for (i=2; i<cardBlanks; i++) {
            let srcId = "dcard"+i
            document.getElementById(srcId).src = ""
        }
    }

    //Renders the stats
    document.getElementById("roundsplayed").textContent = roundsPlayed
    document.getElementById("totalbetamount").textContent = totalBetAmount.toFixed(2)
    document.getElementById("totalcardsdrawn").textContent = totalCardsDrawn
    document.getElementById("timesdeckshuffled").textContent = timesDeckShuffled
    document.getElementById("totalamountwon").textContent = totalAmountWon.toFixed(2)
    document.getElementById("totalamountlost").textContent = totalAmountLost.toFixed(2)
    document.getElementById("roundswon").textContent = roundsWon
    document.getElementById("roundslost").textContent = roundsLost
    document.getElementById("roundstied").textContent = roundsTied
    document.getElementById("playerblackjacks").textContent = playerBlackjacks
    document.getElementById("dealerblackjacks").textContent = dealerBlackjacks
    document.getElementById("dealerbusts").textContent = dealerBusts
    
    //Check to see if it's the dealer's turn. If it is, skip to the standCard logic
    if (isDealerTurn === true) {
        standCard()
    }
}

//Function sums the cards, sets messages for the player, and has all the logic controlling win/lose conditions
function sumCards() {
    //Sum the player cards
    //Player and dealer hand arrays are pulled apart and the values separated into new arrays. The aces are moved to the end of the new array.
    //Doing this ensures that ace values are set properly (either 1 or 11) based on the values of all other cards in hand
    playerSum = 0 // Resets the sum to zero
    pHandAces = 0 // Resets the number of aces to zero
    pHandVal.splice(0,pHandVal.length) // Zeroes out the player hand value array
    //Loop pulls all the values out and keeps track of the number of aces
    for (ai=0; ai<playerHand.length; ai++) { let value = playerHand[ai].charAt(0); if (value === "A") { pHandAces++ } else { pHandVal.push(value) } }
    //Loop checks the value of each card from pHandVal, which has been sorted to remove aces. This allows the logic for determining ace value at 1 or 11
    for (si=0; si<(pHandVal.length); si++) { //Loop for the total number of cards in player's hand
        let value = pHandVal[si] // Save the current card value to the variable 'value'
        if (value === "1" || value === "J" || value === "Q" || value === "K") {
            playerSum += 10 //If the first character is a 1 (meaning 10), J, Q, or K add 10 to the player's sum
        } else { // Otherwise, add the face value of the card to the player sum.
            playerSum += parseInt(value) //parseInt converts the number to an integer
        }
    }
    if (pHandAces > 0) { //If there is an ace in the hand, run this logic
        if ((playerSum + 11 + (pHandAces-1))>21){ //Checks to see if one of the aces being 11 would push the total over 21
            playerSum += pHandAces // If it does push it over 21, only add the total number of aces to the total
        } else { //If the ace being 11 doesn't push it over, add 11 plus the number of aces minus 1 (the one you made 11)
            playerSum += 11 + (pHandAces-1)
        }
    }

    //Sum the dealer cards
    dealerSum = 0 // Resets the sum to zero
    dealerSumShow = 0 //Resets the sum to zero
    dHandAces = 0 // Resets the number of aces to zero
    dHandVal.splice(0,dHandVal.length) // Zeroes out the dealer hand value array
    //Loop pulls all the values out and keeps track of the number of aces
    for (ai=0; ai<dealerHand.length; ai++) { let value = dealerHand[ai].charAt(0); if (value === "A") { dHandAces++ } else { dHandVal.push(value) } }
    //Loop checks the value of each card from dHandVal, which has been sorted to remove aces. This allows the logic for determining ace value at 1 or 11
    for (si=0; si<dHandVal.length; si++) { //Loop for the total number of cards in dealer's hand
        let value = dHandVal[si] // Save the current card value to the variable 'value'
        if (value === "1" || value === "J" || value === "Q" || value === "K") {
            dealerSum += 10 //If the first character is a 1 (meaning 10), J, Q, or K add 10 to the dealer's sum
        } else { // Otherwise, add the face value of the card to the dealer sum.
            dealerSum += parseInt(value) //parseInt converts the number to an integer
        }
    }
    if (dHandAces > 0) { //If there is an ace in the hand, run this logic
        if ((dealerSum + 11 + (dHandAces-1))>21) { //Checks to see if one of the aces being 11 would push the total over 21
            dealerSum += dHandAces // If it does push it over 21, only add the total number of aces to the total
        } else { //If the ace being 11 doesn't push it over, add 11 plus the number of aces minus 1 (the one you made 11)
            dealerSum += 11 + (dHandAces-1)
        }
    }

    if (isDealerTurn === false) {
        value = dealerHand[0].charAt(0)
        if (value === "A") { //If the card is an ace show value of 11
        dealerSumShow += 11
        // If the card is valued at 1 (10), J, Q, K add 10 to the dealer sum
        } else if (value === "1" || value === "J" || value === "Q" || value === "K") {
            dealerSumShow += 10
        } else { // Otherwise, add the face value of the card to the dealer sum.
            dealerSumShow += parseInt(value) //parseInt converts the number to an integer
        }
    }

    //Check for blackjack on initial deal
    if (playerHand.length === 2 && dealerHand.length === 2) {
        if (dealerSum === 21 && playerSum === 21) { //Checks for double blackjack
            isDealerTurn = true
            message = statuses[7]
            roundOver = true //Mark the round over
            money += bet //Put the bet back in the player's bank
            playerBlackjacks++ //Total player blackjacks + 1
            dealerBlackjacks++ //Total dealer blackjacks + 1
            roundsTied++ //Total rounds tied + 1
            return
        } else if (dealerSum === 21) { //Dealer Blackjack
            isDealerTurn = true
            message = statuses[8]
            roundOver = true //Mark the round over
            //Stats tracking
            dealerBlackjacks++ //Total dealer blackjacks + 1
            roundsLost++ //Total rounds lost + 1
            totalAmountLost += bet //Add bet from total amount lost
            return
        } else if (playerSum === 21) { //Player Blackjack
            message = statuses[5]
            roundOver = true //Mark the round over
            money += bet + ((bet/2)*3) //Add 3:2 payout to player's money
            //Stats tracking
            playerBlackjacks++ //Total player blackjacks + 1
            roundsWon++ //Total rounds won + 1
            totalAmountWon += bet + ((bet/2)*3) //3:2 payout added to total winnings
            return
        }
    }

    //Player Busts
    if (playerSum > 21) {
        message = statuses[10]
        roundsLost++ //Add 1 to total rounds lost
        totalAmountLost += bet //Add bet to total amount lost
        roundOver = true //Mark round as over
        return
    }

    //Game is still going, ask the player whether they want to HIT or STAND
    if (playerSum < 21 && isDealerTurn === false) {
        if (playerHand.length === 2) { //If it's the initial draw, offer double down
            message = statuses[1]
        } else { //If it's after the initial draw, don't offer double down
            message = statuses[2]
        }
        return
    }

    //Dealer Busts
    if (dealerSum > 21) {
        message = statuses[3]
        roundOver = true //Mark round as over
        //Stats tracking
        roundsWon++ //add 1 to rounds won
        dealerBusts++ //add 1 to dealer busts
        totalAmountWon += bet*2 //add bet to total amount won
        money += bet*2 //double bet money and return to player's bank
        return
    }

    //Once the round has been marked as over because the Dealer has hit or exceeded his draw to limit
    if (roundOver === true) {
        if (playerSum > dealerSum) { //Player's total is greater than dealer. Player wins
            message = statuses[4]
            roundOver = true //Mark round as over
            money += bet*2 //Return doubled bet to player's money
            //Stats tracking
            totalAmountWon += bet*2 //Add bet to total amount won
            roundsWon++ //Add 1 to rounds won
            return
        } else if (playerSum < dealerSum) { //Dealer's total is greater than dealer. Dealer wins.
            message = statuses[9]
            roundOver = true //Mark round as over
            //Stats tracking
            totalAmountLost += bet //Add bet to total amount lost
            roundsLost++ //Add 1 to rounds lost
            return
        } else if (playerSum === dealerSum) { //Totals are the same. It's a push/tie.
            message = statuses[6]
            roundOver = true //Mark round as over
            money += bet //Return the bet to the player since it's a tie
            //Stats tracking
            roundsTied++ //Add 1 to rounds tied
            return
        }
    }
}

//Pulls one card for the player then re-renders the game
function hitCard() {
    if (roundOver === false) { //Only allows button to be clicked if Round is active
        cardID = getRandomCard() //calls random card function and returns the response to cardID
        playerHand.push(cardStack[cardID]); cardStack.splice(cardID, 1) //Puts card in player's hand removes it from the cardStack
        renderGame() //Returns to renderGame
    }
}

//Dealer does his thing. Render the game after each card draw.
function standCard() {
    if (roundOver === false) { //Only allows button to be clicked if Round is active
        isDealerTurn = true //Sets dealer turn to true to force looping
        if (dealerSum < dealerDrawTo) { //checks to see whether dealerSum is less than the amount the dealer draws to
            cardID = getRandomCard() //calls random card function and returns the response to cardID
            dealerHand.push(cardStack[cardID]); cardStack.splice(cardID, 1) //Puts card in dealer's hand and removes it from the cardStack
            renderGame() //returns to renderGame
        } else { //If the dealer has hit or exceeded the draw to limit we mark the round as over and send it to rendergame
            roundOver = true
            renderGame()
        }
    }
}

//Double Down function. Only available on initial draw. Doubles bet. Reduces money. Draws another card. Immediately ends player's turn.
function doubleDown() {
    if (playerHand.length === 2) {
        if (money-bet >= 0) {
            totalBetAmount += bet //add the bet amount to total bet amount stat
            money -= bet //subtract the bet amount from player's money again
            bet += bet //doubles the bet
            isDealerTurn = true //marks the player's turn over
            hitCard() //draws a card for the player, which then renders the game and starts the stand card logic (dealer turn)
        } else {
            noMoney()
        }
    }
}

function noMoney() {
    messageEl.textContent = "You don't have enough money!"
}