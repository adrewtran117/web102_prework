/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i]; // Get the current game object
        const newGame = document.createElement("div")
        newGame.classList.add("game-card");
        newGame.innerHTML = `
        <h1>${game.name}</h1>
        <h2>${game.description}</h2>
        <img class="game-img" src="${game.img}">  </img>
        `
        gamesContainer.appendChild(newGame);
      }
    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (total, game) => {
    return total + game.backers;
  }, 0);

console.log(totalContributions); // Add this line to check the value


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
<h1>${totalContributions.toLocaleString('en-US')}</h1>
`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalPledged = GAMES_JSON.reduce( (total2, game) => {
    return total2 + game.pledged;
  }, 0);

  raisedCard.innerHTML = `
<h1>$${totalPledged.toLocaleString('en-US')}</h1>
`

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");


const totalGames = GAMES_JSON.reduce((total) => {
    return total + 1;
  }, 0);

  gamesCard.innerHTML = `
<h1>${totalGames.toLocaleString('en-US')}</h1>
`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not met their goal
    const unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}
// Call filterUnfundedOnly to initially display unfunded games
filterUnfundedOnly();


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(fundedGames);
    // use the function we previously created to add unfunded games to the DOM
}

filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    const allGames = GAMES_JSON.filter((game) => {
        return game.pledged > -1;
    });

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(allGames);
    // add all games from the JSON data to the DOM
}
showAllGames()

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter((game) => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator

const totalGamesString = `There are ${totalGames} total games!`
const unfundedGamesString = (unfundedGamesCount === 0) ? "There are no unfunded games." : (unfundedGamesCount === 1) ? "There is 1 unfunded game." : `There are ${unfundedGamesCount} unfunded games.`;
const extra = `We need your help to fund the rest!`

const finalGamesString = totalGamesString + " " + unfundedGamesString + " " + extra

// Create a new DOM element containing the template string
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.textContent = finalGamesString;

// Append the element to the description container
const description = document.getElementById("description-container");
descriptionContainer.appendChild(unfundedGamesElement);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [one, two] = [sortedGames[0], sortedGames[1]];

console.log(one)
console.log(two)

let element_one = one.name
let element_two = two.name

firstGameContainer.append(element_one)
secondGameContainer.append(element_two)


// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item