// ALS USER NIET INGELOGD IS (HEEFT GEEN ROL STUDENT DOCENT OF ADMIN WORDT HIJ DOORGESTUURD NAAR DE LOGIN PAGINA)
//script om te checken of de gebruiker is ingelogd
//als de gebruiker is ingelogd wordt de gebruikersnaam en email getoond
//als de gebruiker niet is ingelogd wordt hij doorgestuurd naar de login pagina

function getRoleFromBackend(token) {
    fetch("/getRole", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Backend error:", data.error);
            redirectToLogin();
        } else {
            const role = data.role;
            console.log("Leesbare (ontcijferd) rol:", role);
            
            if (role == "") {
                redirectToLogin();
            }
        }
    })
    .catch(error => {
        console.error("Error fetching role:", error);
        redirectToLogin();
    });
}

let token = localStorage.getItem('token');
if (token) {
    getRoleFromBackend(token);
} else {
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = '/homescreen';
}