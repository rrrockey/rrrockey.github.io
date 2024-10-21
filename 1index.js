let NFL_teams = [
    // NFC North
    'CHI', // Chicago Bears
    'DET', // Detroit Lions
    'GB',  // Green Bay Packers
    'MIN', // Minnesota Vikings

    // NFC East
    'DAL', // Dallas Cowboys
    'NYG', // New York Giants
    'PHI', // Philadelphia Eagles
    'WSH', // Washington Commanders

    // NFC South
    'ATL', // Atlanta Falcons
    'CAR', // Carolina Panthers
    'NO',  // New Orleans Saints
    'TB',   // Tampa Bay Buccaneers

    // NFC West
    'ARI', // Arizona Cardinals
    'LAR', // Los Angeles Rams
    'SF',  // San Francisco 49ers
    'SEA',  // Seattle Seahawks

    // AFC North
    'BAL', // Baltimore Ravens
    'CIN', // Cincinnati Bengals
    'CLE', // Cleveland Browns
    'PIT',  // Pittsburgh Steelers

    // AFC East
    'BUF', // Buffalo Bills
    'MIA', // Miami Dolphins
    'NE',  // New England Patriots
    'NYJ',  // New York Jets

    // AFC South
    'HOU', // Houston Texans
    'IND', // Indianapolis Colts
    'JAX', // Jacksonville Jaguars
    'TEN',  // Tennessee Titans

    // AFC West
    'DEN', // Denver Broncos
    'KC',  // Kansas City Chiefs
    'LV',  // Las Vegas Raiders
    'LAC'  // Los Angeles Chargers
];

let NHL_teams = [
    // Eastern Conference
    // Atlantic Division
    'BOS', // Boston Bruins
    'BUF', // Buffalo Sabres
    'DET', // Detroit Red Wings
    'FLA', // Florida Panthers
    'MTL', // Montreal Canadiens
    'OTT', // Ottawa Senators
    'TOR', // Toronto Maple Leafs
    'TB', // Tampa Bay Lightning

    // Metropolitan Division
    'CAR', // Carolina Hurricanes
    'CBJ', // Columbus Blue Jackets
    'NJ',  // New Jersey Devils
    'NYI', // New York Islanders
    'NYR', // New York Rangers
    'PHI', // Philadelphia Flyers
    'PIT', // Pittsburgh Penguins
    'WSH', // Washington Capitals

    // Western Conference
    // Central Division
    'UTAH', // Utah Hockey Club
    'CHI', // Chicago Blackhawks
    'COL', // Colorado Avalanche
    'DAL', // Dallas Stars
    'MIN', // Minnesota Wild
    'NSH', // Nashville Predators
    'STL', // St. Louis Blues
    'WPG', // Winnipeg Jets

    // Pacific Division
    'ANA', // Anaheim Ducks
    'CGY', // Calgary Flames
    'EDM', // Edmonton Oilers
    'LA', // Los Angeles Kings -----------
    'SJ', // San Jose Sharks -----------
    'VAN', // Vancouver Canucks
    'VGK', // Vegas Golden Knights
    'SEA'  // Seattle Kraken
];

let MLB_teams = [
    // National League
    // East Division
    'ATL', // Atlanta Braves
    'MIA', // Miami Marlins
    'NYM', // New York Mets
    'PHI', // Philadelphia Phillies
    'WSH', // Washington Nationals

    // Central Division
    'CHC', // Chicago Cubs
    'CIN', // Cincinnati Reds
    'MIL', // Milwaukee Brewers
    'PIT', // Pittsburgh Pirates
    'STL', // St. Louis Cardinals

    // West Division
    'ARI', // Arizona Diamondbacks
    'COL', // Colorado Rockies
    'LAD', // Los Angeles Dodgers
    'SD',  // San Diego Padres
    'SF',  // San Francisco Giants

    // American League
    // East Division
    'BAL', // Baltimore Orioles
    'BOS', // Boston Red Sox
    'NYY', // New York Yankees
    'TB',  // Tampa Bay Rays
    'TOR', // Toronto Blue Jays

    // Central Division
    'CHW', // Chicago White Sox
    'CLE', // Cleveland Guardians
    'DET', // Detroit Tigers
    'KC',  // Kansas City Royals
    'MIN', // Minnesota Twins

    // West Division
    'HOU', // Houston Astros
    'LAA', // Los Angeles Angels
    'OAK', // Oakland Athletics
    'SEA', // Seattle Mariners
    'TEX'  // Texas Rangers
];

