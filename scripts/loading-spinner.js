/**
 * This Function is used to display the loading Spinner
 */

function displayLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.remove('d-none');
    document.getElementById('morePokemonsButton').classList.add('d-none');
    document.getElementById('dotsContainer').innerHTML = loadingSpinnerTemplate();
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.add('d-none');
}

