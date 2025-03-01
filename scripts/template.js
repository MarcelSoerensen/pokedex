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
                    <a id="main-link" class="nav-link profile-bg-details" onclick="showProfileMainCard()" href="#">main</a>
                </li>
                <li class="nav-item">
                    <a id="stats-link" class="nav-link" onclick="showProfileStatsCard()" href="#">stats</a>
                </li>
            </ul>
        </div>
        <div class="profile-details-card">
            <div id="profileMainCard" class="details-height">${profileCardMainTemplate(profileCardDetails)}</div>
            <div id="profileStatsCard" class="d-none details-height">${profileCardStatsTemplate(profileCardDetails)}</div>
        </div>
        <div id="profileTypesContent${profileCardDetails.number}" class="card-body card-bottom"></div>
        
    </div>     
    `;
}

function profileCardMainTemplate(profileCardDetails){
    return /*html*/`
        
        <div class="card-body profile-bg-details">
            <table class="card-text profile-card-table">
                <tr>
                    <td>Gewicht</td>
                    <td>:</td>
                    <td>${(profileCardDetails.weight / 10).toFixed(1)}</td>
                    <td>Kilo</td>
                </tr>
                <tr>
                    <td>Größe</td>
                    <td>:</td>
                    <td>${(profileCardDetails.height / 10).toFixed(1)}</td>
                    <td>Meter</td>
                </tr>
                <tr>
                    <td>Erfahrung</td>
                    <td>:</td>
                    <td>${profileCardDetails.experience}</td>
                    <td>Punkte</td>
                </tr>
                <tr>
                    <td class="space-line"></td>
                </tr>
                <tr>
                    <td>Fähigkeiten</td>
                    <td>:</td>
                    <td id="profileAbilitiesContent${profileCardDetails.number}" colspan="2" class="text-left"></td>
                    <td></td>
                </tr>
            </table>    
        </div>
        `;
}

function profileCardStatsTemplate(profileCardDetails) {
    return /*html*/`
        
    <div class="card-body profile-bg-details">
        <div class="card-text profile-card-table">
            <div class="profile-bg-details stats-line">
                <div>hp:</div>
                <div class="stats-progress">
                    <div class="progress-bar-outline">
                        <div class="progress-bar" style="width: ${profileCardDetails.stats[0].base_stat / 255 * 100}%;"></div>
                    </div>
                    <div class="width-20">${profileCardDetails.stats[0].base_stat}</div>
                </div>
            </div>
            <div class="profile-bg-details stats-line">
                <div>attack:</div>
                <div class="stats-progress">
                    <div class="progress-bar-outline">
                        <div class="progress-bar" style="width: ${profileCardDetails.stats[1].base_stat / 255 * 100}%;"></div>
                    </div>
                    <div class="width-20">${profileCardDetails.stats[1].base_stat}</div>
                </div>
            </div>
            <div class="profile-bg-details stats-line">
                <div>defense:</div>
                <div class="stats-progress">
                    <div class="progress-bar-outline">
                        <div class="progress-bar" style="width: ${profileCardDetails.stats[2].base_stat / 255 * 100}%;"></div>
                    </div>
                    <div class="width-20">${profileCardDetails.stats[2].base_stat}</div>
                </div>
            </div>
            <div class="profile-bg-details stats-line">
                <div>special-attack:</div>
                <div class="stats-progress">
                    <div class="progress-bar-outline">
                        <div class="progress-bar" style="width: ${profileCardDetails.stats[3].base_stat / 255 * 100}%;"></div>
                    </div>
                    <div class="width-20">${profileCardDetails.stats[3].base_stat}</div>
                </div>
            </div>
            <div class="profile-bg-details stats-line">
                <div>special-defense:</div>
                <div class="stats-progress">
                    <div class="progress-bar-outline">
                        <div class="progress-bar" style="width: ${profileCardDetails.stats[4].base_stat / 255 * 100}%;"></div>
                    </div>
                    <div class="width-20">${profileCardDetails.stats[4].base_stat}</div>
                </div>
            </div>
            <div class="profile-bg-details stats-line">
                <div>speed:</div>
                <div class="stats-progress">
                    <div class="progress-bar-outline">
                        <div class="progress-bar" style="width: ${profileCardDetails.stats[5].base_stat / 255 * 100}%;"></div>
                    </div>
                    <div class="width-20">${profileCardDetails.stats[5].base_stat}</div>
                </div>
            </div> 
        </div>  
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