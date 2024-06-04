//script als het product wordt teruggebracht
//er wordt een fetch gedaan naar de backend
// in de backend word het product terug op beschikbaar (0) gezet
//er wordt een melding gegeven dat het product is teruggebracht
//de pagina wordt herladen

document.addEventListener('DOMContentLoaded', function () {
    const returnButtons = document.querySelectorAll('.uitgeleend');
    returnButtons.forEach(button => {
        button.addEventListener('click', async () => {
        
            const productId = button.dataset.productId;
            try {
                const response = await fetch('/leen', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId: productId })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const responseData = await response.text();
                alert(responseData); 
                window.location.reload();

            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
                alert('Error returning product');
            }
        });
    });
});
