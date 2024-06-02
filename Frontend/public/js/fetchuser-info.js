// Fetch email from local storage
const email = localStorage.getItem('username');
console.log(email);

// Function to send the email to the server
async function fetchUserData() {
  try {
    const response = await fetch('/profiel-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email }) // Pass email in the request body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const htmlContent = await response.text();
    document.getElementById('main').innerHTML = htmlContent;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Call the function to fetch user data when the page loads
window.onload = fetchUserData;