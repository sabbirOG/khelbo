// --- Sidebar Expandable Games Category ---
document.addEventListener('DOMContentLoaded', function() {
  const gamesCategory = document.getElementById('games-category');
  if (gamesCategory) {
    gamesCategory.addEventListener('click', function(e) {
      // Prevent toggling when clicking a subcategory
      if (e.target !== gamesCategory) return;
      const sub = gamesCategory.querySelector('.games-subcategories');
      if (sub) {
        sub.style.display = (sub.style.display === 'none' || sub.style.display === '') ? 'block' : 'none';
      }
    });
  }
});
  // --- Basic Pagination for Live Streams Grid ---
  const streamsPerPage = 2;
  const liveStreams = [
    {
      video: 'https://www.youtube.com/embed/kiQFlbqXANE?si=ZV5ISB35jJaVsySc&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0',
      thumb: null,
      viewers: '8.2K',
      title: 'EAFC 25 Challenge',
      streamer: 'neon & on',
      avatar: '../img/avatar.svg',
      live: true
    },
    {
      video: 'https://www.youtube.com/embed/zyx0Ae7zzLM?si=EC0SBZFJH9PQgBJk&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0',
      thumb: null,
      viewers: '5.1K',
      title: 'PUBG Masterclass',
      streamer: 'Levinho',
      avatar: '../img/avatar.svg',
      live: true
    },
    {
      video: 'https://www.youtube.com/embed/fuRBWZ7NmMs?si=J_wDjtsDmUwlDeJy&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0',
      thumb: null,
      viewers: '3.2K',
      title: "let's go bang",
      streamer: 'A2Red',
      avatar: '../img/avatar.svg',
      live: true
    },
    {
      video: 'https://www.youtube.com/embed/XsaXfkpKPNM?si=STvtegwNHVXb75Tm&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0',
      thumb: null,
      viewers: '4.5K',
      title: "let's have fun",
      streamer: 'PPV zerox',
      avatar: '../img/avatar.svg',
      live: true
    },
    {
      video: 'https://www.youtube.com/embed/hZ6Jpf2i1cw?si=YxP72xXB7FJ914Tr&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0',
      thumb: null,
      viewers: '3.7K',
      title: 'New Indie Adventure',
      streamer: 'GameMasterX',
      avatar: '../img/avatar.svg',
      live: true
    },
    {
      video: 'https://www.youtube.com/embed/iWWox240TpI?si=Nzt9TsEpgIDNyqOa&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0',
      thumb: null,
      viewers: '1.1K',
      title: 'New Stream',
      streamer: 'gtx gamer',
      avatar: '../img/avatar.svg',
      live: true
    },
    {
      video: null,
      thumb: '../img/stream4.jpg',
      viewers: '2.2K',
      title: 'FPS Showdown',
      streamer: 'SharpShooter',
      avatar: '../img/avatar.svg',
      live: false
    }
  ];

  function renderLiveStreams(page = 1) {
    const grid = document.querySelector('.streams-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const start = (page - 1) * streamsPerPage;
    const end = start + streamsPerPage;
    liveStreams.slice(start, end).forEach(stream => {
      grid.innerHTML += `
        <div class="stream-card">
          <div class="stream-thumb-container" style="position:relative;">
            ${stream.video ? `<iframe class='stream-thumb' src='${stream.video}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen style='width:100%;height:100%;aspect-ratio:16/9;border-radius:10px;'></iframe>` : `<img class='stream-thumb' src='${stream.thumb}' alt='Stream Thumbnail'>`}
            ${stream.live ? `<div style='position:absolute;top:10px;left:10px;background:#ff0000;color:#fff;font-weight:900;font-size:1em;padding:0.18em 0.9em 0.18em 0.9em;border-radius:3px;letter-spacing:1px;line-height:1;box-shadow:none;text-shadow:none;display:inline-block;'>LIVE</div>` : ''}
            <div class="viewer-count" style="position:absolute;bottom:10px;right:10px;color:#ff0000;font-weight:900;font-size:1em;background:#10131aee;padding:0.2rem 0.7rem;border-radius:7px;">${stream.viewers}</div>
          </div>
          <div class="stream-card-info">
            <img class="streamer-avatar" src="${stream.avatar}" alt="Streamer Avatar">
            <div class="streamer-details">
              <span class="stream-title">${stream.title}</span>
              <span class="streamer-name">${stream.streamer}</span>
            </div>
          </div>
        </div>
      `;
    });
    // Update pagination active state
    document.querySelectorAll('.pagination .page-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx + 1 === page);
    });
  }

  // Pagination click handlers
  document.querySelectorAll('.pagination .page-btn').forEach((btn, idx, arr) => {
    btn.addEventListener('click', function() {
      if (btn.textContent === 'Next') {
        const current = arr.findIndex(b => b.classList.contains('active'));
        if (current < arr.length - 2) renderLiveStreams(current + 2);
      } else {
        renderLiveStreams(Number(btn.textContent));
      }
    });
  });

  // Initial render
  renderLiveStreams(1);
// Khelbo.gg Stream Page Interactivity
// Handles filters, hover previews, sidebar toggling, and interactive elements

document.addEventListener('DOMContentLoaded', function () {
    // --- Search Bar Filtering ---
    const searchInput = document.querySelector('.stream-search-bar input');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        let filtered = liveStreams.filter(s =>
          s.title.toLowerCase().includes(query) ||
          s.streamer.toLowerCase().includes(query)
        );
        if (filtered.length === 0) filtered = liveStreams;
        function renderFiltered(page = 1) {
          const grid = document.querySelector('.streams-grid');
          if (!grid) return;
          grid.innerHTML = '';
          const start = (page - 1) * streamsPerPage;
          const end = start + streamsPerPage;
          filtered.slice(start, end).forEach(stream => {
            grid.innerHTML += `
              <div class="stream-card">
                <div class="stream-thumb-container" style="position:relative;">
                  ${stream.video ? `<iframe class='stream-thumb' src='${stream.video}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen style='width:100%;height:100%;aspect-ratio:16/9;border-radius:10px;'></iframe>` : `<img class='stream-thumb' src='${stream.thumb}' alt='Stream Thumbnail'>`}
                  ${stream.live ? `<div style='position:absolute;top:10px;left:10px;background:#ff0000;color:#fff;font-weight:900;font-size:1em;padding:0.18em 0.9em 0.18em 0.9em;border-radius:3px;letter-spacing:1px;line-height:1;box-shadow:none;text-shadow:none;display:inline-block;'>LIVE</div>` : ''}
                  <div class="viewer-count" style="position:absolute;bottom:10px;right:10px;">${stream.viewers}</div>
                </div>
                <div class="stream-card-info">
                  <img class="streamer-avatar" src="${stream.avatar}" alt="Streamer Avatar">
                  <div class="streamer-details">
                    <span class="stream-title">${stream.title}</span>
                    <span class="streamer-name">${stream.streamer}</span>
                  </div>
                </div>
              </div>
            `;
          });
          document.querySelectorAll('.pagination .page-btn').forEach((btn, idx) => {
            btn.classList.toggle('active', idx + 1 === page);
          });
        }
        document.querySelectorAll('.pagination .page-btn').forEach((btn, idx, arr) => {
          btn.onclick = function() {
            if (btn.textContent === 'Next') {
              const current = arr.findIndex(b => b.classList.contains('active'));
              if (current < arr.length - 2) renderFiltered(current + 2);
            } else {
              renderFiltered(Number(btn.textContent));
            }
          };
        });
        renderFiltered(1);
      });
    }
  // --- Dynamic Featured Stream Data ---
  const featuredStream = {
    featured: [
      {
        title: 'CS:GO Pro Tournament',
        streamer: 'CSGO_Official',
        avatar: '../img/avatar.svg',
        category: 'CS:GO',
        viewers: '15.2K',
        duration: 'LIVE',
        videoUrl: 'https://www.youtube.com/embed/KnpljMWwy3o?si=NJ_m88aTrLF-tjVA&autoplay=1',
      },
      {
        title: 'CS:GO Major Finals',
        streamer: 'CSGO_Official2',
        avatar: '../img/avatar.svg',
        category: 'CS:GO',
        viewers: '12.8K',
        duration: 'LIVE',
        videoUrl: 'https://www.youtube.com/embed/Wz3ybEo0xLk?si=1cdJOBCIkzTVrDJJ&autoplay=1',
      },
      {
        title: 'eFootball All-Stars Showdown',
        streamer: 'eFootball_Official',
        avatar: '../img/avatar.svg',
        category: 'eFootball',
        viewers: '10.4K',
        duration: 'LIVE',
        videoUrl: 'https://www.youtube.com/embed/a97Oz0pcLJ0?si=0WLUqXy-70AFfjxa&autoplay=1&start=180',
      }
    ]
  };

  // --- Render Featured Stream ---
  const featuredContainer = document.getElementById('featured-stream-dynamic');
  if (featuredContainer) {
    featuredContainer.innerHTML = `
      <div class="featured-cards-row">
        ${featuredStream.featured.map((stream, idx) => `
          <div class="featured-card">
            <div class="featured-video-container">
              <iframe class="featured-video-thumb" id="ytplayer-${idx}" src="${stream.videoUrl.replace('embed/', 'embed/').replace('?', '?mute=1&')}" title="YouTube video player" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              <div style='position:absolute;top:10px;left:10px;background:#ff0000;color:#fff;font-weight:900;font-size:1em;padding:0.18em 0.9em 0.18em 0.9em;border-radius:3px;letter-spacing:1px;line-height:1;box-shadow:none;text-shadow:none;display:inline-block;'>${stream.duration}</div>
            </div>
            <div class="featured-card-info">
              <img class="streamer-avatar" src="${stream.avatar}" alt="Streamer Avatar">
              <div class="featured-meta" style="max-width:220px;min-width:0;overflow:hidden;">
                <div class="featured-title-row">
                  <h2 class="stream-title" style="margin:0 0 0.2em 0;font-size:1.15em;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${stream.title}</h2>
                </div>
                <div class="featured-meta-row" style="margin-bottom:0.2em;align-items:center;gap:0.7em;flex-wrap:wrap;">
                  <span class="streamer-name" style="font-weight:700;color:#00eaff;font-size:1.01em;white-space:nowrap;">${stream.streamer}</span>
                  <span class="stream-category" style="background:#23273a;padding:0.18em 0.7em;border-radius:6px;color:#0fffc3;font-size:0.97em;font-weight:600;white-space:nowrap;">${stream.category}</span>
                  <span class="viewer-count" style="background:#181c25;padding:0.18em 0.7em;border-radius:6px;color:#ff2d55;font-weight:700;font-size:0.97em;display:flex;align-items:center;white-space:nowrap;"><span class="live-dot" style="margin-right:0.3em;"></span>${stream.viewers}</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    // No follow button, so no event handler
  }
  // Sidebar filter active state and filtering
  const categoryMap = {
    'All': () => true,
    'Games': stream => stream.title.toLowerCase().includes('game') || stream.category === 'CS:GO' || stream.title.toLowerCase().includes('pubg') || stream.title.toLowerCase().includes('eafc'),
    'Popular': (stream, idx) => idx < 2, // Demo: first 2 as popular
    'Following': () => false, // Demo: no following
    'Featured': (stream, idx) => idx === 0 // Demo: first as featured
  };
  // --- Games List UI and Filtering ---
  // Define available games (could be dynamic)
  const gamesList = [
    { name: 'EAFC 25', key: 'eafc' },
    { name: 'PUBG', key: 'pubg' },
    { name: 'CS:GO', key: 'csgo' },
    { name: 'Chess', key: 'chess' },
    { name: 'Indie', key: 'indie' },
    { name: 'FPS', key: 'fps' }
  ];

  // Insert games list dropdown in sidebar (if not present)
  let gamesDropdown = document.createElement('ul');
  gamesDropdown.className = 'games-dropdown';
  gamesDropdown.style.display = 'none';
  gamesDropdown.style.margin = '0.5em 0 0 1.5em';
  gamesDropdown.style.padding = '0';
  gamesDropdown.style.listStyle = 'none';
  gamesDropdown.style.background = 'none';
  gamesDropdown.style.border = 'none';
  gamesDropdown.style.fontSize = '0.98em';
  gamesDropdown.style.gap = '0.2em';
  gamesDropdown.style.flexDirection = 'column';
  gamesDropdown.style.position = 'static';
  gamesDropdown.style.boxShadow = 'none';
  gamesDropdown.style.zIndex = '2';
  gamesDropdown.innerHTML = gamesList.map(g => `<li data-game="${g.key}" style="cursor:pointer;padding:0.2em 0.7em;color:#00eaff;border-radius:6px;margin-bottom:2px;">${g.name}</li>`).join('');

  // Find the 'Games' li in sidebar
  const sidebarCats = document.querySelectorAll('.sidebar-categories li');
  let gamesLi = Array.from(sidebarCats).find(li => li.textContent.trim() === 'Games');
  if (gamesLi && !gamesLi.gamesDropdownInserted) {
    gamesLi.parentElement.insertBefore(gamesDropdown, gamesLi.nextSibling);
    gamesLi.gamesDropdownInserted = true;
  }
  // Track selected game
  let selectedGameKey = null;

  // Handle sidebar category clicks
  sidebarCats.forEach(function (item) {
    item.addEventListener('click', function (e) {
      const group = this.parentElement;
      group.querySelectorAll('li').forEach(li => li.classList.remove('active'));
      this.classList.add('active');
      const cat = this.textContent.trim();
      // Show/hide games dropdown
      if (cat === 'Games') {
        gamesDropdown.style.display = 'block';
        // If a game is already selected, filter by it
        if (selectedGameKey) {
          filterByGame(selectedGameKey);
        }
        return;
      } else {
        gamesDropdown.style.display = 'none';
        // Clear selected game highlight
        gamesDropdown.querySelectorAll('li').forEach(li => li.style.background = 'none');
        selectedGameKey = null;
      }
      let filterFn = categoryMap[cat] || (() => true);
      let filtered = liveStreams.map((s, i) => ({...s, _idx: i})).filter((s, i) => filterFn(s, s._idx));
      if (filtered.length === 0) filtered = liveStreams;
      function renderFiltered(page = 1) {
        const grid = document.querySelector('.streams-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const start = (page - 1) * streamsPerPage;
        const end = start + streamsPerPage;
        filtered.slice(start, end).forEach(stream => {
          grid.innerHTML += `
            <div class="stream-card">
              <div class="stream-thumb-container" style="position:relative;">
                ${stream.video ? `<iframe class='stream-thumb' src='${stream.video}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen style='width:100%;height:100%;aspect-ratio:16/9;border-radius:10px;'></iframe>` : `<img class='stream-thumb' src='${stream.thumb}' alt='Stream Thumbnail'>`}
                ${stream.live ? `<div style='position:absolute;top:10px;left:10px;background:#ff0000;color:#fff;font-weight:900;font-size:1em;padding:0.18em 0.9em 0.18em 0.9em;border-radius:3px;letter-spacing:1px;line-height:1;box-shadow:none;text-shadow:none;display:inline-block;'>LIVE</div>` : ''}
                <div class="viewer-count" style="position:absolute;bottom:10px;right:10px;">${stream.viewers}</div>
              </div>
              <div class="stream-card-info">
                <img class="streamer-avatar" src="${stream.avatar}" alt="Streamer Avatar">
                <div class="streamer-details">
                  <span class="stream-title">${stream.title}</span>
                  <span class="streamer-name">${stream.streamer}</span>
                </div>
              </div>
            </div>
          `;
        });
        document.querySelectorAll('.pagination .page-btn').forEach((btn, idx) => {
          btn.classList.toggle('active', idx + 1 === page);
        });
      }
      document.querySelectorAll('.pagination .page-btn').forEach((btn, idx, arr) => {
        btn.onclick = function() {
          if (btn.textContent === 'Next') {
            const current = arr.findIndex(b => b.classList.contains('active'));
            if (current < arr.length - 2) renderFiltered(current + 2);
          } else {
            renderFiltered(Number(btn.textContent));
          }
        };
      });
      renderFiltered(1);
    });
  });

  // Handle game selection from dropdown
  function filterByGame(gameKey) {
    // Highlight selected game
    gamesDropdown.querySelectorAll('li').forEach(li => li.style.background = 'none');
    const selectedLi = gamesDropdown.querySelector('li[data-game="' + gameKey + '"]');
    if (selectedLi) selectedLi.style.background = '#222c38';
    selectedGameKey = gameKey;
    // Filter streams by game
    let filtered = liveStreams.filter(s => {
      const title = s.title.toLowerCase();
      if (gameKey === 'eafc') return title.includes('eafc');
      if (gameKey === 'pubg') return title.includes('pubg');
      if (gameKey === 'csgo') return title.includes('cs:go') || (s.category && s.category.toLowerCase() === 'cs:go');
      if (gameKey === 'chess') return title.includes('chess');
      if (gameKey === 'indie') return title.includes('indie');
      if (gameKey === 'fps') return title.includes('fps');
      return false;
    });
    function renderFiltered(page = 1) {
      const grid = document.querySelector('.streams-grid');
      if (!grid) return;
      grid.innerHTML = '';
      const start = (page - 1) * streamsPerPage;
      const end = start + streamsPerPage;
      filtered.slice(start, end).forEach(stream => {
        grid.innerHTML += `
          <div class="stream-card">
            <div class="stream-thumb-container" style="position:relative;">
              ${stream.video ? `<iframe class='stream-thumb' src='${stream.video}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen style='width:100%;height:100%;aspect-ratio:16/9;border-radius:10px;'></iframe>` : `<img class='stream-thumb' src='${stream.thumb}' alt='Stream Thumbnail'>`}
              ${stream.live ? `<div style='position:absolute;top:10px;left:10px;background:#ff0000;color:#fff;font-weight:900;font-size:1em;padding:0.18em 0.9em 0.18em 0.9em;border-radius:3px;letter-spacing:1px;line-height:1;box-shadow:none;text-shadow:none;display:inline-block;'>LIVE</div>` : ''}
              <div class="viewer-count" style="position:absolute;bottom:10px;right:10px;">${stream.viewers}</div>
            </div>
            <div class="stream-card-info">
              <img class="streamer-avatar" src="${stream.avatar}" alt="Streamer Avatar">
              <div class="streamer-details">
                <span class="stream-title">${stream.title}</span>
                <span class="streamer-name">${stream.streamer}</span>
              </div>
            </div>
          </div>
        `;
      });
      document.querySelectorAll('.pagination .page-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === page);
      });
    }
    document.querySelectorAll('.pagination .page-btn').forEach((btn, idx, arr) => {
      btn.onclick = function() {
        if (btn.textContent === 'Next') {
          const current = arr.findIndex(b => b.classList.contains('active'));
          if (current < arr.length - 2) renderFiltered(current + 2);
        } else {
          renderFiltered(Number(btn.textContent));
        }
      };
    });
    renderFiltered(1);
  }

  gamesDropdown.querySelectorAll('li').forEach(function (gameLi) {
    gameLi.addEventListener('click', function (e) {
      e.stopPropagation();
      const gameKey = this.getAttribute('data-game');
      filterByGame(gameKey);
    });
  });

  // Stream card hover preview (placeholder for video preview)
  document.querySelectorAll('.stream-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      // TODO: Show video preview overlay or animate thumbnail
      card.classList.add('hover-preview');
    });
    card.addEventListener('mouseleave', function () {
      card.classList.remove('hover-preview');
    });
    card.addEventListener('click', function () {
      // TODO: Open stream detail page
      alert('Open stream detail page (to be implemented)');
    });
  });

  // Reminder button for upcoming streams
  document.querySelectorAll('.reminder-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.textContent = 'Reminder Set!';
      btn.disabled = true;
      btn.classList.add('reminder-set');
      // TODO: Integrate with calendar or notification system
    });
  });

  // Responsive sidebar toggle (for mobile, optional)
  // TODO: Implement sidebar toggle if needed
});
