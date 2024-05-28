const productenLijst = document.querySelector('.container-producten');
const productenBoxes = productenLijst.getElementsByClassName('box');
const productenNamen = productenLijst.getElementsByTagName('h2');
document.getElementById('zoekbalk').addEventListener('keyup', zoekProduct);

function zoekProduct(event) {
    event.preventDefault();
    let zoekInvoer = document.getElementById('zoekbalk').value.toLowerCase();
    let zienbareProducten = [];
    let bericht = document.getElementById('bericht') || document.createElement('div');
    
    bericht.id = 'bericht';
    if (!document.getElementById('bericht')) {
        productenLijst.appendChild(bericht);
    }
    
    for (let i = 0; i < productenNamen.length; i++) {
        const productBox = productenBoxes[i];
        if (productenNamen[i].textContent.toLowerCase().includes(zoekInvoer)) {
            productBox.style.display = '';
            bericht.style.display = 'none';
            zienbareProducten.push(productBox);
        } else {
            productBox.style.display = 'none';
        }
    }

    if (zienbareProducten.length < 1) {
        bericht.innerHTML = `<h2>Er zijn geen producten met deze naam</h2>`;
        bericht.style.display = '';
        bericht.style.margin = '0 0 0 2em';
    } else {
        bericht.style.display = 'none';
    }
}
