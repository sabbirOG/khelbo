// Redirect to inbox when notification bell is clicked
document.addEventListener('DOMContentLoaded', function() {
	var notifyBtn = document.getElementById('dashboard-notify');
	if (notifyBtn) {
		notifyBtn.addEventListener('click', function() {
			window.location.href = '../html/inbox.html';
		});
	}
});

// Redirect to homepage on logout click
document.addEventListener('DOMContentLoaded', function() {
	var logoutBtn = document.querySelector('.logout-btn');
	if (logoutBtn) {
		logoutBtn.addEventListener('click', function(e) {
			e.preventDefault();
			window.location.href = '../../index.html';
		});
	}
});
// Show profile content only when Profile is clicked
document.addEventListener('DOMContentLoaded', function() {
	var profileContent = document.getElementById('dashboardProfileContent');
	var navLinks = document.querySelectorAll('.dashboard-vertical-navbar a');
	function showProfileContent(show) {
		if (profileContent) profileContent.style.display = show ? '' : 'none';
	}
	navLinks.forEach(function(link) {
		link.addEventListener('click', function(e) {
			if (link.getAttribute('href') === '#profile') {
				e.preventDefault();
				showProfileContent(true);
				navLinks.forEach(l => l.parentElement.classList.remove('active'));
				link.parentElement.classList.add('active');
			} else {
				showProfileContent(false);
				navLinks.forEach(l => l.parentElement.classList.remove('active'));
				link.parentElement.classList.add('active');
			}
		});
	});
	// Optionally, show profile by default on load
	showProfileContent(false);
});

