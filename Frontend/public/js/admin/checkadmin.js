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