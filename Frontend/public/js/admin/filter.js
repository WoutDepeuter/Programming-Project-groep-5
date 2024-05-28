document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filter');

    // Function to create the popup elements
    function createPopup() {
        // Create popup background
        const popupBackground = document.createElement('div');
        popupBackground.classList.add('popup-background');
        popupBackground.id = 'popupBackground';
        
        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        popupContent.id = 'popupContent';
        
        // Create popup title
        const title = document.createElement('h2');
        title.textContent = 'Selecteer Filters';
        popupContent.appendChild(title);
        
        // Create checkbox list
        const checkboxList = document.createElement('div');
        checkboxList.classList.add('checkbox-list');
        const checkboxLabel = document.createElement('label');
        const checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.setAttribute('name', 'type');
        checkboxInput.setAttribute('value', 'type1');
        checkboxLabel.appendChild(checkboxInput);
        checkboxLabel.appendChild(document.createTextNode('Type 1'));
        checkboxList.appendChild(checkboxLabel);
        popupContent.appendChild(checkboxList);
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-btn');
        closeButton.id = 'closeButton';
        closeButton.textContent = 'Sluiten';
        popupContent.appendChild(closeButton);
        
        // Append popup content to background
        popupBackground.appendChild(popupContent);
        
        // Append popup background to body
        document.body.appendChild(popupBackground);
        
        // Add event listener to close button
        closeButton.addEventListener('click', function () {
            popupBackground.style.display = 'none';
        });
        
        // Close the popup when clicking outside its content
        popupBackground.addEventListener('click', function (event) {
            if (event.target === popupBackground) {
                popupBackground.style.display = 'none';
            }
        });
    }
    
    // Function to open the popup
    filterButton.addEventListener('click', function () {
        createPopup();
        const popupBackground = document.getElementById('popupBackground');
        popupBackground.style.display = 'flex';
    });
});
