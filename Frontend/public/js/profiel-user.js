document.addEventListener('DOMContentLoaded', () => {
  const email = localStorage.getItem('email');

  if (!email) {
    console.error('Email not found in local storage');
    return;
  }

  fetch('/profiel-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Email: email }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    return response.json();
  })
  .then(data => {
    // Populate profile page with reservations data
    // Example: display reservations in a list or table
    const reservations = data.reservations;
    reservations.forEach(r => {
      // Display each reservation on the profile page
      // Example: append reservation details to a container element
    });
  })
  .catch(error => {
    console.error('Error fetching reservations:', error);
  });
});
