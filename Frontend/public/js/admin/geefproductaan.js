//functie om product aan gebruiker te geven
//Als de gebruiker op de geef knop klikt wordt het product aan de gebruiker gegeven
//De gebruiker krijgt een melding dat het product is gegeven
//Als er een error is wordt er een melding gegeven dat er een error is
//De gebruiker wordt doorgestuurd naar de homepagina


document.addEventListener('DOMContentLoaded', function () {
    const giveButtons = document.querySelectorAll('.give-button'); // Select both buttons
    giveButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const reservationId = button.dataset.reservationId;
            const productId = button.dataset.productId;
            const userId = button.dataset.userId;  // Corrected the dataset property

            try {
                const response = await fetch('/geefproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId, reservationId, userId })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const responseData = await response.text();
                alert(responseData);

            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                alert('Error returning product');
            }
        });
    });
});