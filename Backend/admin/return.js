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
console.log('bevestigRetour');
}
function annuleerRetour() {
    
    let klant =  this.closest('.klantinfo');
    
    klant.innerHTML = ""
    
}

function extraklant()
{
 let ontvangen = document.getElementsByClassName('ontvangen');
 for (let i = 0; i < 10; i++) {
    let klant = document.createElement('div');
    klant.classList.add('klantinfo');

    
}