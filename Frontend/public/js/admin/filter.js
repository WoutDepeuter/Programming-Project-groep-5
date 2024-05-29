document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filter');

    function createFilterPopup() {
        if (document.getElementById('filterPopupBackground')) {
            return;
        }

        const popupBackground = document.createElement('div');
        popupBackground.classList.add('popup-background-filter');
        popupBackground.id = 'filterPopupBackground';
        
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content-filter');
        popupContent.id = 'filterPopupContent';
        
        const title = document.createElement('h2');
        title.textContent = 'Selecteer Filters';
        popupContent.appendChild(title);
        
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
        
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-btn-filter');
        closeButton.id = 'closeButton';
        closeButton.textContent = 'Sluiten';
        popupContent.appendChild(closeButton);
        
        popupBackground.appendChild(popupContent);
        
        document.body.appendChild(popupBackground);
        
        closeButton.addEventListener('click', function () {
            popupBackground.style.display = 'none';
        });
        
        popupBackground.addEventListener('click', function (event) {
            if (event.target === popupBackground) {
                popupBackground.style.display = 'none';
            }
        });
    }

    function createDeletePopup() {
        if (document.getElementById('deletePopupBackground')) {
            return;
        }

        const popupBackground = document.createElement('div');
        popupBackground.classList.add('popup-background');
        popupBackground.id = 'deletePopupBackground';
        
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        popupContent.id = 'deletePopupContent';
        
        const title = document.createElement('h2');
        title.textContent = 'Are you sure you want to delete this item?';
        popupContent.appendChild(title);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        
        const yesButton = document.createElement('button');
        yesButton.classList.add('yes-btn-filter');
        yesButton.id = 'yesButton';
        yesButton.textContent = 'Yes';
        buttonContainer.appendChild(yesButton);
        
        const noButton = document.createElement('button');
        noButton.classList.add('no-btn-filter');
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
    }
    
    filterButton.addEventListener('click', function () {
        createFilterPopup();
        const popupBackground = document.getElementById('filterPopupBackground');
        popupBackground.style.display = 'flex';
    });
});
