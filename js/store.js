

let cart = [];

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

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const totalPrice = document.getElementById('totalPrice');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">&times;</button>
      </div>
    `).join('');

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
      });
    });

    if (checkoutBtn) checkoutBtn.disabled = false;
  }

  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (totalPrice) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    showNotification('Item already in cart!', 'error');
    return;
  }

  cart.push({ id, name, price: parseFloat(price) });
  updateCart();
  showNotification(`${name} added to cart!`, 'success');
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
  showNotification('Item removed from cart', 'success');
}

function initStoreCategories() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      productCards.forEach(card => {
        if (card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initAddToCart() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = button.dataset.price;

      addToCart(id, name, price);
    });
  });
}

function initCheckout() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckout = document.getElementById('closeCheckout');
  const checkoutForm = document.getElementById('checkoutForm');

  if (!checkoutBtn || !checkoutModal) return;

  checkoutBtn.addEventListener('click', () => {
    checkoutModal.classList.add('show');

    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');

    if (checkoutItems) {
      checkoutItems.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span>${item.name}</span>
          <span>$${item.price.toFixed(2)}</span>
        </div>
      `).join('');
    }

    if (checkoutTotal) {
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      checkoutTotal.textContent = `$${total.toFixed(2)}`;
    }
  });

  closeCheckout?.addEventListener('click', () => {
    checkoutModal.classList.remove('show');
  });

  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.remove('show');
    }
  });

  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(checkoutForm);
    const data = {
      username: formData.get('minecraftUsername'),
      email: formData.get('email'),
      payment: formData.get('payment'),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0)
    };

    console.log('Order submitted:', data);

    showNotification('Order placed successfully! Check your email for confirmation.', 'success');
    cart = [];
    updateCart();
    checkoutModal.classList.remove('show');
    checkoutForm.reset();
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

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      updateCart();
    } catch (error) {
      console.error('Failed to load cart:', error);
      cart = [];
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNotification();
  loadCart();
  initStoreCategories();
  initAddToCart();
  initCheckout();
  initDiscordLinks();
});
