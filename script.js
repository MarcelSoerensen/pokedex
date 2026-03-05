let pokemonDataLocal = [];

function initializePage() {
  displayLoadingSpinner();
  fetchPokemonData();
}

async function fetchPokemonData() {
  hidePreviewContainer();
  let pokemonAmount = pokemonDataLocal.length + 1;
  for (
    let pokemonIndex = pokemonAmount;
    pokemonIndex < pokemonAmount + 20;
    pokemonIndex++
  ) {
    let pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`,
    );
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
  let searchInput = document
    .getElementById("pokemonSearch")
    .value.toLowerCase();
  let pokemonPreviewContent = document.getElementById("pokemonPreviewContent");
  pokemonPreviewContent.innerHTML = "";
  for (
    let filteredIndex = 0;
    filteredIndex < pokemonDataLocal.length;
    filteredIndex++
  ) {
    let pokemonData = pokemonDataLocal[filteredIndex];
    if (
      searchInput === "" ||
      pokemonData.name.toLowerCase().includes(searchInput)
    ) {
      getPreviewDetails(filteredIndex + 1, pokemonData);
    }
  }
}

function toggleMorePokemonsButtonVisibility() {
  let pokemonSearchInput = document.getElementById("pokemonSearch");
  let morePokemonsButton = document.getElementById("morePokemonsButton");
  if (pokemonSearchInput.value === "") {
    morePokemonsButton.classList.remove("d-none");
  } else {
    morePokemonsButton.classList.add("d-none");
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

function showImprint() {
  document.getElementById("pokemonPreviewContent").classList.remove("d-none");
  document.getElementById("pokemonPreviewContent").innerHTML =
    imprintTemplate();
  document.getElementById("pokemonProfileContent").innerHTML = "";
  document.getElementById("pokemonProfileContent").classList.add("d-none");
  document.getElementById("morePokemonsButton").classList.add("d-none");
  document.getElementById("pokemonSearch").classList.add("d-none");
  let backBtn = document.getElementById("backToPreviewButton");
  backBtn.classList.remove("d-none");
  backBtn.onclick = showPokemonPreview;
}

function showPrivacy() {
  document.getElementById("pokemonPreviewContent").classList.remove("d-none");
  document.getElementById("pokemonPreviewContent").innerHTML =
    privacyTemplate();
  document.getElementById("pokemonProfileContent").innerHTML = "";
  document.getElementById("pokemonProfileContent").classList.add("d-none");
  document.getElementById("morePokemonsButton").classList.add("d-none");
  document.getElementById("pokemonSearch").classList.add("d-none");
  let backBtn = document.getElementById("backToPreviewButton");
  backBtn.classList.remove("d-none");
  backBtn.onclick = showPokemonPreview;
}

function startAppFromStartScreen() {
  animateStartScreenOut();
  hideStartScreenAndInitialize();
}

function animateStartScreenOut() {
  const pokeball = document.getElementById("startScreenPokeball");
  const startBtn = document.getElementById("startScreenButton");
  const profileContent = document.getElementById("pokemonProfileContent");

  if (pokeball)
    pokeball.style.animation =
      "pokeballOut 0.7s cubic-bezier(.68,-0.55,.27,1.55) forwards";
  if (startBtn)
    startBtn.style.animation =
      "startButtonOut 0.7s cubic-bezier(.68,-0.55,.27,1.55) forwards";
  if (profileContent) profileContent.style.display = "none";
}

function hideStartScreenAndInitialize() {
  const startScreen = document.getElementById("startScreen");
  const profileContent = document.getElementById("pokemonProfileContent");

  if (!startScreen) {
    if (profileContent) profileContent.style.display = "";
    initializePage();
    return;
  }

  startScreen.style.opacity = "0";
  setTimeout(() => {
    startScreen.style.display = "none";
    if (profileContent) profileContent.style.display = "";
    initializePage();
  }, 1200);
}
