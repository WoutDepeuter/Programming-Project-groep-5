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
klant.innerHTML = `

    <div class="returnrform">
        <h1>Product ontvangen</h1>
        <form id="returnForm">
            <input type="radio" name="schade" id="schade1">
            <label for="schade1">Schade</label><br>
            <input type="radio" name="schade" id="schade2">
            <label for="schade2">Schade2</label><br>
            <input type="text" name="schade" id="damage">
            <label for="damage">Is er schade</label><br>
            <button type="submit">Submit</button>
        </form>
        <h1>ID 144 </h1>
    </div>
`;
}
function annuleerRetour() {
    //maak een div om klant info weg te halen
    let klant =  this.closest('.klantinfo');
    // zoekt de klant info dichtbij de button die geduwd is en verwijderd deze
    klant.innerHTML = "<div><h1 class='nietterug'>product niet teruggebracht</h1><a href='../../frontend/Admin-interface/HoofdMenuAdmin.html'>Terug naar home</a></div>";
    //geeft een medling dat het product niet teruggebracht is en een link naar de home pagina

    //moet later nog database functionaliteit bij enzo
}


