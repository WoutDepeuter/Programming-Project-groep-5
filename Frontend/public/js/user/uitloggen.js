document.getElementById('uitloggen').addEventListener('click', function() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
});