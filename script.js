
function onloadFunc() {
    fetchPokemonDatabase();
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"

async function fetchPokemonDatabase() {
    let response = await fetch(BASE_URL);
    let data = await response.json();
    fetchPokemonDetails(data);
}

async function fetchPokemonDetails(data) {
    for (let pokemonIndex = 0; pokemonIndex < data.results.length; pokemonIndex++) {
        let pokemon = data.results[pokemonIndex];
        let detailResponse = await fetch(pokemon.url);
        let detailData = await detailResponse.json();
        defineDetailDataRefs(pokemon, detailData, pokemonIndex);
    }
}

function defineDetailDataRefs(pokemon, detailData, pokemonIndex) {
    let pokemonName = capitalizeFirstLetter(pokemon.name);
    let pokemonImg = detailData.sprites.other["official-artwork"].front_default;
    let pokemonNumber = pokemonIndex + 1;
    let uniquePokemonId = `pokemon-types${pokemonIndex}`;
    let cardBackgroundColor = getTypeBackgroundColor(detailData.types[0].type.name.toLowerCase());
    pokemonCardsTemplate(pokemonName, pokemonNumber, pokemonImg ,uniquePokemonId, cardBackgroundColor)
    for (let typeIndex = 0; typeIndex < detailData.types.length; typeIndex++) {
        let pokemonTypes = capitalizeFirstLetter(detailData.types[typeIndex].type.name);
        pokemonTypesTemplate(uniquePokemonId, pokemonTypes);
    }
}

function pokemonCardsTemplate(pokemonName, pokemonNumber, pokemonImg, uniquePokemonId, cardBackgroundColor) {
    pokemonContainer.innerHTML += /*html*/`
        <div  class="card" style="width: 18rem; background-color: ${cardBackgroundColor};">
            <div class="card-body card-top">
                <h3 class="card-text">${pokemonNumber}...${pokemonName}</h3>
            </div>
            <img class="pokemon-img" src="${pokemonImg}" alt="pokemon.name">
            <div class="card-body card-bottom" id="${uniquePokemonId}"></div>
        </div>     
    `;
}  

function pokemonTypesTemplate(uniquePokemonId, pokemonTypes) {
    let pokemonTypeColor = getTypeBackgroundColor(pokemonTypes.toLowerCase());
    document.getElementById(uniquePokemonId).innerHTML += /*html*/`
        <span style="background-color: ${pokemonTypeColor};" class="types">${pokemonTypes}</span>
    `   
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypeBackgroundColor(pokemonType) { 
    switch (pokemonType) {
        case 'fire':
            return '#ffb07c';
        case 'water':
            return '#7fbfff'; 
        case 'grass':
            return '#a8e7a0';
        case 'electric':
            return '#f8e47f'; 
        case 'psychic':
            return '#f8a4e1'; 
        case 'bug':
            return '#b0e34a';
        case 'normal':
            return '#d1d1d1';
        case 'poison':
            return '#d1a7f5';
        case 'ground':
            return '#e0b28d';
        case 'fairy':
            return '#f7c4e6';
        case 'fighting':
            return '#ff9a6a'; 
        case 'rock':
            return '#bfa57f'; 
        case 'ghost':
            return '#c7a9f0'; 
        case 'ice':
            return '#a8d8f3'; 
        case 'dragon':
            return '#a1a6f7'; 
        case 'dark':
            return '#8d8d8d'; 
        case 'steel':
            return '#b4b8b6'; 
        case 'flying':
            return '#a8c8f5'; 
        default:
            return '#e0e0e0';
    }
}
    
   

