const username = localStorage.getItem('username');
    if (username) {
        const profileLink = document.getElementById('profile-link');
        profileLink.href = `/profiel-user/${username}`;
}