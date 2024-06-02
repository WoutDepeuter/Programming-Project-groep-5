let token = localStorage.getItem('token');
let resultnation = getRoleFromToken(token);

function getRoleFromToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    console.log(payload.role);
    return payload.role;
}

console.log(`Jones barbeque foot massage: ${resultnation}`);

if (resultnation !== "admin") {
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = '/homescreen';
}

// let email = localStorage.getItem('email');
// if (email !== 'admin@ehb.be') {
//     redirectToLogin();
// }