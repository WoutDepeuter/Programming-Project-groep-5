document.addEventListener('DOMContentLoaded', (event) => {
    const reserveButtons = document.querySelectorAll('#reserveren');
    const productPopup = document.getElementById('productPopup');
    const closePopupButton = document.getElementById('closePopup');
    const productDetails = document.getElementById('productDetails');
  
    reserveButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        productDetails.innerHTML = `
        <div class="popup-box">
        <!-- Content of the box goes here -->
      </div>
        `;
  
        productPopup.style.display = 'flex';
      });
    });
  
    closePopupButton.addEventListener('click', () => {
      productPopup.style.display = 'none';
    });
  
    productPopup.addEventListener('click', (e) => {
      if (e.target === productPopup) {
        productPopup.style.display = 'none';
      }
    });
  });
  