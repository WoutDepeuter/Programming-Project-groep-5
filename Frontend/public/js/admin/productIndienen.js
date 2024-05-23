let bevestig = document.getElementById('bevestig-knop');
bevestig.addEventListener("click", bevestiging);

function bevestiging() {
    let popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = `
        <div id="popup-voeg-product-toe">
            <h1>Voeg item toe</h1>
            <div id="productnaam-product-toevoegen">
                <input type="text" placeholder="Productnaam">
            </div>
            <textarea name="beschrijving" id="productbeschrijving-product-toevoegen" cols="50" rows="10" placeholder="Product beschrijving"></textarea>
            <br>
            <div id="fotouploaden-product-toevoegen">
                <label for="fotoUploader">Kies een foto</label>
                <input type="file" id="fotoUploader">
            </div>
            <br>
            <div id="lijstMetCategorien-product-toevoegen">
                <label for="lijstMetCategorien">Kies een categorie</label>
                <select name="" id="lijstMetCategorien">
                    <option value="audio">Audio</option>
                    <option value="belichting">Belichting</option>
                    <option value="video">Video</option>
                    <option value="varia">Varia</option>
                    <option value="xr">XR</option>
                </select>
            </div>
            <br>
            <div class="popup-buttons">
                <button type="button" class="close-btn" id="closePopupBtn">Close</button>
                <button type="button" class="toevoegen-btn" id="toevoegenPopupBtn">Toevoegen</button>
            </div>
        </div>
    `;

    document.getElementById('popupOverlay').style.display = 'flex';

    document.getElementById('closePopupBtn').addEventListener('click', function() {
        document.getElementById('popupOverlay').style.display = 'none';
    });

    document.getElementById('toevoegenPopupBtn').addEventListener('click', function() {
        console.log("Product toegevoegd!");
        document.getElementById('popupOverlay').style.display = 'none';
    });
}
