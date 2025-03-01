function showPokemonPreview() {
    document.getElementById('pokemonPreviewContent').classList.remove('d-none');
    document.getElementById('pokemonProfileContent').innerHTML = '';
    document.getElementById('pokemonProfileContent').classList.add('d-none');
    document.getElementById('morePokemonsButton').classList.remove('d-none');
    document.getElementById('pokemonSearch').classList.remove('d-none');
    document.getElementById('backToPreviewButton').classList.add('d-none');
}

function showPokemonProfile() {
    document.getElementById('pokemonProfileContent').classList.remove('d-none');
    document.getElementById('pokemonPreviewContent').classList.add('d-none');
    document.getElementById('morePokemonsButton').classList.add('d-none');
    document.getElementById('pokemonSearch').classList.add('d-none');
    document.getElementById('backToPreviewButton').classList.remove('d-none');
}

function showProfileMainCard() {
    document.getElementById('profileMainCard').classList.remove('d-none');
    document.getElementById('profileStatsCard').classList.add('d-none');
    document.getElementById('main-link').classList.add('profile-bg-details');
    document.getElementById('stats-link').classList.remove('profile-bg-details');
}

function showProfileStatsCard() {
    document.getElementById('profileMainCard').classList.add('d-none');
    document.getElementById('profileStatsCard').classList.remove('d-none');
    document.getElementById('main-link').classList.remove('profile-bg-details');
    document.getElementById('stats-link').classList.add('profile-bg-details');
}

function hidePreviewContainer() {
    document.getElementById('pokemonPreviewContent').classList.add('d-none');
    document.getElementById('morePokemonsButton').classList.add('d-none');
}
