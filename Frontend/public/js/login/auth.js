//script om te checken of de gebruiker is ingelogd
//als de gebruiker is ingelogd wordt de gebruikersnaam en email getoond

async function checkIfLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
        redirectToLogin();
        return;
    }

    try {
        const response = await fetch('/user-info', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userInfo = await response.json();
            showLoggedInMessage(userInfo.username);
            showUserInfo(userInfo);
        } else {
            console.error('Failed to fetch user info, redirecting to login');
            localStorage.removeItem('token');
            redirectToLogin();
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        localStorage.removeItem('token');
        redirectToLogin();
    }
}

function showLoggedInMessage(username) {
    const loginMessage = document.getElementById('login-message');
    if (loginMessage) {
        loginMessage.textContent = `Logged in as ${username}`;
        loginMessage.style.display = 'block';
    }
}

function showUserInfo(userInfo) {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <p>Username: ${userInfo.username}</p>
            <p>Email: ${userInfo.email}</p>
        `;
        userInfoElement.style.display = 'block';
    }
}

function redirectToLogin() {
    window.location.href = '/login'; 
}


document.addEventListener('DOMContentLoaded', () => {
    checkIfLoggedIn();
});