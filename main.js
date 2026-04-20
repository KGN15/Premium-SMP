// import './style.css';

const API_CONFIG = {
  serverIp: 'play.premiumsmp.net',
  serverPort: 25565,
  discordGuildId: '1234567890',
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

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notificationMessage');

  if (!notification || !notificationMessage) return;

  notificationMessage.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

function initNotification() {
  const notificationClose = document.getElementById('notificationClose');

  if (notificationClose) {
    notificationClose.addEventListener('click', () => {
      document.getElementById('notification')?.classList.remove('show');
    });
  }
}

function initAnnouncement() {
  const announcementPopup = document.getElementById('announcementPopup');
  const popupClose = document.getElementById('popupClose');
  const dismissPopup = document.getElementById('dismissPopup');

  if (!announcementPopup) return;

  const hasSeenAnnouncement = localStorage.getItem('hasSeenAnnouncement');

  if (!hasSeenAnnouncement) {
    setTimeout(() => {
      announcementPopup.classList.add('show');
    }, 2000);
  }

  const closePopup = () => {
    announcementPopup.classList.remove('show');
    localStorage.setItem('hasSeenAnnouncement', 'true');
  };

  popupClose?.addEventListener('click', closePopup);
  dismissPopup?.addEventListener('click', closePopup);

  announcementPopup.addEventListener('click', (e) => {
    if (e.target === announcementPopup) {
      closePopup();
    }
  });
}

async function checkServerStatus() {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const playerCount = document.getElementById('playerCount');
  const maxPlayers = document.getElementById('maxPlayers');

  if (!statusDot || !statusText) return;

  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${API_CONFIG.serverIp}`);
    const data = await response.json();

    if (data.online) {
      statusDot.classList.remove('offline');
      statusText.textContent = 'Server Online';

      if (playerCount) {
        playerCount.textContent = data.players.online || 0;
      }
      if (maxPlayers) {
        maxPlayers.textContent = data.players.max || 100;
      }
    } else {
      statusDot.classList.add('offline');
      statusText.textContent = 'Server Offline';
      if (playerCount) playerCount.textContent = '0';
    }
  } catch (error) {
    console.error('Failed to fetch server status:', error);
    statusDot.classList.add('offline');
    statusText.textContent = 'Status Unknown';
  }
}

function initCopyIP() {
  const copyIpBtn = document.getElementById('copyIpBtn');
  const serverIp = document.getElementById('serverIp');

  if (!copyIpBtn || !serverIp) return;

  copyIpBtn.addEventListener('click', async () => {
    const ipText = serverIp.textContent;

    try {
      await navigator.clipboard.writeText(ipText);
      showNotification('Server IP copied to clipboard!', 'success');
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = ipText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification('Server IP copied to clipboard!', 'success');
    }
  });
}

async function loadDiscordWidget() {
  const discordMembers = document.getElementById('discordMembers');
  const discordOnline = document.getElementById('discordOnline');

  if (!discordMembers || !discordOnline) return;

  try {
    discordMembers.textContent = '2,547';
    discordOnline.textContent = '892';
  } catch (error) {
    console.error('Failed to load Discord stats:', error);
  }
}

function initDiscordLinks() {
  const discordLinks = document.querySelectorAll('#discordLink, #joinDiscordBtn');

  discordLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://discord.gg/your-invite-code', '_blank');
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNotification();
  initAnnouncement();
  initCopyIP();
  initDiscordLinks();
  initSmoothScroll();

  checkServerStatus();
  loadDiscordWidget();

  setInterval(checkServerStatus, 60000);
});

// export { showNotification, API_CONFIG };
