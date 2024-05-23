'use strict';

document.addEventListener('DOMContentLoaded', function () {
    let bevestig = document.getElementById('bevestig-knop0');
    let annuleer = document.getElementById('annuleer-knop0');
    

    if (bevestig) {
        bevestig.addEventListener('click', bevestigRetour);
    }

    if (annuleer) {
        annuleer.addEventListener('click', annuleerRetour);
    }
});

function bevestigRetour() {
    let popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = `
        <div id="popup-voeg-product-toe">
            <h1>Controleer product</h1>
            <form id="controleerForm">
                <div id="productstaat">
                    <label for="productStaat">Is het object beschadigd?</label>
                    <select id="productStaat">
                        <option value="nee">Nee</option>
                        <option value="ja">Ja</option>
                    </select>
                </div>
                <div id="beschrijving">
                    <textarea name="beschrijving" id="beschrijvingTextarea" cols="50" rows="10" placeholder="Beschrijf de schade indien aanwezig"></textarea>
                </div>
                <br>
                <div class="popup-buttons">
                    <button type="button" class="close-btn" id="closePopupBtn">Close</button>
                    <button type="submit" class="toevoegen-btn" id="toevoegenPopupBtn">Bevestig</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('popupOverlay').style.display = 'flex';

    document.getElementById('closePopupBtn').addEventListener('click', function() {
        document.getElementById('popupOverlay').style.display = 'none';
    });

    document.getElementById('controleerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const klantinfoElement = document.querySelector('.klantinfo');
        if (klantinfoElement) {
            const originalContent = klantinfoElement.innerHTML;
            klantinfoElement.innerHTML = `
                <div id="test">
                    <h1 class='terug'>Product teruggebracht (5 sec)</h1>
                    <button id="cancelButton">Wijgeren</button>
                </div>
            `;

            let counter = 5;
            const intervalId = setInterval(() => {
                counter--;
                if (counter <= 0) {
                    clearInterval(intervalId);
                    klantinfoElement.innerHTML = '';
                } else {
                    klantinfoElement.querySelector('h1').innerText = `Product teruggebracht (Clearing in ${counter} sec)`;
                }
            }, 1000);

            document.getElementById('cancelButton').addEventListener('click', function() {
                clearInterval(intervalId);
                klantinfoElement.innerHTML = originalContent;
            });
        }

        document.getElementById('popupOverlay').style.display = 'none';
    });
}

function annuleerRetour() {
    let popupContent = document.getElementById("popupContent");

    popupContent.innerHTML = `
        <div id="popup-annuleer-bevestiging">
            <h1>Weet u het zeker?</h1>
            <p>Weet u zeker dat u het product niet teruggebracht wilt markeren?</p>
            <div class="popup-buttons">
                <button type="button" class="close-btn" id="closePopupAnnuleerBtn">Nee</button>
                <button type="button" class="toevoegen-btn" id="confirmAnnuleerBtn">Ja</button>
            </div>
        </div>
    `;

    document.getElementById('popupOverlay').style.display = 'flex';

    document.getElementById('closePopupAnnuleerBtn').addEventListener('click', function() {
        document.getElementById('popupOverlay').style.display = 'none';
    });

    document.getElementById('confirmAnnuleerBtn').addEventListener('click', function() {
        let klant = document.querySelector('.klantinfo');
        klant.innerHTML = "<div><h1 class='nietterug'>Product niet teruggebracht</h1><a href='../../frontend/Admin-interface/HoofdMenuAdmin.html'>Terug naar home</a></div>";
        document.getElementById('popupOverlay').style.display = 'none';
    });
}
