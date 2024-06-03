function rot13(str) {
  return str.replace(/[A-Za-z]/g, function(c) {
    return String.fromCharCode(
      c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
    );
  });
}

const email = rot13(localStorage.getItem('username'));
console.log(email);

async function fetchUserData() {
  try {
    const response = await fetch('/profiel-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
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

window.onload = fetchUserData;