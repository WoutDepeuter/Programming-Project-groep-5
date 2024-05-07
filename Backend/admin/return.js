'use strict'

let bevestig = document.getElementsByClassName('bevestig-knop');
let annuleer = document.getElementsByClassName('annuleer-knop');

let klant = document.getElementsByClassName('klantinfo');


for (let i = 0; i < bevestig.length; i++) {
    bevestig[i].addEventListener('click', bevestigRetour);
}
for(let i = 0; i < annuleer.length; i++) {
    annuleer[i].addEventListener('click', annuleerRetour);
}

function bevestigRetour() {
    let klant = this.closest('.klantinfo');
    let container = document.getElementsByClassName("container")[0] ;
    let ontvangen = document.getElementsByClassName("ontvangen")[0];
    let uitlenen = document.getElementsByClassName("uitlenen")[0];
    let product = document.getElementById("product-id").innerText;
    console.log(product)
    if (ontvangen) ontvangen.innerHTML = "";
    if (uitlenen) uitlenen.innerHTML = "";

    container.innerHTML = `
        <div class="returnform">
            <h1>Is het product beschadigd</h1>
            <form id="returnForm">
            <div class ="radio-container">
                <input type="radio" name="schade" id="schade1">
                <label for="schade1"><H3>JA</H3></label>
                <input type="radio" name="schade" id="schade2">
                <label for="schade2"><H3>NEE</H3></label>
                <br>
                </div>
                <h2>Beschrijving</h2>
                <input type="text" name="schade" id="damage" placeholder="type hier">
                <button type="submit">Submit</button>
                <h3>ID ${product} </h3>
            </form>
        </div>`;


}

function annuleerRetour() {
    //maak een div om klant info weg te halen
    let klant =  this.closest('.klantinfo');
    // zoekt de klant info dichtbij de button die geduwd is en verwijderd deze
    klant.innerHTML = "<div><h1 class='nietterug'>product niet teruggebracht</h1><a href='../../frontend/Admin-interface/HoofdMenuAdmin.html'>Terug naar home</a></div>";
    //geeft een medling dat het product niet teruggebracht is en een link naar de home pagina
    //moet later nog database functionaliteit bij enzo
}


