
function getPreviewDetails(pokemonIndex, pokemonData) {
    document.getElementById('pokemonPreviewContent').classList.remove('d-none');
    hideProfileContainer();
    let pokemonPreview = pokemonDataLocal[pokemonIndex -1];
    let previewCardDetails = {
        number: pokemonData.id,
        name: capitalizeFirstLetter(pokemonData.name),
        image: pokemonData.sprites.other["official-artwork"].front_default,
        backgroundColor: pokemonData.types[0].type.name,
    };

    document.getElementById('pokemonPreviewContent').innerHTML += pokemonCardsTemplate(previewCardDetails, pokemonIndex);
    let types = renderPreviewTypes(pokemonIndex, previewCardDetails, pokemonPreview);
    document.getElementById(`previewTypesContainer${previewCardDetails.number}`).innerHTML = types;    
}

function renderPreviewTypes(pokemonIndex, previewCardDetails, pokemonPreview) {
    let previewTypesData = pokemonDataLocal[pokemonIndex -1];
    let previewTypes = '';
    
    document.getElementById(`previewTypesContainer${previewCardDetails.number}`).innerHTML = '';

    for (let previewTypeIndex = 0; previewTypeIndex < previewTypesData.types.length; previewTypeIndex++) {
        let previewCardTypes = capitalizeFirstLetter(previewTypesData.types[previewTypeIndex].type.name);

        previewTypes += `<span class="types ${pokemonPreview.types[previewTypeIndex].type.name}">${previewCardTypes}</span>`;
    }
    document.getElementById('morePokemonsButton').classList.remove('d-none');
    
    return previewTypes;
}
