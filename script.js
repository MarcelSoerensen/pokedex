let pokemonDataLocal = [];

let loadAmount = 2;
let pokemonApiLimit = 20;
let pokemonApiOffset = 0;

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
    fetchPokemonDetailData(fetchedPokemonData);   
}

async function fetchPokemonDetailData(fetchedPokemonData) {
    let pokemonAmount = fetchedPokemonData.results.length;
    for (let pokemonIndex = 0; pokemonIndex < pokemonAmount; pokemonIndex++) {
        let pokemonInfo = fetchedPokemonData.results[pokemonIndex];
        let pokemonResponse = await fetch(pokemonInfo.url);
        let pokemonData = await pokemonResponse.json();
        pokemonDataLocal.push(pokemonData);
    }

    waitForFullPokemonData(pokemonAmount);
}

function waitForFullPokemonData(pokemonAmount) {
    let pokemonAmountStart = 0;
    for (let pokemonIndex = 0; pokemonIndex < pokemonAmount; pokemonIndex++) {
        pokemonAmountStart++;
        renderPreviewDetails(pokemonIndex);
        if (pokemonAmountStart === pokemonAmount) {
            console.log(pokemonDataLocal);
            hideLoadingSpinner();
        }
    }

}

function renderPreviewDetails(pokemonIndex) {
    document.getElementById('pokemonPreviewContainer').classList.remove('d-none');
    let pokemonPreview = pokemonDataLocal[pokemonIndex + pokemonApiOffset];
    let previewCardDetails = {
        number: pokemonPreview.id,
        name: capitalizeFirstLetter(pokemonPreview.name),
        image: pokemonPreview.sprites.other["official-artwork"].front_default,
        backgroundColor: pokemonPreview.types[0].type.name,
    };
console.log(pokemonPreview);

    document.getElementById('pokemonPreviewContainer').innerHTML += pokemonCardsTemplate(previewCardDetails);
    let types = renderTypes(pokemonIndex, previewCardDetails, pokemonPreview);
    document.getElementById(`typesContainer${previewCardDetails.number}`).innerHTML = types;
}

function renderTypes(pokemonIndex, previewCardDetails, pokemonPreview) {
    let previewTypesData = pokemonDataLocal[pokemonIndex + pokemonApiOffset];
    let types = '';
    
    document.getElementById(`typesContainer${previewCardDetails.number}`).innerHTML = '';

    for (let previewTypeIndex = 0; previewTypeIndex < previewTypesData.types.length; previewTypeIndex++) {
        let previewCardTypes = capitalizeFirstLetter(previewTypesData.types[previewTypeIndex].type.name);

        types += `<span class="types ${pokemonPreview.types[previewTypeIndex].type.name}">${previewCardTypes}</span>`;
    }
    document.getElementById('morePokemonsButton').classList.remove('d-none');
    
    return types;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function pokemonCardsTemplate(previewCardDetails) {
    return /*html*/`
        <div onclick="" class="card card-with-hover ${previewCardDetails.backgroundColor}" style="width: 18rem;">
            <div class="card-body card-top">
                <h3 class="card-text">${previewCardDetails.number}...${previewCardDetails.name}</h3>
            </div>
            <img class="pokemon-img" src="${previewCardDetails.image}" alt="pokemon.name">
            <div id="typesContainer${previewCardDetails.number}" class="card-body card-bottom">
            <div id="previewTypes"></div>
            </div>
        </div>     
    `;
} 

function hidePreviewContainer() {
    document.getElementById('pokemonPreviewContainer').classList.add('d-none');
    document.getElementById('morePokemonsButton').classList.add('d-none');
}

function filterPreviewCards() {
    let searchInput = document.getElementById('pokemonSearch').value.toLowerCase();
    let pokemonPreviewContainer = document.getElementById('pokemonPreviewContainer');

    pokemonPreviewContainer.innerHTML = '';
    for (let filteredIndex = 0; filteredIndex < pokemonDataLocal.length; filteredIndex++) {
        let pokemon = pokemonDataLocal[filteredIndex];
        if (pokemon.name.toLowerCase().includes(searchInput)) {
            renderPreviewDetails(filteredIndex);
        }
    }
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

function loadMorePreviewCards() {
    hidePreviewContainer();
    displayLoadingSpinner();
    pokemonApiOffset += pokemonApiLimit;
    GENERATED_URL = createPokemonApiUrl(pokemonApiLimit, pokemonApiOffset);
    fetchPokemonData();
}

function hidePreviewContainer() {
    document.getElementById('pokemonPreviewContainer').classList.add('d-none');
    document.getElementById('morePokemonsButton').classList.add('d-none');
}
