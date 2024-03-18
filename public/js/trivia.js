import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {app, auth} from './firebase.js';



async function showCharacterImage() {

    let api_url, character_api_url;

    $("#random-image").attr("src", "/img/loading.gif");

    // We do this to choose between a Rick or Morty character
    // We cannot directly query results for only these two characters
    let chosenCharacter = Math.round(Math.random());

    // If the number is a 0, it is a Rick character, else it is a Morty character
    chosenCharacter == 0 ? api_url = "https://rickandmortyapi.com/api/character/?name=rick" : api_url = "https://rickandmortyapi.com/api/character/?name=morty";

    // We fetch data from the API URL as above
    let characterResponse = await fetch(api_url);
    let characterInfo = await characterResponse.json();

    // Get the number of pages of results for that character
    let characterInfoPages = characterInfo.info.pages;

    // Get random number of page
    let randomPageNumber = Math.floor(Math.random() * characterInfoPages) + 1;

    // Set the new API URL according to random page number
    chosenCharacter == 0 ? character_api_url = `https://rickandmortyapi.com/api/character/?page=${randomPageNumber}&name=rick` : character_api_url = `https://rickandmortyapi.com/api/character/?page=${randomPageNumber}&name=morty`

    // Fetch data from API URL

    let finalCharacterResponse = await fetch(character_api_url);
    let finalCharacterInfo = await finalCharacterResponse.json();

    // Get a random result from the fetched page of results
    let randomResult = Math.floor(Math.random() * finalCharacterInfo.results.length);

    // Set the image of the random image to the received result
    let finalResult = finalCharacterInfo.results[randomResult];
    $("#random-image").attr("src", finalResult.image);



}


showCharacterImage();


// Timer Countdown

let startCount = 60;

setInterval(function() {

    if(startCount == 0) {
        $(".countdown").text("Completed!");
    }
    else {
        $(".countdown").text(startCount--);
    }

}, 1000);