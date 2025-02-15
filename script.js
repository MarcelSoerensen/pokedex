let pokemonLocalData = [];

function onloadFunc() {
    fetchPokemonDatabase();
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"

async function fetchPokemonDatabase() {
    let response = await fetch(BASE_URL);
    let fetchedDatabase = await response.json();
    fetchPokemonDetails(fetchedDatabase);
}

async function fetchPokemonDetails(fetchedDatabase) {
    for (let pokemonIndex = 0; pokemonIndex < fetchedDatabase.results.length; pokemonIndex++) {
        let pokemonData = fetchedDatabase.results[pokemonIndex];
        let detailResponse = await fetch(pokemonData.url);
        let detailData = await detailResponse.json();
        let types = [];
        for (let typeIndex = 0; typeIndex < detailData.types.length; typeIndex++) {
            let pokemonTypes = capitalizeFirstLetter(detailData.types[typeIndex].type.name);
            types.push(pokemonTypes);
        }
        pushPokemonDetailsToArray(pokemonData, detailData, pokemonIndex, types);
    }
}

function pushPokemonDetailsToArray(pokemonData, detailData, pokemonIndex, types) {
    let pokemonDetails = {
        uniqueId: `pokemon-types${pokemonIndex}`,
        number: pokemonIndex + 1,
        name: capitalizeFirstLetter(pokemonData.name),
        image: detailData.sprites.other["official-artwork"].front_default,
        backgroundColor: getTypeBackgroundColor(detailData.types[0].type.name.toLowerCase()),
        types: types
    };
    pokemonLocalData.push(pokemonDetails); 
    defineDetailDataRefs(pokemonIndex);
}

function defineDetailDataRefs(pokemonIndex) {
    let pokemonName = pokemonLocalData[pokemonIndex].name;
    let pokemonImg = pokemonLocalData[pokemonIndex].image;
    let pokemonNumber = pokemonLocalData[pokemonIndex].number;
    let uniquePokemonId = pokemonLocalData[pokemonIndex].uniqueId;
    let typeBackgroundColor = pokemonLocalData[pokemonIndex].backgroundColor;
    let pokemonType = pokemonLocalData[pokemonIndex].types;
    pokemonContainer.innerHTML += pokemonCardsTemplate(pokemonName, pokemonNumber, pokemonImg, uniquePokemonId, typeBackgroundColor)
    renderPokemonTypes(uniquePokemonId, pokemonType)
    
}

function pokemonCardsTemplate(pokemonName, pokemonNumber, pokemonImg, uniquePokemonId, cardBackgroundColor) {
    return /*html*/`
        <div  class="card" style="width: 18rem; background-color: ${cardBackgroundColor};">
            <div class="card-body card-top">
                <h3 class="card-text">${pokemonNumber}... ${pokemonName}</h3>
            </div>
            <img class="pokemon-img" src="${pokemonImg}" alt="pokemon.name">
            <div class="card-body card-bottom" id="${uniquePokemonId}"></div>
        </div>     
    `;
}  

function renderPokemonTypes(uniquePokemonId, pokemonTypes) {
    document.getElementById(uniquePokemonId).innerHTML = '';
    for (let i = 0; i < pokemonTypes.length; i++) {
        let pokemonType = pokemonTypes[i];
        let pokemonTypeColor = getTypeBackgroundColor(pokemonType.toLowerCase());
        document.getElementById(uniquePokemonId).innerHTML += /*html*/`
            <span style="background-color: ${pokemonTypeColor};" class="types">${pokemonType}</span>
        `;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypeBackgroundColor(pokemonTypes) { 
    switch (pokemonTypes) {
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

function filterPokemon() {
    let searchInput = document.getElementById('pokemonSearch').value;
    let filteredPokemon = pokemonLocalData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
    pokemonContainer.innerHTML = '';
    for (let filteredIndex = 0; filteredIndex < filteredPokemon.length; filteredIndex++) {
        let pokemon = filteredPokemon[filteredIndex];
        pokemonContainer.innerHTML += pokemonCardsTemplate(pokemon.name, pokemon.number, pokemon.image, pokemon.uniqueId, pokemon.backgroundColor);
        renderPokemonTypes(pokemon.uniqueId, pokemon.types);
    }
}
    
   

