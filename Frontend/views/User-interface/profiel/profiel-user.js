'use strict'



document.getElementById('probleem-bezitting').addEventListener("click", probleemStellen);

document.getElementById('annulatie-reservatie').addEventListener("click", annulerenReservatie);

function probleemStellen(){
    let main = document.getElementById('main');
    main.innerHTML = `<div class="volledig-probleem-form">
    <div>
    <h1>Is het product beschadigd?</h1>
    </div>
    <form id="probleemForm">
    <div class ="radio-container">
        <label for="schade1"><h2>JA</h2></label>
        <input type="radio" name="schade" id="schade1">
        <label for="schade2"><h2>NEE</h2></label>
        <input type="radio" name="schade" id="schade2">
        <br>
    </div>
    <div class="beschrijving">
        <h2>Beschrijving probleem:</h2>
        <textarea class="textarea-probleem" type="text" name="beschrijving" rows="8" cols="40"></textarea>
        <br>
        <button class="knop-probleem-versturen" type="submit">Verstuur</button>
    </div>
    </form>
</div>`;
}

function annulerenReservatie(){
    let main = document.getElementById('main');
    main.innerHTML = `<div class="volledig-annulatie-form">
    <div>
    <h1>Ben je zeker dat je de reservatie wilt annuleren?</h1>
    </div>
    <form id="annulatieForm">
        <label for="schade1"><h2>JA</h2></label>
        <input type="radio" name="schade" id="schade1">
        <label for="schade2"><h2>NEE</h2></label>
        <input type="radio" name="schade" id="schade2">
        <br>
        <button class="knop-probleem-versturen" type="submit">Verstuur</button>
    </form>
</div>`;
}