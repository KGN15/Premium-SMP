

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

function initCommandSearch() {
  const searchInput = document.getElementById('commandSearch');
  const commandCards = document.querySelectorAll('.command-card');
  const noResults = document.getElementById('noResults');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let visibleCount = 0;

    commandCards.forEach(card => {
      const commandName = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const commandDesc = card.querySelector('.command-description')?.textContent.toLowerCase() || '';

      if (commandName.includes(searchTerm) || commandDesc.includes(searchTerm)) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const commandCards = document.querySelectorAll('.command-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      commandCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
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
  initCommandSearch();
  initCategoryFilters();
  initDiscordLinks();
});
