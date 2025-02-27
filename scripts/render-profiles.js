
function getProfileDetails(pokemonIndex) {
    showPokemonProfile();
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

    renderProfileDetails(pokemonIndex, profileCardDetails, pokemonProfile);    
}

function renderProfileDetails(pokemonIndex, profileCardDetails, pokemonProfile) {
    document.getElementById('pokemonProfileContent').innerHTML += profileCardTemplate(profileCardDetails);
    let types = renderProfileTypes(pokemonIndex, profileCardDetails, pokemonProfile);
    document.getElementById(`profileTypesContent${profileCardDetails.number}`).innerHTML = types;
    let abilities = renderProfileAbilities(pokemonIndex, profileCardDetails, pokemonProfile);
    document.getElementById(`profileAbilitiesContent${profileCardDetails.number}`).innerHTML = abilities;
    showPokemonProfile(); 
}


function renderProfileTypes(pokemonIndex, profileCardDetails, pokemonProfile) {
    let profileTypesData = pokemonDataLocal[pokemonIndex];
    let profileTypes = '';
    
    document.getElementById(`profileTypesContent${profileCardDetails.number}`).innerHTML = '';

    for (let profileTypeIndex = 0; profileTypeIndex < profileTypesData.types.length; profileTypeIndex++) {
        let profileCardTypes = capitalizeFirstLetter(profileTypesData.types[profileTypeIndex].type.name);

        profileTypes += `<span class="types ${pokemonProfile.types[profileTypeIndex].type.name}">${profileCardTypes}</span>`;
    }
    document.getElementById('morePokemonsButton').classList.remove('d-none');
    
    return profileTypes;
}

function renderProfileAbilities(pokemonIndex, profileCardDetails, pokemonProfile) {
    let profileAbilitiesData = pokemonDataLocal[pokemonIndex];
    let profileAbilities = '';
    
    document.getElementById(`profileAbilitiesContent${profileCardDetails.number}`).innerHTML = '';

    for (let profileAbilitiesIndex = 0; profileAbilitiesIndex < profileAbilitiesData.types.length; profileAbilitiesIndex++) {
        let profileCardAbilities = capitalizeFirstLetter(profileAbilitiesData.abilities[profileAbilitiesIndex].ability.name);
        profileAbilities += `<span ${pokemonProfile.abilities[profileAbilitiesIndex].ability.name}">${profileCardAbilities} </span>`;
    }
    document.getElementById('morePokemonsButton').classList.remove('d-none');
    
    return profileAbilities;
}