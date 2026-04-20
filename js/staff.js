

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

function initDiscordLinks() {
  const discordLinks = document.querySelectorAll('#discordLink');
  discordLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://discord.gg/your-invite-code', '_blank');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNotification();
  initDiscordLinks();
});