let NBA_teams = [
    // Eastern Conference
    // Atlantic Division
    'BOS', // Boston Celtics
    'BKN', // Brooklyn Nets
    'NYK', // New York Knicks
    'PHI', // Philadelphia 76ers
    'TOR', // Toronto Raptors

    // Central Division
    'CHI', // Chicago Bulls
    'CLE', // Cleveland Cavaliers
    'DET', // Detroit Pistons
    'IND', // Indiana Pacers
    'MIL', // Milwaukee Bucks

    // Southeast Division
    'ATL', // Atlanta Hawks
    'CHA', // Charlotte Hornets
    'MIA', // Miami Heat
    'ORL', // Orlando Magic
    'WAS', // Washington Wizards

    // Western Conference
    // Northwest Division
    'DEN', // Denver Nuggets
    'MIN', // Minnesota Timberwolves
    'OKC', // Oklahoma City Thunder
    'POR', // Portland Trail Blazers
    'UTAH', // Utah Jazz

    // Pacific Division
    'GSW', // Golden State Warriors
    'LAC', // Los Angeles Clippers
    'LAL', // Los Angeles Lakers
    'PHX', // Phoenix Suns
    'SAC', // Sacramento Kings

    // Southwest Division
    'DAL', // Dallas Mavericks
    'HOU', // Houston Rockets
    'MEM', // Memphis Grizzlies
    'NO', // New Orleans Pelicans
    'SAS'  // San Antonio Spurs
];


async function fetchTeam(team, url) {
    // display loading icon while fetching teams
    document.getElementById('loading').style.display = 'block';
    document.getElementById('loadingText').style.display = 'block';
    document.getElementById('loadingTextH1').innerHTML = "Loading Teams..."


    try {
        const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${url}/teams/${team}`);
        const data = await response.json();
        return data.team;
    } catch (error) {
        console.error('Error fetching team:', error);
    } finally {
        // Hide loading icon
        document.getElementById('loading').style.display = 'none';
        document.getElementById('loadingText').style.display = 'none';
    }
}

async function createTeamCards() {
    let url = "";
    let teams;
    let league;
    if (document.title.includes("NFL")) {
        url = "football/nfl"
        teams = NFL_teams;
        league = "NFL";
    } else if (document.title.includes("NBA")) {
        url = "basketball/nba"
        teams = NBA_teams;
        league = "NBA";
    } else if (document.title.includes("MLB")) {
        url = "baseball/mlb"
        teams = MLB_teams;
        league = "MLB";
    } else if (document.title.includes("NHL")) {
        url = "hockey/nhl"
        teams = NHL_teams;
        league = "NHL";
    } else {
        // saved team
    }

    let row = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-4.g-6');
    if (!row) {
        row = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-5.g-6');
    }
    

    for (let i of teams) {
        try {
            let teamJson = await fetchTeam(i, url); // Wait for team data

            let isoDate = teamJson.nextEvent[0].date;
            let fullEventName = teamJson.nextEvent[0].name;
            let displayName = teamJson.displayName
            let standingSummary = teamJson.standingSummary

            let formattedDate = formatJsonInput(isoDate, fullEventName, displayName, standingSummary, league)[0];
            let eventName = formatJsonInput(isoDate, fullEventName, displayName, standingSummary, league)[1];
            standingSummary = formatJsonInput(isoDate, fullEventName, displayName, standingSummary, league)[2];

            // Create a card element
            const card = document.createElement('div');
            card.className = 'col';

            const isSaved = savedTeams.includes(`${i},${url}`);  

            // Create card content using team data
            card.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${teamJson.logos[0].href}" alt="${teamJson.displayName} logo" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${teamJson.displayName}</h5>
                        <p class="card-text" >Record: ${teamJson.record.items[0].summary}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary saveTeamButton" style="backgroundColor=${(isSaved) ? "grey" : "white"}; color=${(isSaved) ? "white" : "darkgray"}">${(isSaved) ? "Saved" : "Save"}</button>
                            </div>
                            <small class="text-muted">${standingSummary}</small>
                        </div>
                        <div class="extra-info" style="display: none;">
                            <br/>
                            <p>Upcoming Game:</p>
                            <p>${formattedDate}: ${eventName}</p>
                        </div>
                    </div>
                </div>
            `;

            card.querySelector('.dropdown-toggle').addEventListener('click', () => {
                console.log("Saving team:", i, league);
                const extraInfo = card.querySelector('.extra-info');
                extraInfo.style.display = extraInfo.style.display === 'none' ? 'block' : 'none';
            });
        
            card.querySelector(".saveTeamButton").addEventListener('click', () => {
                const teamKey = `${i},${url}`;
                if (!savedTeams.includes(teamKey)) {
                    savedTeams += (savedTeams ? ',' : '') + teamKey; // Add comma only if not empty
                    sessionStorage.setItem('savedTeams', savedTeams);
                    
                    const saveButton = card.querySelector('.saveTeamButton');
                    saveButton.innerText = 'Saved';
                    saveButton.style.backgroundColor = 'gray';
                    saveButton.style.color = 'white';
                } else {
                    // Remove the substring
                    savedTeams = savedTeams.replace(teamKey, "");
                    // Clean up any extra commas
                    savedTeams = savedTeams.replace(/,,+/g, ',').replace(/^,|,$/g, '');

                    sessionStorage.setItem('savedTeams', savedTeams); // Update session storage

                    const saveButton = card.querySelector('.saveTeamButton');
                    saveButton.innerText = 'Save';
                    saveButton.style.backgroundColor = 'white';
                    saveButton.style.color = 'darkgray';
                }
            });

            // Append the card to the row
            row.appendChild(card);
        } catch (error) {
            console.error(`Error fetching team data for ${i}:`, error);
        }
    }
}

