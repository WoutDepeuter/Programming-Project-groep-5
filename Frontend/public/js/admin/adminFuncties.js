console.log('adminFuncties.js loaded');
const deleteButtons = document.getElementsByClassName('delete');

// Function to create the popup elements
function createDelPopup() {
    if (document.getElementById('popupBackground')) {
      
        return;
    }

  
    const popupBackground = document.createElement('div');
    popupBackground.classList.add('popup-background');
    popupBackground.id = 'popupBackground';
    popupBackground.style.display = 'none'; 


    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popupContent.id = 'popupContent';


    const title = document.createElement('h2');
    title.textContent = 'Are you sure you want to delete this item?';
    popupContent.appendChild(title);

   
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const yesButton = document.createElement('button');
    yesButton.classList.add('yes-btn');
    yesButton.id = 'yesButton';
    yesButton.textContent = 'Yes';
    buttonContainer.appendChild(yesButton);

 
    const noButton = document.createElement('button');
    noButton.classList.add('no-btn');
    noButton.id = 'noButton';
    noButton.textContent = 'No';
    buttonContainer.appendChild(noButton);

    popupContent.appendChild(buttonContainer);


    popupBackground.appendChild(popupContent);


    document.body.appendChild(popupBackground);

    
    noButton.addEventListener('click', function () {
        popupBackground.style.display = 'none';
    });


    popupBackground.addEventListener('click', function (event) {
        if (event.target === popupBackground) {
            popupBackground.style.display = 'none';
        }
    });

    return { yesButton, popupBackground };
}


const { yesButton, popupBackground } = createDelPopup();

Array.from(deleteButtons).forEach(button => {
    button.addEventListener('click', function () {
        popupBackground.style.display = 'flex';
        yesButton.onclick = () => {
            const productId = button.getAttribute('data-product-id'); 
            console.log('Deleting product with ID:', productId); // Log the productId
            deleteProduct(productId);
            console.log('Item deleted');

            alert('Item deleted');
            popupBackground.style.display = 'none';
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete');
    const popupBackground = document.getElementById('popupOverlay');
    const yesButton = document.getElementById('yesButton');
    
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = button.getAttribute('data-product-id');
        console.log('Deleting product with ID:', productId);
        popupBackground.style.display = 'flex';
        
        yesButton.onclick = () => {
          deleteProduct(productId);
          console.log('Item deleted');
          alert('Item deleted');
          popupBackground.style.display = 'none';
        };
      });
    });
  
    popupBackground.addEventListener('click', (e) => {
      if (e.target === popupBackground) {
        popupBackground.style.display = 'none';
      }
    });
  });
  
  function deleteProduct(productId) {
    fetch('/deleteproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting product');
      }
      console.log('Product deleted successfully');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
