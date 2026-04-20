

const mockLeaderboards = {
  wealth: [
    { username: 'Notch', value: '$2,847,000', rank: 1 },
    { username: 'jeb_', value: '$2,456,000', rank: 2 },
    { username: 'Dinnerbone', value: '$2,103,000', rank: 3 },
    { username: 'Grumm', value: '$1,892,000', rank: 4 },
    { username: 'CaptainSparklez', value: '$1,765,000', rank: 5 },
    { username: 'Technoblade', value: '$1,654,000', rank: 6 },
    { username: 'Dream', value: '$1,542,000', rank: 7 },
    { username: 'Philza', value: '$1,423,000', rank: 8 },
    { username: 'Grian', value: '$1,356,000', rank: 9 },
    { username: 'MumboJumbo', value: '$1,287,000', rank: 10 }
  ],
  kills: [
    { username: 'Technoblade', value: '15,847', rank: 1 },
    { username: 'Dream', value: '12,456', rank: 2 },
    { username: 'Notch', value: '10,103', rank: 3 },
    { username: 'CaptainSparklez', value: '9,892', rank: 4 },
    { username: 'Philza', value: '8,765', rank: 5 },
    { username: 'jeb_', value: '7,654', rank: 6 },
    { username: 'Grian', value: '6,542', rank: 7 },
    { username: 'MumboJumbo', value: '5,423', rank: 8 },
    { username: 'Dinnerbone', value: '4,356', rank: 9 },
    { username: 'Grumm', value: '3,287', rank: 10 }
  ],
  votes: [
    { username: 'Philza', value: '2,847', rank: 1 },
    { username: 'Grian', value: '2,456', rank: 2 },
    { username: 'MumboJumbo', value: '2,103', rank: 3 },
    { username: 'Notch', value: '1,892', rank: 4 },
    { username: 'Dream', value: '1,765', rank: 5 },
    { username: 'Technoblade', value: '1,654', rank: 6 },
    { username: 'CaptainSparklez', value: '1,542', rank: 7 },
    { username: 'jeb_', value: '1,423', rank: 8 },
    { username: 'Dinnerbone', value: '1,356', rank: 9 },
    { username: 'Grumm', value: '1,287', rank: 10 }
  ]
};

function initNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navbar = document.getElementById('navbar');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

function initNotification() {
  const notificationClose = document.getElementById('notificationClose');
  if (notificationClose) {
    notificationClose.addEventListener('click', () => {
      document.getElementById('notification')?.classList.remove('show');
    });
  }
}

function createLeaderboardItem(player, index) {
  const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
  const badgeClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';

  return `
    <div class="leaderboard-item ${rankClass}">
      <span class="rank-col">
        ${index < 3 ? `<span class="rank-badge ${badgeClass}">${player.rank}</span>` : player.rank}
      </span>
      <span class="player-col">
        <img src="https://minotar.net/helm/${player.username}/32.png" alt="${player.username}" class="player-avatar">
        <span class="player-name">${player.username}</span>
      </span>
      <span class="stat-col">${player.value}</span>
    </div>
  `;
}

function loadLeaderboard(type) {
  const listElement = document.getElementById(`${type}List`);
  if (!listElement || !mockLeaderboards[type]) return;

  listElement.innerHTML = mockLeaderboards[type]
    .map((player, index) => createLeaderboardItem(player, index))
    .join('');
}

function initLeaderboardTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const leaderboards = document.querySelectorAll('.leaderboard');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      leaderboards.forEach(board => {
        board.classList.remove('active');
        if (board.id === `${tab}-leaderboard`) {
          board.classList.add('active');

          if (tab !== 'playtime' && !board.querySelector('.leaderboard-body').innerHTML) {
            loadLeaderboard(tab);
          }
        }
      });
    });
  });
}

function initPlayerSearch() {
  const searchInput = document.getElementById('playerSearch');
  const statsCard = document.getElementById('playerStatsCard');
  let searchTimeout;

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const username = e.target.value.trim();

    if (username.length < 3) {
      statsCard.style.display = 'none';
      return;
    }

    searchTimeout = setTimeout(() => {
      showPlayerStats(username);
    }, 500);
  });
}

function showPlayerStats(username) {
  const statsCard = document.getElementById('playerStatsCard');
  const playerAvatar = document.getElementById('playerAvatar');
  const playerName = document.getElementById('playerName');
  const playerRank = document.getElementById('playerRank');
  const playerPlaytime = document.getElementById('playerPlaytime');
  const playerBalance = document.getElementById('playerBalance');
  const playerKills = document.getElementById('playerKills');
  const playerDeaths = document.getElementById('playerDeaths');
  const playerVotes = document.getElementById('playerVotes');
  const playerJoinDate = document.getElementById('playerJoinDate');

  if (!statsCard) return;

  const mockStats = {
    username: username,
    rank: 'VIP+',
    playtime: '847 hours',
    balance: '$125,450',
    kills: 1234,
    deaths: 567,
    votes: 89,
    joinDate: 'January 15, 2024'
  };

  if (playerAvatar) playerAvatar.src = `https://minotar.net/helm/${username}/80.png`;
  if (playerName) playerName.textContent = username;
  if (playerRank) playerRank.textContent = mockStats.rank;
  if (playerPlaytime) playerPlaytime.textContent = mockStats.playtime;
  if (playerBalance) playerBalance.textContent = mockStats.balance;
  if (playerKills) playerKills.textContent = mockStats.kills;
  if (playerDeaths) playerDeaths.textContent = mockStats.deaths;
  if (playerVotes) playerVotes.textContent = mockStats.votes;
  if (playerJoinDate) playerJoinDate.textContent = mockStats.joinDate;

  statsCard.style.display = 'block';
}

function initDiscordLinks() {
  const discordLinks = document.querySelectorAll('#discordLink');
  discordLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://discord.gg/your-invite-code', '_blank');
    });
  });
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');

  counters.forEach(counter => {
    const target = counter.textContent;
    if (target.match(/^[\d,]+$/)) {
      const value = parseInt(target.replace(/,/g, ''));
      let current = 0;
      const increment = value / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, 20);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNotification();
  initLeaderboardTabs();
  initPlayerSearch();
  initDiscordLinks();
  animateCounters();
});
