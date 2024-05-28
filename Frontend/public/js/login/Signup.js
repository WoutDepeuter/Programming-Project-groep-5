document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('sign-btn');
    signUpButton.addEventListener('click', function() {
        const email = document.querySelector('input[type="email"]').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                // Handle successful signup
            } else {
                // Handle failed signup
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
