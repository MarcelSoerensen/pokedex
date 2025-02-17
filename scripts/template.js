function pokemonCardsTemplate(pokemonDetailsFromArray) {
    return /*html*/`
        <div onclick="showPokemonDetailCard([
            '${pokemonDetailsFromArray.number}',
            '${pokemonDetailsFromArray.name}',
            '${pokemonDetailsFromArray.image}',
            '${pokemonDetailsFromArray.backgroundColor}',
            '${pokemonDetailsFromArray.uniqueId}',
            ]), displayNone()"
            class="card" style="width: 18rem; background-color: ${pokemonDetailsFromArray.backgroundColor};">
            <div class="card-body card-top">
                <h3 class="card-text">${pokemonDetailsFromArray.number}...${pokemonDetailsFromArray.name}</h3>
            </div>
            <img class="pokemon-img" src="${pokemonDetailsFromArray.image}" alt="pokemon.name">
            <div class="card-body card-bottom" id="${pokemonDetailsFromArray.uniqueId}"></div>
        </div>     
    `;
}  

function pokemonDetailCardsTemplate(detailsFromArray) {
    return /*html*/`
         <div class="card important-width" style="width: 18rem; background-color: ${detailsFromArray[3]};">
            <div class="card-body card-top">
                <h3 class="card-text">${detailsFromArray[0]}... ${detailsFromArray[1]}</h3>
            </div>
            <img class="pokemon-img" src="${detailsFromArray[2]}" alt="pokemon.name">
            <div class="card-body card-bottom" id="${detailsFromArray[4]}"></div>
        </div>     
    `;
}

function loadingSpinnerTemplate() {
    return /*html*/`
        <div class="dot fire" id="dot0"></div>
        <div class="dot water" id="dot1"></div>
        <div class="dot electric" id="dot2"></div>
        <div class="dot grass" id="dot3"></div>
        <div class="dot psychic" id="dot4"></div>
        <div class="dot fighting" id="dot5"></div>
    `;
}