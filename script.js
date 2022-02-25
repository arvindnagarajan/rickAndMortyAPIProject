const api_url = 'https://rickandmortyapi.com/api/character/?name=rick';
const api_url_1 = 'https://rickandmortyapi.com/api/character/?name=morty';

let imageRick = document.getElementById("image-1");
let imageMorty = document.getElementById("image-2");

let RickArray = [];
let MortyArray = [];

const fetchRickMorty = async() => {
    const response = await fetch(api_url);
    const data = await response.json();
    RickArray = data.results;

    const response1 = await fetch(api_url_1);
    const data1 = await response1.json();
    MortyArray = data1.results;

    console.log("Rick", RickArray);
    console.log("Morty", MortyArray);
    
}



const generateRandom = async () => {

    let randomCharacter = Math.floor(Math.random() * 20);

    console.log(RickArray[randomCharacter].name);
    
    imageRick.setAttribute("src", RickArray[randomCharacter].image);
    imageMorty.setAttribute("src", MortyArray[randomCharacter].image);

}

fetchRickMorty().then (generateRandom);

document.getElementById("generate").addEventListener("click", generateRandom);


// Work on adding headers and tiny paragraphs with nice hover animations
// Fetch all API characters and then randomize the indices when I generate
// Promise.all
// Firebase to host site