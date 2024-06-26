document.addEventListener('DOMContentLoaded', function () {
    const returnButtons = document.querySelectorAll('.annuleer-knop');
    returnButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const reservationId = button.dataset.reservationId;
            const productId = button.dataset.productId;
            try {
                const response = await fetch('/annuleer-besteling', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId: productId, reservationId: reservationId })
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