
 let addproduct = document.getElementById('add');
addproduct.addEventListener("click",voegProductToeButton)

function voegProductToeButton()
{
    let addproduct = document.getElementById('add');
    addproduct.addEventListener("click", voegProductToeButton);
    
    function voegProductToeButton() {
        let prodnav = document.getElementsByClassName("prodnav")[0];
        let container = document.getElementsByClassName("container-producten")[0];
        let div = document.createElement("div");
        prodnav.innerHTML = "";
        container.innerHTML = `
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
            </div>
        `;
    }
}