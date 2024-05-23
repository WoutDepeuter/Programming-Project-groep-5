let zoek = document.getElementById("search");
zoek.addEventListener("click", zoekGebruiker);

function zoekGebruiker() {
    let popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = `
        <div id="popup-gebruiker-zoeken">
            <h1>Zoek gebruiker</h1>
            <div id="zoekgebruiker-input">
                <input type="text" id="searchInput" placeholder="Gebruikersnaam">
                <button id="searchButton">Zoeken</button>
            </div>
            <div id="zoekgebruiker-resultaat">
                <!-- resultaten zulleen hier tevoorschijn komen -->
            </div>
            <div class="popup-buttons">
                <button type="button" class="close-btn" id="closePopupBtn">Close</button>
            </div>
        </div>
    `;

    document.getElementById('popupOverlay').style.display = 'flex';

    document.getElementById('closePopupBtn').addEventListener('click', function() {
        document.getElementById('popupOverlay').style.display = 'none';
    });

    // Add event listener to the search button
    document.getElementById('searchButton').addEventListener('click', function() {
        // Get the search input value
        let searchTerm = document.getElementById('searchInput').value;

        // Now you can perform a search using the searchTerm
        // You can fetch data from your database and display the result in the popup
        // For now, let's just log the search term
        console.log("Searching for user:", searchTerm);
    });
}
