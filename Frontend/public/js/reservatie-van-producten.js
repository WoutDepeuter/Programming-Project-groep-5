document.addEventListener("DOMContentLoaded", function() {
    const volledigeUrlLink = window.location.pathname;
    const deelVanDeUrl = volledigeUrlLink.split('/');
    const productId = deelVanDeUrl[deelVanDeUrl.length - 1];
    console.log("Product ID:", productId);
    document.getElementById('reserveren').setAttribute('value', productId);
});

document.getElementById('reserveren').addEventListener("click", popUpReservatie);

function popUpReservatie(event){
    event.preventDefault();
    let van = document.getElementById('van-tijd').value;
    let tot = document.getElementById('tot-tijd').value;
    let antwoord = "";
    let vanDatum = new Date(van);
    let totDatum = new Date(tot);
    let vandaag = new Date();

    if (!van || !tot) {
        antwoord = `<p>Je hebt nog niet ingevuld van wanneer tot wanneer je het product wil reserveren</p><hr>`;
    } else if (vanDatum < vandaag) {
        antwoord = `<p>De <i>van datum</i> mag niet voor vandaag!</p><hr>`;
    } else if (totDatum < vanDatum) {
        antwoord = `<p>De <i>van datum</i> moet vroeger zijn dan de <i>tot datum</i>!</p><hr>`;
    } else {
        antwoord = `<form id="reservatieformulier-na-voorwaarden">
        <p><input id="akkoord-voorwaarden" type="checkbox" required>Ik ga akkoord met
        de <a id="link-gebruiksvoorwaarden" href="#nowhere">gebruikersvoorwaarden</a> voor het huren van materiaal</p>
        <button id="echte-reservatie" type="submit">Reserveren</button>
        </form><hr>`;
    }

    document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;

    if (document.getElementById('link-gebruiksvoorwaarden')) {
        document.getElementById('link-gebruiksvoorwaarden').addEventListener("click", popUpGebruiksvoorwaarden);
        document.getElementById('reservatieformulier-na-voorwaarden').addEventListener("submit", reservatieProduct);
    }
}

function reservatieProduct(event){
    event.preventDefault();
    let van = document.getElementById('van-tijd').value;
    let tot = document.getElementById('tot-tijd').value;
    let ProductId = document.getElementById('reserveren').getAttribute('value');
    let token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    console.log(ProductId, van, tot, user_ID, 'reservatieProduct')

    
    fetch(`/reservatie-van-producten/${ProductId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ van, tot, ProductId, user_ID })
    })
    .then(response => response.json())
    .then(data => {
        let antwoord = `<p>Reservatie succesvol ingevoerd!</p><hr>`;
        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
    })
    .catch(error => {
        console.error('Error:', error);
        let antwoord = `<p>Er is een fout opgetreden bij het invoeren van de reservatie.</p><hr>`;
        document.getElementById('pop-up-gebruikersvoorwaarden').innerHTML = antwoord;
    });
}

function popUpGebruiksvoorwaarden(event){
    event.preventDefault();
    let main = document.getElementById('pop-up-gebruikersvoorwaarden');
    main.innerHTML = `<h3>Gebruiksvoorwaarden voor het Huren van Materiaal</h3>
    <ol class="gebruiksvoorwaarden">
        <li><b>Huurperiode:</b> Het gehuurde materiaal wordt verhuurd voor de periode zoals overeengekomen tussen de verhuurder en de huurder,
        zoals gespecificeerd vereenkomst.</li>
        <li><b>Gebruik van het Materiaal:</b> De huurder stemt ermee in het gehuurde materiaal te gebruiken volgens de instructies van de
        verhuurder en alleen voor het beoogde gebruik zoals overeengekomen in de huurovereenkomst.</li>
        <li><b>Verantwoordelijkheden van de Huurder:</b> De huurder is verantwoordelijk voor het zorgvuldig gebruik en onderhoud van het gehuurde
        materiaal gedurende de huurperiode. Eventuele schade of verlies van het materiaal dient onmiddellijk gemeld te worden aan de
        verhuurder.</li>
        <li><b>Verzekering:</b> De huurder is verantwoordelijk voor het verzekeren van het gehuurde materiaal indien gewenst. De verhuurder is niet
        verantwoordelijk voor eventuele verliezen of schade aan het gehuurde materiaal.</li>
        <li><b>Ophalen en Terugbrengen:</b> De huurder dient het materiaal op te halen en terug te brengen op de afgesproken tijdstippen en locaties
        zoals vermeld in de huurovereenkomst. Eventuele kosten voor bezorging of ophalen zijn voor rekening van de huurder.</li>
        <li><b>Schade en Aansprakelijkheid</b>: De huurder is aansprakelijk voor eventuele schade aan het gehuurde materiaal tijdens de huurperiode
        en voor eventuele aansprakelijkheid voor letsel of schade aan derden veroorzaakt door het gebruik van het materiaal.</li>
        <li><b>Algemene Voorwaarden:</b> Deze gebruiksvoorwaarden vormen een integraal onderdeel van de huurovereenkomst. Door het vakje hieronder
        aan te vinken, verklaart de huurder dat hij/zij deze voorwaarden heeft gelezen, begrepen en ermee akkoord gaat.</li>
    </ol>
    <form id="reservatieformulier-na-voorwaarden">
        <p><input id="akkoord-voorwaarden" type="checkbox" required>Ik ga akkoord met
        de <a id="link-gebruiksvoorwaarden" href="#nowhere">gebruikersvoorwaarden</a> voor het huren van materiaal</p>
        <button id="echte-reservatie" type="submit">Reserveren</button>
    </form>
    <hr>`;
    document.getElementById('reservatieformulier-na-voorwaarden').addEventListener("submit", reservatieProduct);
}
