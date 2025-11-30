// Main JS for Khelbo
console.log('Khelbo loaded');

// Dummy data for tournaments and clubs
const tournaments = [
	{ name: 'Khelbo Masters', date: 'Dec 16, 2025', game: 'Valorant', prize: '$5,000' },
	{ name: 'Cyber Cup', date: 'Dec 28, 2025', game: 'eFootball', prize: '$2,500' },
	{ name: 'Winter Royale', date: 'Jan 8, 2026', game: 'CS:GO', prize: '$3,000' },
	{ name: 'Spring Showdown', date: 'Jan 19, 2026', game: 'Fortnite', prize: '$4,000' },
	{ name: 'Neon Arena', date: 'May 12, 2026', game: 'Rocket League', prize: '$3,500' },
];

const clubs = [
	{
		name: 'Alpha Gamers',
		logo: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="24" cy="24" r="24" fill="#FFD700"/>
			<text x="24" y="28" text-anchor="middle" fill="#232323" font-size="22" font-family="Orbitron, Arial" font-weight="bold" dy=".3em">A</text>
		</svg>`
	},
	{
		name: 'Night Owls',
		logo: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="24" cy="24" r="24" fill="#FFD700"/>
			<ellipse cx="24" cy="30" rx="12" ry="8" fill="#232323"/>
			<ellipse cx="17" cy="28" rx="2.5" ry="3.5" fill="#fff"/>
			<ellipse cx="31" cy="28" rx="2.5" ry="3.5" fill="#fff"/>
			<ellipse cx="17" cy="28" rx="1.2" ry="1.7" fill="#FF2D2D"/>
			<ellipse cx="31" cy="28" rx="1.2" ry="1.7" fill="#FF2D2D"/>
			<path d="M16 20 Q24 10 32 20" stroke="#fff" stroke-width="2" fill="none"/>
		</svg>`
	},
	{
		name: 'Pixel Warriors',
		logo: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="8" y="8" width="32" height="32" rx="8" fill="#FFD700"/>
			<text x="50%" y="55%" text-anchor="middle" fill="#232323" font-size="18" font-family="Orbitron, Arial" dy=".3em">PW</text>
		</svg>`
	}
];

// Render tournaments carousel
function renderTournaments() {
	const carousel = document.getElementById('tournamentCarousel');
	if (!carousel) return;
	carousel.innerHTML = '';
	tournaments.forEach(t => {
		const card = document.createElement('div');
		card.className = 'tournament-card';
		card.innerHTML = `
			<h3>${t.name}</h3>
			<p><strong>Game:</strong> ${t.game}</p>
			<p><strong>Date:</strong> ${t.date}</p>
			<p><strong>Prize:</strong> ${t.prize}</p>
			<button class="register-btn" onclick=\"alert('Register for ${t.name}!')\">Register</button>
		`;
		carousel.appendChild(card);
	});
}

// Render clubs
function renderClubs() {
	const clubsList = document.getElementById('clubsList');
	if (!clubsList) return;
	clubsList.innerHTML = '';
	clubs.forEach(c => {
		const card = document.createElement('div');
		card.className = 'club-card';
		card.innerHTML = `
			<div class="club-logo-svg">${c.logo}</div>
			<div class="club-name">${c.name}</div>
		`;
		clubsList.appendChild(card);
	});
}

// Simulate CTA button actions
document.addEventListener('DOMContentLoaded', () => {
	renderTournaments();
	renderClubs();
	document.getElementById('joinTournamentBtn').onclick = () => {
		alert('Join Tournament feature coming soon!');
	};
	document.getElementById('createClubBtn').onclick = () => {
		alert('Create Club feature coming soon!');
	};
	document.getElementById('watchLiveBtn').onclick = () => {
		alert('Watch Live feature coming soon!');
	};

	// Hamburger menu toggle for mobile
	const hamburger = document.getElementById('hamburgerMenu');
	const navLinks = document.getElementById('navLinks');
	if (hamburger && navLinks) {
		hamburger.addEventListener('click', function() {
			const isOpen = navLinks.classList.toggle('open');
			this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});
		// Optional: close menu when a link is clicked (mobile UX)
		navLinks.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navLinks.classList.remove('open');
				hamburger.setAttribute('aria-expanded', 'false');
			});
		});
	}
});