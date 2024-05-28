'use strict';
document.getElementById('reserveren').addEventListener("click", popUpReservatie);

function popUpReservatie(event){
    event.preventDefault();
    let van = new Date(document.getElementById('van-tijd').value);
    let tot = new Date(document.getElementById('tot-tijd').value);
    let antwoord = "";
    let vandaag = new Date();

    if(van == "" || tot == ""){
        antwoord = `<p>Je hebt nog niet ingevuld van wanneer tot wanneer je het product wil reserveren</p><hr>`;

        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
    }
    else if(van <= vandaag){
        antwoord = `<p>De <i>van datum</i> mag niet vandaag of vroeger zijn!</p><hr>`;

        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
    }
    else if(tot < van){
        antwoord = `<p>De <i>van datum</i> moet vroeger zijn dan de <i>tot datum</i>!</p><hr>`;

        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
    }
    // specifiek voor studenten
    else if(true){
        let week = 7 * 24 * 60 * 60 * 1000
        if(van - vandaag >= week * 2){
            antwoord = `<p>Je mag maximum 2 weken vooraf reserveren</p><hr>`;

            document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
        }
        else if(tot - van >= week){
            antwoord = `<p>Als student mag je maar een reservatieperiode van 7 dagen kiezen</p><hr>`;

            document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
        }
        else{
            antwoord = `<form id="reservatieformulier-na-voorwaarden">
            <p><input id="akkoord-voorwaarden" type="checkbox" required>Ik ga akkoord met
            de <a id="link-gebruiksvoorwaarden" href="#nowhere">gebruikersvoorwaarden</a> voor het huren van materiaal</p>
            <button id="echte-reservatie" type="submit">Reserveren</button>
            </form><hr>`;
    
            document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
            document.getElementById('link-gebruiksvoorwaarden').addEventListener("click", popUpGebruiksvoorwaarden);
            document.getElementById('reservatieformulier-na-voorwaarden').addEventListener("submit", reservatieProduct);
        }
    }
    else{
        antwoord = `<form id="reservatieformulier-na-voorwaarden">
        <p><input id="akkoord-voorwaarden" type="checkbox" required>Ik ga akkoord met
        de <a id="link-gebruiksvoorwaarden" href="#nowhere">gebruikersvoorwaarden</a> voor het huren van materiaal</p>
        <button id="echte-reservatie" type="submit">Reserveren</button>
        </form><hr>`;

        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
        document.getElementById('link-gebruiksvoorwaarden').addEventListener("click", popUpGebruiksvoorwaarden);
        document.getElementById('reservatieformulier-na-voorwaarden').addEventListener("submit", reservatieProduct);
    }
}

function reservatieProduct(){
    let test = document.getElementById('akkoord-voorwaarden');
    console.log(test.value);
    let antwoord = `<p>Reservatie succesvol ingevoerd! <a id="terug-knop" href="/HomeScreen">Terug</a></p><hr>`;
    document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
    document.getElementById('pop-up-gebruikersvoorwaarden').style.color = 'green';

}

function popUpGebruiksvoorwaarden(){
    let main = document.getElementById('pop-up-gebruikersvoorwaarden');
    main.innerHTML = `<h3>Gebruiksvoorwaarden voor het Huren van Materiaal</h3>
    <ol class="gebruiksvoorwaarden">
        <li>
            <b>Huurperiode:</b> Het gehuurde materiaal wordt verhuurd voor de periode zoals overeengekomen tussen de verhuurder en de huurder,
            zoals gespecificeerd vereenkomst.
        </li>
        <li>
            <b>Gebruik van het Materiaal:</b> De huurder stemt ermee in het gehuurde materiaal te gebruiken volgens de instructies van de
            verhuurder en alleen voor het beoogde gebruik zoals overeengekomen in de huurovereenkomst.
        </li>
        <li>
            <b>Verantwoordelijkheden van de Huurder:</b> De huurder is verantwoordelijk voor het zorgvuldig gebruik en onderhoud van het gehuurde
            materiaal gedurende de huurperiode. Eventuele schade of verlies van het materiaal dient onmiddellijk gemeld te worden aan de
            verhuurder.
        </li>
        <li>
            <b>Verzekering:</b> De huurder is verantwoordelijk voor het verzekeren van het gehuurde materiaal indien gewenst. De verhuurder is niet
            verantwoordelijk voor eventuele verliezen of schade aan het gehuurde materiaal.
        </li>
        <li>
            <b>Ophalen en Terugbrengen:</b> De huurder dient het materiaal op te halen en terug te brengen op de afgesproken tijdstippen en locaties
            zoals vermeld in de huurovereenkomst. Eventuele kosten voor bezorging of ophalen zijn voor rekening van de huurder.
        </li>
        <li>
            <b>Schade en Aansprakelijkheid</b>: De huurder is aansprakelijk voor eventuele schade aan het gehuurde materiaal tijdens de huurperiode
            en voor eventuele aansprakelijkheid voor letsel of schade aan derden veroorzaakt door het gebruik van het materiaal.
        </li>
        <li>
            <b>Algemene Voorwaarden:</b> Deze gebruiksvoorwaarden vormen een integraal onderdeel van de huurovereenkomst. Door het vakje hieronder
            aan te vinken, verklaart de huurder dat hij/zij deze voorwaarden heeft gelezen, begrepen en ermee akkoord gaat.
        </li>
    </ol>
    <form id="reservatieformulier-na-voorwaarden">
        <p><input id="akkoord-voorwaarden" type="checkbox" required>Ik ga akkoord met
        de <a id="link-gebruiksvoorwaarden" href="#nowhere">gebruikersvoorwaarden</a> voor het huren van materiaal</p>
        <button id="echte-reservatie" type="submit">Reserveren</button>
    </form>
    <hr>`
    document.getElementById('reservatieformulier-na-voorwaarden').addEventListener("submit", reservatieProduct);
}