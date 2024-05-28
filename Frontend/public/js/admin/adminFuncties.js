console.log('adminFuncties.js loaded');
const deleteButtons = document.getElementsByClassName('delete');

// Function to create the popup elements
function createDelPopup() {
    if (document.getElementById('popupBackground')) {
        // Popup already exists, no need to create another
        return;
    }

    // Create popup background
    const popupBackground = document.createElement('div');
    popupBackground.classList.add('popup-background');
    popupBackground.id = 'popupBackground';
    popupBackground.style.display = 'none'; // Ensure the popup is hidden initially

    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popupContent.id = 'popupContent';

    // Create popup title
    const title = document.createElement('h2');
    title.textContent = 'Are you sure you want to delete this item?';
    popupContent.appendChild(title);

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Create yes button
    const yesButton = document.createElement('button');
    yesButton.classList.add('yes-btn');
    yesButton.id = 'yesButton';
    yesButton.textContent = 'Yes';
    buttonContainer.appendChild(yesButton);

    // Create no button
    const noButton = document.createElement('button');
    noButton.classList.add('no-btn');
    noButton.id = 'noButton';
    noButton.textContent = 'No';
    buttonContainer.appendChild(noButton);

    // Append button container to popup content
    popupContent.appendChild(buttonContainer);

    // Append popup content to background
    popupBackground.appendChild(popupContent);

    // Append popup background to body
    document.body.appendChild(popupBackground);

    // Add event listener to no button
    noButton.addEventListener('click', function () {
        popupBackground.style.display = 'none';
    });

    // Add event listener to close popup when clicking outside its content
    popupBackground.addEventListener('click', function (event) {
        if (event.target === popupBackground) {
            popupBackground.style.display = 'none';
        }
    });

    return { yesButton, popupBackground };
}

// Create the popup once when DOM is loaded
const { yesButton, popupBackground } = createDelPopup();

// Function to open the popup for each delete button
Array.from(deleteButtons).forEach(button => {
    button.addEventListener('click', function () {
        popupBackground.style.display = 'flex';

        yesButton.onclick = () => {
            const productId = button.getAttribute('data-product-id');
            deleteProduct(productId);
            console.log('Item deleted');

            alert('Item deleted');
            popupBackground.style.display = 'none';
        };
    });
});

function deleteItem(productId) {
    fetch('/deleteProduct', {
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