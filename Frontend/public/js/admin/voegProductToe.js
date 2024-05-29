// voegProductToe.js
document.getElementById("add").addEventListener("click", voegProductToeButton);


function voegProductToeButton() {
  let popupContent = document.getElementById("popupContent");

  document.querySelector(".extrabuttons").classList.add("hidden");


  popupContent.innerHTML = `
    <div id="popup-voeg-product-toe" class="popup-content">
    <h1>Voeg item toe</h1>
    <div id="productnaam-product-toevoegen" class="form-group">
        <input type="text" id="productName" placeholder="Productnaam">
    </div>
    <div class="form-group">
        <input type="text" id="merk" placeholder="Merk">
    </div>
    <div class="form-group">
        <textarea name="beschrijving" id="productbeschrijving-product-toevoegen" cols="50" rows="10" placeholder="Product beschrijving"></textarea>
    </div>
    <div id="fotouploaden-product-toevoegen" class="form-group">
        <label for="fotoUploader">Kies een foto</label>
        <input type="file" id="fotoUploader">
    </div>
    <div id="lijstMetCategorien-product-toevoegen" class="form-group">
        <label for="lijstMetCategorien">Kies een categorie</label>
        <select id="lijstMetCategorien">
            <option value="1">Audio</option>
            <option value="2">Belichting</option>
            <option value="3">Varia</option>
            <option value="4">Video</option>
            <option value="5">XR</option>
        </select>
    </div>
    <div class="popup-buttons">
    <button type="button" class="btn close-btn" id="closePopupBtn">Sluiten</button>
    <button type="button" class="btn toevoegen-btn" id="toevoegenPopupBtn">Toevoegen</button>
  </div>
</div>

    `;

  document.getElementById("popupOverlay").style.display = "flex";

  document
    .getElementById("closePopupBtn")
    .addEventListener("click", function () {
      document.getElementById("popupOverlay").style.display = "none";
      document.querySelector(".extrabuttons").classList.remove("hidden");

    });

  document
    .getElementById("toevoegenPopupBtn")
    .addEventListener("click", function () {
      addProduct();
      document.getElementById("popupOverlay").style.display = "none";
      document.querySelector(".extrabuttons").classList.remove("hidden");

    });

    popupBackground.addEventListener('click', function (event) {
      if (event.target === popupBackground) {
          popupBackground.style.display = 'none';
      }
  });
}

function addProduct() {
  const productName = document.getElementById("productName").value;
  const merk = document.getElementById("merk").value;
  const productDescription = document.getElementById(
    "productbeschrijving-product-toevoegen"
  ).value;
  const photoUploader = document.getElementById("fotoUploader").files[0];
  const category = document.getElementById("lijstMetCategorien").value;

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("merk", merk);
  formData.append("productDescription", productDescription);
  formData.append("productFoto", photoUploader);
  formData.append("category", category);

  fetch("/addProduct", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    setInterval(() => {            window.location.reload();
    }, 500);
}
