const productenLijst = document.getElementById('alleProducten');
const producten = productenLijst.getElementsByTagName('h2');
const test = productenLijst.getElementsByClassName('box');

document.getElementById('zoekbalk').addEventListener('keyup', zoekProduct);

function zoekProduct(event){
    event.preventDefault();
    let zoekInvoer = document.getElementById('zoekbalk').value.toLowerCase();
    console.log(zoekInvoer);
    for(let i = 0; i < producten.length; i++){
        if(producten[i].textContent.toLowerCase().includes(zoekInvoer)){
            test[i].style.display = '';
        }else{
            test[i].style.display = 'none';
        }
    }
}