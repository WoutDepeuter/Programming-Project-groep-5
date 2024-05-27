const productenLijst = document.getElementById('alleProducten');
const productenNamen = productenLijst.getElementsByTagName('h2');
const producten = productenLijst.getElementsByClassName('box');

document.getElementById('zoekbalk').addEventListener('keyup', zoekProduct);

function zoekProduct(event){
    event.preventDefault();
    let zoekInvoer = document.getElementById('zoekbalk').value.toLowerCase();
    let zienbareProducten = [];
    let bericht = document.getElementById('bericht');
    for(let i = 0; i < productenNamen.length; i++){
        if(productenNamen[i].textContent.toLowerCase().includes(zoekInvoer)){
            producten[i].style.display = '';
            bericht.style.display = 'none';
            zienbareProducten.push(producten[i]);
        }else{
            producten[i].style.display = 'none';
        }
    }
    if(zienbareProducten.length < 1){
        console.log(zienbareProducten);
        bericht.innerHTML = `<h2>Er zijn geen producten met deze naam</h2>`;
        bericht.style.display = '';
        bericht.style.margin = '0 0 0 2em';
    }
}