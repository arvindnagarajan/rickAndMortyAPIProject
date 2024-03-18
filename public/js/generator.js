let rickPage = 1, mortyPage = 1;
const listOfRicks = [], listOfMortys = [];

let rick_api_url = `https://rickandmortyapi.com/api/character/?page=${rickPage}&name=rick`;
let morty_api_url = `https://rickandmortyapi.com/api/character/?page=${mortyPage}&name=morty`;


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

    $("#image-rick").hide();

    let randomRick = Math.floor(Math.random() * listOfRicks.length);
    let randomMorty = Math.floor(Math.random() * listOfMortys.length);
    
    $("#heading-rick").html(listOfRicks[randomRick].name);
    $("#heading-morty").html(listOfMortys[randomMorty].name);

    $("#image-rick").attr("src", listOfRicks[randomRick].image);

    $("#image-morty").attr("src", listOfMortys[randomMorty].image);

    $("#image-rick").show();

    let rickTooltipText = `This version of Rick is located in ${listOfRicks[randomRick].location.name} and has appeared in ${listOfRicks[randomRick].episode.length} episode(s).`;
    $("#image-rick").attr("title", rickTooltipText);

    let mortyTooltipText = `This version of Morty is located in ${listOfMortys[randomMorty].location.name} and has appeared in ${listOfMortys[randomMorty].episode.length} episode(s).`;
    $("#image-morty").attr("title", mortyTooltipText);

}

getRicks();
getMortys();

$("#generate").click(function() {
    randomRickAndMorty();
})



document.addEventListener("keyup", function(event) {
    if (event.key === " ") {
      randomRickAndMorty();
    }
});

