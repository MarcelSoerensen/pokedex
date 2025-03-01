let pokemonDataLocal = [];

function initializePage() {
    displayLoadingSpinner();
    fetchPokemonData(); 
}

async function fetchPokemonData() {
    hidePreviewContainer();
    let pokemonAmount = pokemonDataLocal.length +1;
    for (let pokemonIndex = pokemonAmount; pokemonIndex < pokemonAmount +20; pokemonIndex++) {
            let pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
            let pokemonData = await pokemonResponse.json();
            pokemonDataLocal.push(pokemonData);
        getPreviewDetails(pokemonIndex, pokemonData);
    }
    hideLoadingSpinner();
    showPokemonPreview();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterPreviewCards() {
    let searchInput = document.getElementById('pokemonSearch').value.toLowerCase();
    let pokemonPreviewContent = document.getElementById('pokemonPreviewContent');
    pokemonPreviewContent.innerHTML = '';
    for (let filteredIndex = 0; filteredIndex < pokemonDataLocal.length; filteredIndex++) {
        let pokemonData = pokemonDataLocal[filteredIndex];
        if (searchInput === '' || pokemonData.name.toLowerCase().includes(searchInput)) {
            getPreviewDetails(filteredIndex +1, pokemonData);
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
    fetchPokemonData();   
}

function overlayPrevention(event) {
    event.stopPropagation();
}