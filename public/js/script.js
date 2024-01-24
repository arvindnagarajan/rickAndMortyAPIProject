
// const loadingImage = document.getElementById("loading-image");

const rickImage = document.getElementById("image-rick");
const tooltipRick = document.getElementById("tooltip-rick");

const mortyName = document.getElementById("heading-morty");
const mortyImage = document.getElementById("image-morty");

const generateButton = document.getElementById("generate");

let rickPage = 1;
let mortyPage = 1;

let rick_api_url = `https://rickandmortyapi.com/api/character/?page=${rickPage}&name=rick`;
let morty_api_url = `https://rickandmortyapi.com/api/character/?page=${mortyPage}&name=morty`;

const listOfRicks = [];
const listOfMortys = [];

async function getRicks() {

    try {
        let ricksResponse = await fetch(rick_api_url);
        let ricksData = await ricksResponse.json();
        let rickPageCount = ricksData.info.pages;

        while(rickPage <= rickPageCount) {

            let ricksResponse = await fetch(rick_api_url);
            let ricksData = await ricksResponse.json();

            for (let rick in ricksData.results) {
                listOfRicks.push(ricksData.results[rick]);
            }

            rickPage++;
            rick_api_url = `https://rickandmortyapi.com/api/character/?page=${rickPage}&name=rick`;
        }
    }
    catch(error) {
        console.log("Error: " + error);
    }
}

async function getMortys() {

    try {
        let mortysResponse = await fetch(morty_api_url);
        let mortysData = await mortysResponse.json();
        let mortyPageCount = mortysData.info.pages;

        while(mortyPage <= mortyPageCount) {

            let mortysResponse = await fetch(morty_api_url);
            let mortysData = await mortysResponse.json();

            for(let morty in mortysData.results) {
                listOfMortys.push(mortysData.results[morty]);
            }

            mortyPage++;
            morty_api_url = `https://rickandmortyapi.com/api/character/?page=${mortyPage}&name=morty`;

        }
    }
    catch(error) {
        console.log("Error: " + error);
    }

}

function randomRickAndMorty() {

    // loadingImage.style.display = "block";
    rickImage.style.display = "none";

    let randomRick = Math.floor(Math.random() * listOfRicks.length);
    let randomMorty = Math.floor(Math.random() * listOfMortys.length);
    
    $("#heading-rick").html(listOfRicks[randomRick].name);
    $("#heading-morty").html(listOfMortys[randomMorty].name);

    rickImage.src = listOfRicks[randomRick].image;

    mortyImage.src = listOfMortys[randomMorty].image;

    // loadingImage.style.display = "none";
    rickImage.style.display = "block";

    let rickTooltipText = `This version of Rick is located in ${listOfRicks[randomRick].location.name} and has appeared in ${listOfRicks[randomRick].episode.length} episode(s).`;
    rickImage.setAttribute("title", rickTooltipText);

    let mortyTooltipText = `This version of Morty is located in ${listOfMortys[randomMorty].location.name} and has appeared in ${listOfMortys[randomMorty].episode.length} episode(s).`;
    mortyImage.setAttribute("title", mortyTooltipText);


}

getRicks();
getMortys();

generateButton.addEventListener("click", randomRickAndMorty);


let startCount = 60;

setInterval(function() {

    if(startCount == 0) {
        $("#countdown").text("Completed!");
    }
    else {
        $("#countdown").text(startCount--);
    }

}, 1000);

document.addEventListener("keyup", function(event) {
    if (event.key === " ") {
      randomRickAndMorty();
    }
});

