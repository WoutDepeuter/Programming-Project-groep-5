//toepassingen filter

const filterButton = document.getElementById('filter');
        const popupBackground = document.getElementById('popupBackground');
        const popupContent = document.getElementById('popupContent');
        const closeButton = document.getElementById('closeButton');

        // Functie om de pop-up te openen
        filterButton.addEventListener('click', () => {
            popupBackground.style.display = 'flex';
        });

        // Functie om de pop-up te sluiten
        closeButton.addEventListener('click', () => {
            popupBackground.style.display = 'none';
        });

        // Sluit de pop-up als je buiten de inhoud klikt
        popupBackground.addEventListener('click', (event) => {
            if (event.target === popupBackground) {
                popupBackground.style.display = 'none';
            }
        });