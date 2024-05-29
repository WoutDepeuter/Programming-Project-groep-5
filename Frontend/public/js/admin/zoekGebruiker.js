let zoek = document.getElementById("search");
zoek.addEventListener("click", zoekGebruiker);

function zoekGebruiker() {
  let popupContent = document.getElementById("popupContent");

  popupContent.innerHTML = `
    <div id="popup-gebruiker-zoeken" class="popup-content">
    <h1>Zoek gebruiker</h1>
    <div id="zoekgebruiker-input" class="form-group">
      <input type="text" id="searchInput" placeholder="Gebruikersnaam">
    </div>
    <div id="zoekgebruiker-resultaat">
    </div>
    <div class="popup-buttons">
    <button type="button" class="btn close-btn" id="closePopupBtn">Sluiten</button>
    <button id="searchButton" class="btn search-btn">Zoeken</button>
    </div>
    </div>
  </div>
  
    `;

  document.getElementById("popupOverlay").style.display = "flex";

  document
    .getElementById("closePopupBtn")
    .addEventListener("click", function () {
      document.getElementById("popupOverlay").style.display = "none";
    });

  // Add event listener to the search button
  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      // Get the search input value
      let searchTerm = document.getElementById("searchInput").value;

      // Now you can perform a search using the searchTerm
      // You can fetch data from your database and display the result in the popup
      // For now, let's just log the search term
      console.log("Searching for user:", searchTerm);
    });
}
