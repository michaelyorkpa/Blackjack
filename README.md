# Blackjack

<h2>A simple Blackjack game written in HTML5, CSS, and Javascript.</h2>

<p>This is my first javascript project and was inspired by this freeCodeCamp tutorial by <a href="https://github.com/scrimba">scrimba</a>: https://youtu.be/jS4aFq5-91M</p>

<p>(His repository for his version <a href="https://github.com/scrimba/learn-javascript/tree/main/3.%20Build%20a%20Blackjack%20game/54.%20Congrats%20%26%20recap">here</a>)</p>

<h3>Updates:</h3>

<p>Updated on 2022-02-19. I completely re-wrote the HTML and CSS using grid and flex to make the layout full responsive for all screen layouts. The most difficult part was figuring out how to get the images to scale responsively. I found that using a width of 7vmax allowed me to neatly display up to 11 cards per person on the screen. It keeps them readable on all screen sizes.

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
  <li>Stats. So. Many. Stats. It's only 12 stats, but still, it felt like a lot as I was adding them into the code.</li>
</ul>

<p>The following game mechanics are adjustable by changing the variables at the top of the .js file:</p>
<ul>  
  <li>Bet amounts: $1, $5, $10, and $20 are base</li>
  <li>Player starting funds: $100 base</li>
  <li>Number of Decks: 4 base. The game doesn't really shuffle, so much as pull a random card from the stack until the stack is empty. I may redo this at some point for a "real" shuffle.</li>
  <li>Dealer Draw To: When it's the dealer's turn they will continue to draw cards to this variable's setting. Standard is 17.</li>
</ul>

<h3>Roadmap</h3>
<p>Roadmap is a bit of a stretch, because it's just a basic Blackjack game, but I love Blackjack. I'll probably keep tweaking this for a while until I'm happy with it. Here are my future plans:</p>

<ul>
  <li>Split button - To be truly like a casino game, there needs to be a way to split the cards if the player draws two cards of the same value.</li>
  <li>Help - I want to be able to put a button up that displays a pop up with the game's current settings (dealer draw to, etc.) as well as basic help text</li>
  <li>&check; Mobile friendly - I will probably keep tweaking the layout so it is more responsive and looks good on a phone.</li>
  <li>Multiplayer - As I progress through my journey of learning JS/Node I will likely make this multi-player, because it'll be way more fun.</li>
</ul>

<p>As I've mentioned, this is my first javascript project and it's been years since I've really worked with HTML and CSS heavily so I'm pretty new. If you have helpful comments or additions they will be warmly welcomed.</p>