async function createSavedCards() {
    let savedTeams = sessionStorage.getItem('savedTeams');

    let savedTeamsArray = savedTeams ? savedTeams.split(",") : [];

    let row = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-4.g-6');

    for (let index = 0; index < savedTeamsArray.length; index += 2) {
        let i = savedTeamsArray[index];
        let url = savedTeamsArray[index+1];
        let league = url
        try {
            let teamJson = await fetchTeam(i, url); // Wait for team data

            let isoDate = teamJson.nextEvent[0].date;
            let fullEventName = teamJson.nextEvent[0].name;
            let displayName = teamJson.displayName
            let standingSummary = teamJson.standingSummary

            let formattedDate = formatJsonInput(isoDate, fullEventName, displayName, standingSummary, league)[0];
            let eventName = formatJsonInput(isoDate, fullEventName, displayName, standingSummary, league)[1];
            standingSummary = formatJsonInput(isoDate, fullEventName, displayName, standingSummary, league)[2];

            // Create a card element
            const card = document.createElement('div');
            card.className = 'col';

            const isSaved = savedTeams.includes(`${i},${url}`);  

            // Create card content using team data
            card.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${teamJson.logos[0].href}" alt="${teamJson.displayName} logo" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${teamJson.displayName}</h5>
                        <p class="card-text" >Record: ${teamJson.record.items[0].summary}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary saveTeamButton" style="backgroundColor=${(isSaved) ? "grey" : "white"}; color=${(isSaved) ? "white" : "darkgray"}">${(isSaved) ? "Saved" : "Save"}</button>
                            </div>
                            <small class="text-muted">${standingSummary}</small>
                        </div>
                        <div class="extra-info" style="display: none;">
                            <br/>
                            <p>Upcoming Game:</p>
                            <p>${formattedDate}: ${eventName}</p>
                        </div>
                    </div>
                </div>
            `;

            card.querySelector('.dropdown-toggle').addEventListener('click', () => {
                console.log("Saving team:", i, league);
                const extraInfo = card.querySelector('.extra-info');
                extraInfo.style.display = extraInfo.style.display === 'none' ? 'block' : 'none';
            });
        
            card.querySelector(".saveTeamButton").addEventListener('click', () => {
                const teamKey = `${i},${url}`;
                if (!savedTeams.includes(teamKey)) {
                    savedTeams += (savedTeams ? ',' : '') + teamKey; // Add comma only if not empty
                    sessionStorage.setItem('savedTeams', savedTeams);
                    
                    const saveButton = card.querySelector('.saveTeamButton');
                    saveButton.innerText = 'Saved';
                    saveButton.style.backgroundColor = 'gray';
                    saveButton.style.color = 'white';
                } else {
                    // Remove the substring
                    savedTeams = savedTeams.replace(teamKey, "");
                    // Clean up any extra commas
                    savedTeams = savedTeams.replace(/,,+/g, ',').replace(/^,|,$/g, '');

                    sessionStorage.setItem('savedTeams', savedTeams); // Update session storage

                    const saveButton = card.querySelector('.saveTeamButton');
                    saveButton.innerText = 'Save';
                    saveButton.style.backgroundColor = 'white';
                    saveButton.style.color = 'darkgray';
                }
            });

            // Append the card to the row
            row.appendChild(card);
        } catch (error) {
            console.error(`Error fetching team data for ${i}:`, error);
        }
    }
}

function formatJsonInput(isoDate, fullEventName, teamName, standingSummary, league) {
    let returnName = "";

    // Create a Date object from the ISO string
    let date = new Date(isoDate);

    // Get the month (note: months are 0-indexed in JavaScript)
    let month = date.getMonth() + 1; // Add 1 since months are 0-11
    let day = date.getDate();

    // Format as MM/DD
    let formattedDate = `${month}/${day}`;

    if (fullEventName.includes(`${teamName} at`)) {
        returnName = fullEventName.replace(`${teamName} at`, "@");
    } else if (fullEventName.includes(`at ${teamName}`)) {
        returnName = fullEventName.replace(`at ${teamName}`, "");
        returnName = "vs. " + returnName;
    }

    if (league == "NBA") {
        standingSummary = standingSummary.replace("Division", "");
    }

    return [formattedDate, returnName, standingSummary];
}

// Run the function after the page has loaded
document.addEventListener('DOMContentLoaded', document.title.includes("Saved") ? createSavedCards : createTeamCards);
let savedTeams = sessionStorage.getItem('savedTeams') || '';
if (savedTeams) {
    console.log("Saved teams:", savedTeams);
} else {
    console.log("No teams have been saved yet.");
}
