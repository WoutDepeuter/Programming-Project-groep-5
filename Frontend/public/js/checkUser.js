// ALS USER NIET INGELOGD IS (HEEFT GEEN ROL STUDENT DOCENT OF ADMIN WORDT HIJ DOORGESTUURD NAAR DE LOGIN PAGINA)

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