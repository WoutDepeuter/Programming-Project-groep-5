//functie om te checjen of de gebruiker een admin is
//Als de gebruiker geen admin is wordt hij terug gestuurd naar de login pagina
//Als de gebruiker wel een admin is wordt hij doorgestuurd naar de admin pagina


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
            
            if (role !== "admin") {
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