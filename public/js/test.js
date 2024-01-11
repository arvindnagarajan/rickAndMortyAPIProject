import {app, auth} from './firebase.js';

const rick_api_url = 'https://rickandmortyapi.com/api/character/?page=1&name=rick';
const morty_api_url = 'https://rickandmortyapi.com/api/character/?page=1&name=morty';

let imageRick = document.getElementById("image-1");
let imageMorty = document.getElementById("image-2");
let rickName = document.getElementById("heading-rick");
let mortyName = document.getElementById("heading-morty");
const generateButton = document.getElementById("generate");


let RicksArrayURL = [];
let MortysArrayURL = [];
let RickArray = [];
let MortyArray = [];
let rickTotalCount, mortyTotalCount;


// This function below we are gathering all the URLs for the Ricks and Mortys so later we can use Promise.all and use all of them.

const fetchRickMortyURLs = async() => {
    let rickResponse = await fetch(rick_api_url);
    let rickData = await rickResponse.json();
    rickTotalCount = rickData.info.count;

    let mortyResponse = await fetch(morty_api_url);
    let mortyData = await mortyResponse.json();
    mortyTotalCount = rickData.info.count;

    RicksArrayURL.push(rick_api_url);
    MortysArrayURL.push(morty_api_url);

    while(rickData.info.next != null) {
        RicksArrayURL.push(rickData.info.next);
        rickResponse = await fetch(rickData.info.next);
        rickData = await rickResponse.json();
    }

    while(mortyData.info.next != null) {
        MortysArrayURL.push(mortyData.info.next);
        mortyResponse = await fetch(mortyData.info.next);
        mortyData = await mortyResponse.json();
    }
    
}


const pushRicks = (pageResult) => {
    for (let i = 0; i < pageResult.results.length; i++) {
        RickArray.push(pageResult.results[i]);
    }
}


// Run a for loop through the number of pages for Rick and Morty individually and add on their results to their respective arrays.

const fetchRickMorty = async() => {

    Promise.all(RicksArrayURL.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(result => result.json())))
    .then(data => {
        data.forEach(pageResult => pushRicks(pageResult))
        // console.log(RickArray[0]);
    })
    .catch(error => {
        console.log("Error: " + error);
    })
}

const consoleLogRick = async() => {

    try {
        await fetchRickMorty();
    }
    catch(error) {
        console.log("Error: " + error);
    }
    
}

async function consoleLogMorty() {
    try {
        await fetchRickMorty();
        console.log(MortyArray);
    }
    catch(error) {
        console.log("Error: " + error);
    }
}


const generateRandom = async () => {

    let randomCharacterRick = Math.floor(Math.random() * rickTotalCount); //rickTotalCount
    let randomCharacterMorty = Math.floor(Math.random() * mortyTotalCount); //mortyTotalCount

    console.log(RickArray[randomCharacterRick].name);
    console.log(MortyArray[randomCharacterMorty].name);
    
    imageRick.setAttribute("src", RickArray[randomCharacterRick].image);
    imageMorty.setAttribute("src", MortyArray[randomCharacterMorty].image);
    rickName.innerHTML = RickArray[randomCharacterRick].name;
    mortyName.innerHTML = MortyArray[randomCharacterMorty].name;

}


fetchRickMortyURLs().then(consoleLogRick);


// Work on adding headers for each character - DONE
// Add hover effects with brief descriptions about character - DONE
// Fetch all API characters and then randomize the indices when I generate - DONE
// Firebase to host site


// Current application improvements
// 1. Refresh on APIs and asynchronous code in JS - DONE
// 2. Add hover effects with descriptions on Rick and Morty images with tooltip - DONE
// 3. Learn to use promises and Promise.all to retrieve all records of Rick and Morty across several pages - DONE
// 4. Consider using Firebase for this project

// New application improvements - Rick and Morty game
// 1. Using this same API, develop a game and host it on Github pages
// 2. Each player has 3 lives which can be considered to be a global variable
// 3. There will be a random image of a Rick or Morty displayed, and the user will have 10-15 seconds with an on screen timer to guess it
// 4. If they guess wrongly, they lose a life and if they get it right, they move on to the next level.

