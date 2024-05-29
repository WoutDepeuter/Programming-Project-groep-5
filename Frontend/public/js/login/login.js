console.log('Login page loaded');

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        showLoggedInMessage(username);
        console.log('Login successful');
    } else {
        document.getElementById('message').textContent = 'Invalid credentials';
    }
}
