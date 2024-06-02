let email = localStorage.getItem('email');
if (email !== 'admin@ehb.be') {
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = '/homescreen'; // Adjust the login page URL as needed
}