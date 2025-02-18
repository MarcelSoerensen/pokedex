let previewPokemonCardsData = [];
let profilePokemonCardsData = [];
let pokemonApiOffset = 0;
let pokemonApiLimit = 50;
let currentPokemonIndex = 1;

function initializePage() {
    displayLoadingSpinner();
    fetchPokemonData(); 
}

let GENERATED_URL = createPokemonApiUrl(pokemonApiLimit, pokemonApiOffset);

function createPokemonApiUrl(pokemonApiLimit, pokemonApiOffset) {
    let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonApiLimit}&offset=${pokemonApiOffset}`;
    return BASE_URL;
}
    
async function fetchPokemonData() {
    let response = await fetch(GENERATED_URL);
    let fetchedPokemonData = await response.json();
    fetchPokemonPreviewData(fetchedPokemonData);
}


//fetch & render Pokemon Preview Cards
async function fetchPokemonPreviewData(fetchedPokemonData) {
    let previewDataIndex = previewPokemonCardsData.length;
    for (let pokemonIndex = 0; pokemonIndex < fetchedPokemonData.results.length; pokemonIndex++) {
        let pokemonInfo = fetchedPokemonData.results[pokemonIndex];
        let previewResponse = await fetch(pokemonInfo.url);
        let previewData = await previewResponse.json();
        let types = getPokemonTypesForPreview(previewData);
        addPreviewDataToArray(pokemonInfo, previewData, pokemonIndex, types);
        console.log(previewData);
    }
    renderPreviewCards(previewDataIndex);
    hideLoadingSpinner();
    document.getElementById('pokemonPreviewContainer').classList.remove('d-none');
}

function getPokemonTypesForPreview(previewData) {
    let previewTypes = [];
    for (let previewTypeIndex = 0; previewTypeIndex < previewData.types.length; previewTypeIndex++) {
        let previewCardTypes = capitalizeFirstLetter(previewData.types[previewTypeIndex].type.name);
        previewTypes.push(previewCardTypes);
    }
    return previewTypes; 
}

function addPreviewDataToArray(pokemonInfo, previewData, pokemonIndex, types) {
    let pokemonDetailsFromAPI = {
        uniqueId: `pokemon-types${pokemonIndex + pokemonApiOffset}`,
        number: currentPokemonIndex++,
        name: capitalizeFirstLetter(pokemonInfo.name),
        image: previewData.sprites.other["official-artwork"].front_default,
        backgroundColor: getTypeBackgroundColor(previewData.types[0].type.name.toLowerCase()),
        types: types
    };
    previewPokemonCardsData.push(pokemonDetailsFromAPI);
}

function renderPreviewCards(previewDataIndex) {
    for (let index = previewDataIndex; index < previewPokemonCardsData.length; index++) {
        renderPreviewCard(previewPokemonCardsData[index]);  
    }
}

function renderPreviewCard(pokemonInfo) {
    let previewCardDetails = {
        uniqueId: pokemonInfo.uniqueId,
        number: pokemonInfo.number,
        name: pokemonInfo.name,
        image: pokemonInfo.image,
        backgroundColor: pokemonInfo.backgroundColor,
        types: pokemonInfo.types   
    }
    pokemonPreviewContainer.innerHTML += pokemonCardsTemplate(previewCardDetails);
    renderPreviewCardTypes(previewCardDetails);
}

function renderPreviewCardTypes(previewCardDetails) {
    let typesContainer = document.getElementById(previewCardDetails.uniqueId);
   
    for (let previewTypeIndex = 0; previewTypeIndex < previewCardDetails.types.length; previewTypeIndex++) {
        let pokemonType = previewCardDetails.types[previewTypeIndex];
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

function getTypeBackgroundColor(type) { 
    switch (type) {
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

function loadMorePreviewCards() {
    document.getElementById('pokemonPreviewContainer').classList.add('d-none');
    displayLoadingSpinner();
    pokemonApiOffset += pokemonApiLimit;
    GENERATED_URL = createPokemonApiUrl(pokemonApiLimit, pokemonApiOffset);
    initializePage();
}

function filterPreviewCards() {
    let searchInput = document.getElementById('pokemonSearch').value;
    let filteredPokemon = previewPokemonCardsData.filter(previewCardDetails => previewCardDetails.name.toLowerCase().includes(searchInput));
    let pokemonPreviewContainer = document.getElementById('pokemonPreviewContainer');
    
    pokemonPreviewContainer.innerHTML = '';
    for (let filteredIndex = 0; filteredIndex < filteredPokemon.length; filteredIndex++) {
        let previewCardDetails = filteredPokemon[filteredIndex];
        pokemonPreviewContainer.innerHTML += pokemonCardsTemplate(previewCardDetails);
        renderPreviewCardTypes(previewCardDetails);
    }
}
 
function getPreviewCardDetails(uniqueId) {
    for (let pokemonIndex = 0; pokemonIndex < previewPokemonCardsData.length; pokemonIndex++) {
        const previewCardDetails = previewPokemonCardsData[pokemonIndex];

        if (previewCardDetails.uniqueId === uniqueId) {
            getTypesForPreviewDetails(previewCardDetails);
        }
    }
}

function getTypesForPreviewDetails(previewCardDetails) {
    let types = '';
    for (let previewTypeIndex = 0; previewTypeIndex < previewCardDetails.types.length; previewTypeIndex++) {
        let type = previewCardDetails.types[previewTypeIndex];
        let typeColor = getTypeBackgroundColor(type.toLowerCase());
        types += `<span style="background-color: ${typeColor};" class="types">${type}</span>`;
    }
    document.getElementById('pokemonDetailsCard').innerHTML = pokemonDetailsCardTemplate(previewCardDetails, types);
    hidePreviewContainer();
}

function toggleMorePokemonsButtonVisibility() {
    let pokemonSearchInput = document.getElementById('pokemonSearch');
    let morePokemonsButton = document.getElementById('morePokemonsButton');

    if (pokemonSearchInput.value === '') {
        morePokemonsButton.classList.remove('d-none');
    } else {
        morePokemonsButton.classList.add('d-none');
    }
}

function hidePreviewContainer() {
    document.getElementById('pokemonPreviewContainer').classList.add('d-none');
    document.getElementById('morePokemonsButton').classList.add('d-none');
}
