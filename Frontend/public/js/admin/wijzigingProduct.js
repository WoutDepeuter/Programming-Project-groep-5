document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupContent = document.getElementById("popupContent");

  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");

      // Hier kun je een AJAX-aanvraag doen om de productgegevens op te halen op basis van productId
      // Voor dit voorbeeld vullen we de popup gewoon met statische gegevens
      popupContent.innerHTML = `
      <div class="wijzigPopUp" id="wijzigPopUp">
        <h2>Product wijzigen</h2>
        <form>
          <label for="naamProduct">Naam veranderen:</label>
          <input id="naamProduct" type="text" placeholder="Productnaam">
          <label for="fotoProduct">Foto veranderen:</label>
          <input id="fotoProduct" type="file" accept="image/*">
          <label for="beschrijvingProduct">Beschrijving veranderen:</label>
          <textarea name="beschrijving" id="beschrijvingProduct" rows="4"></textarea>
          <select name="categorie" id="categorieProduct">
            <option value="categorie1">Audio</option>
            <option value="categorie2">Belichting</option>
            <option value="categorie3">Varia</option>
            <option value="categorie4">Video</option>
            <option value="categorie5">Xr</option>
          </select>
        </form>
        <div id="saveContainer">
          <button id="closeButton">Sluiten</button>
          <button id="saveButton">Opslaan</button>
        </div>
      </div>
      `;

      popupOverlay.style.display = "flex";

      const closeButton = document.getElementById("closeButton");
      closeButton.addEventListener("click", () => {
        popupOverlay.style.display = "none";
      });
    });
  });
});