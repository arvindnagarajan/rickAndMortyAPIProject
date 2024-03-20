import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
import {app, auth} from './firebase.js';

let characterAnswer;

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

    // Get total count of results for selected character
    let characterCount = characterInfo.info.count;

    // Choose random number from characterCount
    let randomCharacterCount = Math.floor(Math.random() * characterCount) + 1;

    // Get page number from randomCharacterCount
    // Each page only holds 20 results so we can perform division to get the page number
    let chosenPageNumber = Math.ceil(randomCharacterCount / 20);
    let characterIndex = randomCharacterCount % 20;

    // Set the new API URL according to random page number
    chosenCharacter == 0 ? character_api_url = `https://rickandmortyapi.com/api/character/?page=${chosenPageNumber}&name=rick` : character_api_url = `https://rickandmortyapi.com/api/character/?page=${chosenPageNumber}&name=morty`;

    

    // Fetch data from API URL

    await fetch(character_api_url)
    .then(response => response.json())
    .then((finalCharacterInfo) => {

        let finalResult = finalCharacterInfo.results[characterIndex];
        characterAnswer = finalCharacterInfo.results[characterIndex].name;
        console.log(characterAnswer);
        $("#random-image").attr("src", finalResult.image);
        
        startCountdown();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}


async function startCountdown() {

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

}


function checkAnswer(userAnswer, expectedAnswer) {

    if(userAnswer === expectedAnswer) {
        Swal.fire({
            title: "Correct Answer!",
            text: "Moving on to the next round!",
            icon: "success"
        });
    }
    else {
        Swal.fire({
            title: "Incorrect Answer!",
            text: "Better luck next round!",
            icon: "error"
        });
    }

}


$("#submitButton").click(function() {

    let userAnswer = $("#user-answer").val();
    checkAnswer(userAnswer, characterAnswer);
});



showCharacterImage();
