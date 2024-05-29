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

        // Fetch user info
        const userInfoResponse = await fetch('/user-info', {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            showUserInfo(userInfo);
        } else {
            console.error('Failed to fetch user info');
        }
    } else {
        document.getElementById('message').textContent = 'Invalid credentials';
    }
}

function showLoggedInMessage(username) {
    // Show login success message
    const loggedInMessage = document.getElementById('logged-in-message');
    loggedInMessage.textContent = `Logged in as ${username}`;
    loggedInMessage.style.display = 'block';
}

function showUserInfo(userInfo) {
    // Display user info
    const userInfoElement = document.getElementById('user-info');
    userInfoElement.innerHTML = `
        <p>Username: ${userInfo.username}</p>
        <p>Email: ${userInfo.email}</p>
    `;
    userInfoElement.style.display = 'block';
}

function showLoggedInMessage(username) {
    // Show login success message
    const loginMessage = document.getElementById('login-message');
    loginMessage.textContent = `Logged in as ${username}`;


    loginMessage.style.display = 'block';
}