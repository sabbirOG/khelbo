// Show/hide password toggle
document.querySelectorAll('.password-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const btn = wrapper.querySelector('.toggle-password');
    const toggleText = btn.querySelector('.toggle-text');
    btn.addEventListener('click', function() {
        if (input.type === 'password') {
            input.type = 'text';
            btn.classList.add('active');
            toggleText.textContent = 'Hide';
        } else {
            input.type = 'password';
            btn.classList.remove('active');
            toggleText.textContent = 'Show';
        }
    });
});
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


// Neon alert logic
function showNeonAlert(message, type = 'error', duration = 2200) {
    const alertBox = document.getElementById('neon-alert');
    alertBox.textContent = message;
    alertBox.className = `neon-alert show ${type}`;
    alertBox.style.display = '';
    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => { alertBox.style.display = 'none'; }, 400);
    }, duration);
}

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    // Example: Validate input (simulate error)
    const inputs = this.querySelectorAll('input');
    let valid = true;
    inputs.forEach(inp => { if (!inp.value.trim()) valid = false; });
    if (!valid) {
        showNeonAlert('Please fill in all fields.', 'error');
        return;
    }
    // Simulate successful login and redirect to dashboard
    showNeonAlert('Login successful! Redirecting...', 'success');
    setTimeout(function() {
        window.location.href = 'dashboard.html';
    }, 1200);
};

document.getElementById('signupForm').onsubmit = function(e) {
    e.preventDefault();
    // Example: Validate input (simulate error)
    const inputs = this.querySelectorAll('input');
    let valid = true;
    inputs.forEach(inp => { if (!inp.value.trim()) valid = false; });
    if (!valid) {
        showNeonAlert('Please fill in all fields.', 'error');
        return;
    }
    // Simulate successful signup and redirect to dashboard
    showNeonAlert('Signup successful! Redirecting...', 'success');
    setTimeout(function() {
        window.location.href = 'dashboard.html';
    }, 1200);
};
