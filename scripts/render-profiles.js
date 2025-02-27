
function renderProfileDetails(pokemonIndex) {
    document.getElementById('pokemonProfileContent').classList.remove('d-none');
    let pokemonProfile = pokemonDataLocal[pokemonIndex];
    let profileCardDetails = {
        number: pokemonProfile.id,
        name: capitalizeFirstLetter(pokemonProfile.name),
        image: pokemonProfile.sprites.other["official-artwork"].front_default,
        backgroundColor: pokemonProfile.types[0].type.name,
        height: pokemonProfile.height,
        weight: pokemonProfile.weight,
        experience: pokemonProfile.base_experience,
    };

    document.getElementById('pokemonProfileContent').innerHTML += profileCardTemplate(profileCardDetails);
    let types = renderProfileTypes(pokemonIndex, profileCardDetails, pokemonProfile);
    document.getElementById(`profileTypesContainer${profileCardDetails.number}`).innerHTML = types;
    hidePreviewContainer(); 
}


function renderProfileTypes(pokemonIndex, profileCardDetails, pokemonProfile) {
    let profileTypesData = pokemonDataLocal[pokemonIndex];
    let profileTypes = '';
    
    document.getElementById(`profileTypesContainer${profileCardDetails.number}`).innerHTML = '';

    for (let profileTypeIndex = 0; profileTypeIndex < profileTypesData.types.length; profileTypeIndex++) {
        let profileCardTypes = capitalizeFirstLetter(profileTypesData.types[profileTypeIndex].type.name);

        profileTypes += `<span class="types ${pokemonProfile.types[profileTypeIndex].type.name}">${profileCardTypes}</span>`;
    }
    document.getElementById('morePokemonsButton').classList.remove('d-none');
    
    
    return profileTypes;
}