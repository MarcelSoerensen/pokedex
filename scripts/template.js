

function pokemonProfileContainerTemplate(previewCardDetails, types) {
    return /*html*/`
    <div class="card important-width" style="width: 18rem; background-color: ${previewCardDetails.backgroundColor};">
        <div class="card-body card-top">
            <h3 class="card-text">${previewCardDetails.number}... ${previewCardDetails.name}</h3>
        </div>
        <img class="pokemon-img" src="${previewCardDetails.image}" alt="${previewCardDetails.name}">
        <div class="card-body card-bottom">
            <div>${types}</div>
        </div>
        <div>${previewCardDetails.evolution}</div>
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