# Blackjack

<h2>A simple Blackjack game written in HTML5, CSS, and Javascript.</h2>

<p>This is my first javascript project and was inspired by this freeCodeCamp tutorial by <a href="https://github.com/scrimba">scrimba</a>: https://youtu.be/jS4aFq5-91M</p>

<p>(His repository for his version <a href="https://github.com/scrimba/learn-javascript/tree/main/3.%20Build%20a%20Blackjack%20game/54.%20Congrats%20%26%20recap">here</a>)</p>

<p>I've gone further than the example in the video by adding the following:</p>

<ul>
  <li>An actual set of decks put together rather than just picking completely random values each time.</li>
  <li>Variable bet amounts (using 4 different customizable buttons)</li>
  <li>A dealer, because Blackjack is way more fun when there's some competition.</li>
  <li>Card Images, because who wants to decipher what 5C, AS, JH means??</li>
  <li>I've heavily commented the JS code, and will continue to do so with the HTML and CSS as I learn more about all three.</li>
  <li>I've written logic to only show the dealer's first card and card value until the player's turn is over.</li>
  <li>I've written the logic to handle Aces having variable value based on the value of all the other cards in the hand.</li>
  <li>A double down button, only available on the player's first turn of a round. Doubles the bet amount (if the player has enough money) and ends the player's turn.</li>
</ul>

<p>The following game mechanics are adjustable by changing the variables at the top of the .js file:</p>
<ul>  
  <li>Bet amounts: $1, $5, $10, and $20 are base</li>
  <li>Player starting funds: $100 base</li>
  <li>Number of Decks: 4 base. The game doesn't really shuffle, so much as pull a random card from the stack until the stack is empty. I may redo this at some point for a "real" shuffle.</li>
  <li>Dealer Draw To: When it's the dealer's turn they will continue to draw cards to this variable's setting. Standard is 17.</li>
</ul>

<p>As I've mentioned, this is my first javascript project and it's been years since I've really worked with HTML and CSS heavily so I'm pretty new. If you have helpful comments or additions they will be warmly welcomed.</p>
