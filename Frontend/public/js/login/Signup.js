document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('sign-btn');
    signUpButton.addEventListener('click', function() {
        const email = document.querySelector('input[type="email"]').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        // Checken of email eindigt op @student.ehb.be
        function isGeldigStudentEmail(email) {
            const emailValidatie = /^[a-zA-Z0-9._%+-]+@student\.ehb\.be$/;
            return emailValidatie.test(email);
        }

        if(isGeldigStudentEmail(email) !== true){
            alert("De email die je hebt ingegeven is geen geldig student email");
        }

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
                window.location.href = '/login'; // Adjust the URL to your home screen route
            } else {
                // Handle failed signup
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
