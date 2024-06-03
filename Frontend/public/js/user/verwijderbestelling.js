document.getElementById('annulatie-reservatie').addEventListener('click', function() {
    var reservationId = this.getAttribute('data-reservation_id');
    console.log('Reservation ID:', reservationId);
    // Perform any other actions with reservationId here
});