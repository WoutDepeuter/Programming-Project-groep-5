document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete');
    const { yesButton, popupBackground } = createDelPopup();

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            popupBackground.style.display = 'flex';
            yesButton.onclick = () => {
                const productId = button.getAttribute('data-product-id');
                console.log('Deleting product with ID:', productId);
                deleteProduct(productId);
                console.log('Item deleted');
                popupBackground.style.display = 'none';
                setInterval(() => {            window.location.reload();
                }, 500);
            };

        });
    });

    // Popup verbergen wanneer op de achtergrond wordt geklikt
    popupBackground.addEventListener('click', (event) => {
        if (event.target === popupBackground) {
            popupBackground.style.display = 'none';
        }
    });
});

// Functie om de popup te maken
function createDelPopup() {
    if (document.getElementById('popupBackground')) {
        return {
            yesButton: document.getElementById('yesButton'),
            popupBackground: document.getElementById('popupBackground')
        };
    }

    const popupBackground = document.createElement('div');
    popupBackground.classList.add('popup-background-verwijderen');
    popupBackground.id = 'popupBackground';
    popupBackground.style.display = 'none';

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content-verwijderen');
    popupContent.id = 'popupContent';

    const title = document.createElement('h2');
    title.textContent = 'Bent u zeker dat u dit product wilt verwijderen?';
    popupContent.appendChild(title);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container-verwijderen');

    const yesButton = document.createElement('button');
    yesButton.classList.add('yes-btn-verwijderen');
    yesButton.id = 'yesButton';
    yesButton.textContent = 'Ja';
    buttonContainer.appendChild(yesButton);

    const noButton = document.createElement('button');
    noButton.classList.add('no-btn-verwijderen');
    noButton.id = 'noButton';
    noButton.textContent = 'Nee';
    buttonContainer.appendChild(noButton);

    popupContent.appendChild(buttonContainer);
    popupBackground.appendChild(popupContent);
    document.body.appendChild(popupBackground);

    noButton.addEventListener('click', function () {
        popupBackground.style.display = 'none';
    });

    return { yesButton, popupBackground };
}

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