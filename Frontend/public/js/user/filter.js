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
    merkenLijst.innerHTML =  `
    <style>
        .popup-content a {
          text-decoration: none;
          color: #333; 
          padding: 6px 12px;
          border-radius: 4px;
          transition: all 0.3s ease; 
          display: inline-block;                  
          background-color: #fff;
      }
      
      .popup-content a:hover {
          color: #fff; 
          background-color: #ff4444;
          border-color: #333; 
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);  
      }
      </style>
      
</>
  `;
    if (merkenLijst) {
        merken.forEach(merk => {
            const merkProduct = document.createElement('div');
            merkProduct.innerHTML = `<a>${merk}</a>`;
            merkenLijst.appendChild(merkProduct);
            
            merkProduct.addEventListener('click', function(event) {
                filteren(event, merk, productenNamen, producten);
            });
        });
        document.getElementById('merkPopup').style.display = '';
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

    for(let i = 0; i < producten.length; i++){
        if(productenNamen[i]) {
            const productMerk = productenNamen[i].textContent.split(':')[0].trim();
            if(productMerk.toLowerCase() === merk.toLowerCase()){
                producten[i].style.display = '';
            } else {
                producten[i].style.display = 'none';
            }
        }
    }
}

document.getElementById('filter').addEventListener('click', toonPopUp);
document.getElementById('closeMerkPopup').addEventListener('click', sluitMerkPopup);