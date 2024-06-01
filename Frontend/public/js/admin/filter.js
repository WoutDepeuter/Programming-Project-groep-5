function toonPopUp(event) {
    event.preventDefault();
    const productenLijst = document.getElementById('alleProducten');
    const producten = productenLijst.getElementsByClassName('box');
    const productenNamen = productenLijst.getElementsByTagName('h2');
    const merken = new Set();

    for (let i = 0; i < producten.length; i++) {
        if (productenNamen[i]) {
            const merkNaam = productenNamen[i].textContent.split(':')[0].trim();
            merken.add(merkNaam);
        }
    }

    const merkenLijst = document.getElementById('merkenLijst');
    merkenLijst.innerHTML = '';
    if (merkenLijst) {
        merken.forEach(merk => {
            const merkProduct = document.createElement('div');
            merkProduct.innerHTML = `<a>${merk}</a>`;
            merkenLijst.appendChild(merkProduct);
            
            merkProduct.addEventListener('click', function(event) {
                filteren(event, merk, productenNamen, producten);
            });
        });
        document.getElementById('merkPopup').style.display = 'flex';
    } else {
        console.error('Element with id "merkenLijst" not found.');
    }
}

// Functie om de merk popup te sluiten
function sluitMerkPopup() {
    document.getElementById('merkPopup').style.display = 'none';
}

// Functie om te filteren op merk
function filteren(event, merk, productenNamen, producten) {
    event.preventDefault();
    document.getElementById('merkPopup').style.display = 'none';

    for (let i = 0; i < producten.length; i++) {
        if (productenNamen[i]) {
            const productMerk = productenNamen[i].textContent.split(':')[0].trim();
            if (productMerk.toLowerCase() === merk.toLowerCase()) {
                producten[i].style.display = 'block';
            } else {
                producten[i].style.display = 'none';
            }
        }
    }
}

document.getElementById('filter').addEventListener('click', toonPopUp);
document.getElementById('closeMerkPopup').addEventListener('click', sluitMerkPopup);