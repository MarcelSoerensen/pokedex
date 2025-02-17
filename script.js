let pokemonLocalData = [];
let pokemonOffset = 0;
let pokemonAmount = 50;
let currentPokemonNumber = 1;

function onloadFunc() {
    showLoadingSpinner();
    fetchPokemonDatabase(); 
}

let GENERATED_URL = generatePokemonUrl(pokemonAmount, pokemonOffset);

function generatePokemonUrl(pokemonAmount, pokemonOffset) {
    let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonAmount}&offset=${pokemonOffset}`;
    return BASE_URL;
}
    
async function fetchPokemonDatabase() {
    let response = await fetch(GENERATED_URL);
    let fetchedDatabase = await response.json();
    fetchPokemonDetails(fetchedDatabase);
}

async function fetchPokemonDetails(fetchedDatabase) {
    let arrayIndex = pokemonLocalData.length;
        for (let pokemonIndex = 0; pokemonIndex < fetchedDatabase.results.length; pokemonIndex++) {
            let pokemonData = fetchedDatabase.results[pokemonIndex];
            let detailResponse = await fetch(pokemonData.url);
            let detailData = await detailResponse.json();
            let types = getPokemonTypes(detailData);
            pushPokemonDetailsToArray(pokemonData, detailData, pokemonIndex, types);
        }
    renderPokemonCardsFromArray(arrayIndex);
    hideLoadingSpinner();
    document.getElementById('pokemonContainer').classList.remove('d-none');
}

function getPokemonTypes(detailData) {
    let types = [];
        for (let typeIndex = 0; typeIndex < detailData.types.length; typeIndex++) {
            let pokemonTypes = capitalizeFirstLetter(detailData.types[typeIndex].type.name);
            types.push(pokemonTypes);
        }
    return types; 
}

function pushPokemonDetailsToArray(pokemonData, detailData, pokemonIndex, types) {
    let pokemonDetailsFromAPI = {
        uniqueId: `pokemon-types${pokemonIndex + pokemonOffset}`,
        number: currentPokemonNumber++,
        name: capitalizeFirstLetter(pokemonData.name),
        image: detailData.sprites.other["official-artwork"].front_default,
        backgroundColor: getTypeBackgroundColor(detailData.types[0].type.name.toLowerCase()),
        types: types
    };
    pokemonLocalData.push(pokemonDetailsFromAPI);
}

function renderPokemonCardsFromArray(arrayIndex) {
    for (let startIndex = arrayIndex; startIndex< pokemonLocalData.length; startIndex++) {
        defineDetailDataRefs(pokemonLocalData[startIndex]);  
    }
}

function defineDetailDataRefs(pokemonDetails) {
    let pokemonDetailsFromArray = {
        uniqueId: pokemonDetails.uniqueId,
        number: pokemonDetails.number,
        name: pokemonDetails.name,
        image: pokemonDetails.image,
        backgroundColor: pokemonDetails.backgroundColor,
        types: pokemonDetails.types   
    }
    pokemonContainer.innerHTML += pokemonCardsTemplate(pokemonDetailsFromArray);
    renderPokemonTypes(pokemonDetailsFromArray);
}

function renderPokemonTypes(pokemonDetailsFromArray) {
    let typesContainer = document.getElementById(pokemonDetailsFromArray.uniqueId);
   
    for (let typeIndex = 0; typeIndex < pokemonDetailsFromArray.types.length; typeIndex++) {
        let pokemonType = pokemonDetailsFromArray.types[typeIndex];
        let pokemonTypeColor = getTypeBackgroundColor(pokemonType.toLowerCase());
        typesContainer.innerHTML += /*html*/`
            <span style="background-color: ${pokemonTypeColor};" class="types">${pokemonType}</span>
        `;
    }
    document.getElementById('morePokemonsButton').classList.remove('d-none');
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
    let filteredPokemon = pokemonLocalData.filter(pokemonDetailsFromArray => pokemonDetailsFromArray.name.toLowerCase().includes(searchInput));
    pokemonContainer.innerHTML = '';
    for (let filteredIndex = 0; filteredIndex < filteredPokemon.length; filteredIndex++) {
        let pokemonDetailsFromArray = filteredPokemon[filteredIndex];
        pokemonContainer.innerHTML += pokemonCardsTemplate(pokemonDetailsFromArray);
        renderPokemonTypes(pokemonDetailsFromArray);
    }
}

function loadMorePokemons() {
    document.getElementById('pokemonContainer').classList.add('d-none');
    showLoadingSpinner();
    pokemonOffset += pokemonAmount;
    GENERATED_URL = generatePokemonUrl(pokemonAmount, pokemonOffset);
    onloadFunc();
}
 
function toggleButtonVisibility() {
    let pokemonSearchInput = document.getElementById('pokemonSearch');
    let morePokemonsButton = document.getElementById('morePokemonsButton');

    if (pokemonSearchInput.value === '') {
        morePokemonsButton.classList.remove('d-none');
    } else {
        morePokemonsButton.classList.add('d-none');
    }
}

function showPokemonDetailCard(detailsFromArray) {
    pokemonDetailsCard.innerHTML = pokemonDetailCardsTemplate(detailsFromArray);
    console.log(detailsFromArray[0]);
    console.log(detailsFromArray[4]);
    //document.getElementById('pokemonDetailsCard').innerHTML += pokemonDetailCardsTemplate();
    
}

function displayNone() {
    document.getElementById('pokemonContainer').classList.add('d-none');
    document.getElementById('morePokemonsButton').classList.add('d-none');
}

