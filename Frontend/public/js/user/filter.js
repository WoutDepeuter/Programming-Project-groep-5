function toonPopUp(event) {
    event.preventDefault();
    const productenLijst = document.getElementById('alleProducten');
    const producten = productenLijst.getElementsByClassName('box');
    const productenNamen = productenLijst.getElementsByTagName('h2');

    const merken = new Set();

    for (let i = 0; i < producten.length; i++) {
        const naamElement = producten[i].querySelector('h2');
        if (naamElement) {
            const merkNaam = naamElement.textContent.split(':')[0].trim();
            merken.add(merkNaam);
        }
    }

    const merkenLijst = document.getElementById('merkenLijst');
    merkenLijst.innerHTML = ''; // Maak de lijst leeg voordat je nieuwe items toevoegt
    if (merkenLijst) {
        merken.forEach(merk => {
            const merkElement = document.createElement('div');
            merkElement.innerHTML = `<a>${merk}</a>`;
            merkenLijst.appendChild(merkElement);
            
            // Voeg eventlistener toe aan elk merkElement
            merkElement.addEventListener('click', function(event) {
                filteren(event, merk, productenNamen, producten); // Geef event, merk, productenNamen en producten door aan filteren
            });
        });
        document.getElementById('merkPopup').style.display = 'flex'; // Gebruik 'flex' i.p.v. ''
    } else {
        console.error('Element with id "merkenLijst" not found.');
    }
}

function sluitMerkPopup() {
    document.getElementById('merkPopup').style.display = 'none';
}

function filteren(event, merk, productenNamen, producten){
    event.preventDefault();
    document.getElementById('merkPopup').style.display = 'none';
    let bericht = document.getElementById('bericht');

    for(let i = 0; i < producten.length; i++){
        const naamElement = producten[i].querySelector('h2');
        if(naamElement) {
            const productMerk = naamElement.textContent.split(':')[0].trim();
            if(productMerk.toLowerCase() === merk.toLowerCase()){
                producten[i].style.display = ''; // Toon het product als het overeenkomt met het geklikte merk
            } else {
                producten[i].style.display = 'none'; // Verberg het product als het niet overeenkomt met het geklikte merk
            }
        }
    }

    bericht.style.display = 'none'; // Verberg het bericht
}

document.getElementById('filter').addEventListener('click', toonPopUp);
document.getElementById('closeMerkPopup').addEventListener('click', sluitMerkPopup);

document.getElementById('filter').addEventListener('click', toonPopUp);
document.getElementById('closeMerkPopup').addEventListener('click', sluitMerkPopup);