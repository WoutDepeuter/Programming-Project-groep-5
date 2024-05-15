'use strict'

document.getElementById('reserveren').addEventListener("click", popUpReservatie);

function popUpReservatie(event){
    event.preventDefault();
    let van = document.getElementById('van-tijd').value;
    let tot = document.getElementById('tot-tijd').value;
    let antwoord = "";

    if(van == "" || tot == ""){
        antwoord = `<p>Je hebt nog niet ingevuld van wanneer tot wanneer je het product wil reserveren</p><hr>`;

        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
    }else{
        antwoord = `<form id="reservatieformulier-na-voorwaarden"><p><input id="akkoord-voorwaarden" type="checkbox" required>Ik ga akkoord met
        de <a href="gebruikersvoorwaarden.html">gebruikersvoorwaarden</a> voor het huren van materiaal</p>
        <button id="echte-reservatie" type="button">Reserveren</button></form><hr>`;

        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
        document.getElementById('echte-reservatie').addEventListener("click", reservatieProduct);
    }
}

function reservatieProduct(){
    let test = document.getElementById('akkoord-voorwaarden');
    console.log(test.value);
    let antwoord = `<p>Reservatie succesvol ingevoerd</p><hr>`;
    document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
}