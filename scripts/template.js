function pokemonCardsTemplate(previewCardDetails, pokemonIndex) {
    return /*html*/`
        <div onclick="getProfileDetails(${pokemonIndex-1})" class="card preview-card-hover ${previewCardDetails.backgroundColor}" style="width: 18rem;">
            <div class="card-body card-top">
                <h3 class="card-text">${previewCardDetails.number}...${previewCardDetails.name}</h3>
            </div>
            <img class="preview-card-img" src="${previewCardDetails.image}" alt="pokemon.name">
            <div id="previewTypesContainer${previewCardDetails.number}" class="card-body card-bottom"></div>
            <div id="previewTypes"></div>
            
        </div>     
    `;
} 

function profileCardTemplate(profileCardDetails) {
    return /*html*/`
       
    <div onclick="overlayPrevention(event)" class="card profile-card text-center">
        <div class="profile-card-border ${profileCardDetails.backgroundColor}">
            <div class="card-body profile-card-top">
                <h3 class="card-text">${profileCardDetails.number}...${profileCardDetails.name}</h3>
            </div>
            <img class="profile-card-img" src="${profileCardDetails.image}" alt="pokemon.name">
            
            <ul class="nav nav-tabs card-header-tabs card-header">
      <li class="nav-item">
        <a class="nav-link profile-bg-details active" aria-disabled="true" href="#">main</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">stats</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" aria-disabled="true">evo chain</a>
      </li>
    </ul>
  </div>
  <div class="card-body profile-bg-details">
  <table class="card-text profile-card-table">
  <tr>
        <td>Gewicht:</td>
        <td>${(profileCardDetails.weight / 10).toFixed(1)} Kilo</td>
    </tr>
    <tr>
        <td>Größe:</td>
        <td>${(profileCardDetails.height / 10).toFixed(1)} Meter</td>
    </tr>
    <tr>
        <td>Erfahrung:</td>
        <td>${profileCardDetails.experience} Punkte</td>
    </tr>
    <tr >
        <td class="freeSpace"></td>
    </tr>
    <tr>
        <td>Fähigkeiten:</td>
        <td id="profileAbilitiesContent${profileCardDetails.number}"></td>
    </tr>
</table>    
    </div>
    <div id="profileTypesContent${profileCardDetails.number}" class="card-body card-bottom"></div>
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