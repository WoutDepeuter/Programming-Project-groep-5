console.log('Login page loaded');

function rot13(str) {
    return str.replace(/[A-Za-z]/g, function(c) {
      return String.fromCharCode(
        c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
      );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    checkIfAlreadyLoggedIn();
});

async function checkIfAlreadyLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const userInfoResponse = await fetch('/user-info', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (userInfoResponse.ok) {
                const userInfo = await userInfoResponse.json();
                showLoggedInMessage(userInfo.username);
                console.log('Already logged in');
            } else {
                console.error('Failed to fetch user info');
                localStorage.removeItem('token'); // Clear invalid token
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }
}

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
        localStorage.setItem('username', rot13(username));
        localStorage.setItem('token', data.token);
        showLoggedInMessage(username);
        console.log('Login successful');
        window.location.href = '/homescreen'; // Adjust the URL to your home screen route


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
    const loginMessage = document.getElementById('login-message');
    loginMessage.textContent = `Logged in as ${username}`;
    loginMessage.style.display = 'block';
}