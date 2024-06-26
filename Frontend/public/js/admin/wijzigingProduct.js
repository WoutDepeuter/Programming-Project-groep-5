//script voor het wijzigen van producten in de admin pagina
//er wordt een fetch gedaan naar de backend om de product informatie op te halen
//er wordt een fetch gedaan naar de backend om de echte producten op te halen
//er wordt een popup getoond om de product informatie te wijzigen
//als de gebruiker op opslaan klikt wordt de informatie opgeslagen
//als de gebruiker op sluiten klikt wordt de popup gesloten
//als de gebruiker op voeg echt product toe klikt wordt er een echt product toegevoegd
//als de gebruiker op verwijder echt product klikt wordt er een echt product verwijderd
//de pagina wordt herladen


document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupContent = document.getElementById("popupContent");

  editButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-product-id");
      const productInfo = await getProductInfo(productId);
      const realProducts = await getRealProducts(productId);

      if (productInfo) {
        popupContent.innerHTML = `
        <div class="wijzigPopUp" id="wijzigPopUp">
          <h2>Product wijzigen</h2>
          <form>
            <label for="merkProduct">Merk veranderen:</label>
            <input id="merkProduct" type="text" value="${productInfo.MERK}">
            <label for="naamProduct">Naam veranderen:</label>
            <input id="naamProduct" type="text" value="${productInfo.naam}">
            <label for="fotoProduct">Foto veranderen:</label>
            <input id="fotoProduct" type="file" accept="image/*">
            <label for="beschrijvingProduct">Beschrijving veranderen:</label>
            <textarea name="beschrijving" id="beschrijvingProduct" rows="4">${productInfo.Beschrijving}</textarea>
            <label for="categorieProduct">Categorie veranderen:</label>
            <select name="categorie" id="categorieProduct">
              <option value="1" ${productInfo.Cat_ID == 1 ? "selected" : ""}>Audio</option>
              <option value="2" ${productInfo.Cat_ID == 2 ? "selected" : ""}>Belichting</option>
              <option value="3" ${productInfo.Cat_ID == 3 ? "selected" : ""}>Varia</option>
              <option value="4" ${productInfo.Cat_ID == 4 ? "selected" : ""}>Video</option>
              <option value="5" ${productInfo.Cat_ID == 5 ? "selected" : ""}>XR</option>
            </select>
          </form>
            <h3>Echte producten beheren:</h3>
            <div id="extraProductContainer">
              <button id="addRealProductButton" data-product-id="${productId}">Voeg Echt Product Toe</button>
              <select id="realProductSelect" data-product-id="${productId}">
                ${realProducts.map(product => `<option value="${product.product_ID}">${product.product_ID}</option>`).join('')}
              </select>
              <button id="removeRealProductButton" data-product-id="${productId}">Verwijder Echt Product</button>
            </div>
            <div id="saveContainer">
              <button id="closeButton">Sluiten</button>
              <button id="saveButton" data-product-id="${productId}">Opslaan</button>
            </div>
        </div>
        `;

        popupOverlay.style.display = "flex";

        document.getElementById("closeButton").addEventListener("click", () => {
          popupOverlay.style.display = "none";
        });

        document.getElementById("saveButton").addEventListener("click", saveProductChanges);
        document.getElementById("addRealProductButton").addEventListener("click", addRealProduct);
        document.getElementById("removeRealProductButton").addEventListener("click", removeRealProduct);
      }
    });
  });
});

async function getProductInfo(productId) {
  try {
    const response = await fetch(`/getProductInfo/${productId}`);
    if (!response.ok) {
      throw new Error('Error fetching product information');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getRealProducts(productId) {
  try {
    const response = await fetch(`/getRealProducts/${productId}`);
    if (!response.ok) {
      throw new Error('Error fetching real products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function saveProductChanges(event) {
  const productId = event.target.getAttribute('data-product-id');
  const merkProduct = document.getElementById('merkProduct').value;
  const naamProduct = document.getElementById('naamProduct').value;
  const fotoProduct = document.getElementById('fotoProduct').files[0];
  const beschrijvingProduct = document.getElementById('beschrijvingProduct').value;
  const categorieProduct = document.getElementById('categorieProduct').value;

  const formData = new FormData();
  formData.append("productId", productId);
  formData.append("productName", naamProduct);
  formData.append("merk", merkProduct);
  formData.append("productDescription", beschrijvingProduct);
  if (fotoProduct) {
    formData.append("productFoto", fotoProduct);
  }
  formData.append("category", categorieProduct);

  fetch("/editProduct", {
    method: "POST",
    body: formData,
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      document.getElementById("popupOverlay").style.display = "none";
      setTimeout(() => { window.location.reload(); }, 500);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function addRealProduct(event) {
  const modelId = event.target.getAttribute('data-product-id');

  fetch("/addRealProduct", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ modelId: modelId })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    setTimeout(() => { window.location.reload(); }, 500);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

function removeRealProduct() {
  const realProductId = document.getElementById('realProductSelect').value;

  fetch("/removeRealProduct", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ realProductId: realProductId })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    setTimeout(() => { window.location.reload(); }, 500);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}