document.getElementById('showLogin').onclick = function() {
    document.getElementById('loginForm').style.display = '';
    document.getElementById('signupForm').style.display = 'none';
    this.classList.add('active');
    document.getElementById('showSignup').classList.remove('active');
};
document.getElementById('showSignup').onclick = function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = '';
    this.classList.add('active');
    document.getElementById('showLogin').classList.remove('active');
};

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    alert('Login functionality coming soon!');
};
document.getElementById('signupForm').onsubmit = function(e) {
    e.preventDefault();
    alert('Signup functionality coming soon!');
};
