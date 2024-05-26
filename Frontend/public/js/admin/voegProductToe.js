// voegProductToe.js
document.getElementById('add').addEventListener('click', voegProductToeButton);

function voegProductToeButton() {
    let popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = `
        <div id="popup-voeg-product-toe">
            <h1>Voeg item toe</h1>
            <div id="productnaam-product-toevoegen">
                <input type="text" id="productName" placeholder="Productnaam">
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
                    <option value="1">Audio</option>
                    <option value="2">Belichting</option>
                    <option value="3">Varia</option>
                    <option value="4">Video</option>
                    <option value="5">XR</option>
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
        addProduct();
        document.getElementById('popupOverlay').style.display = 'none';
    });
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productbeschrijving-product-toevoegen').value;
    const photoUploader = document.getElementById('fotoUploader').files[0];
    const category = document.getElementById('lijstMetCategorien').value;

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productFoto', photoUploader);
    formData.append('category', category);

    fetch('/addProduct', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
