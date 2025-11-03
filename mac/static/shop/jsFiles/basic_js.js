// ✅ Golden Wolf Shop — Universal Cart Script
console.log("✅ basic_js.js loaded successfully");

// ---------- Initialize Cart ----------
let cart = JSON.parse(localStorage.getItem('cart')) || {};
updateCart(cart);

// ---------- Add to Cart (all pages) ----------
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('cart')) {
    const id = e.target.id; // e.g. pr6
    cart[id] = (cart[id] || 0) + 1;
    updateCart(cart);
  }
});

// ---------- Buy Now (Product View Page) ----------
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('buy-now')) {
    const id = e.target.id; // e.g. pr6
    cart = {}; // Clear previous cart
    cart[id] = 1; // Add only this product
    localStorage.setItem('cart', JSON.stringify(cart));

    // ✅ Delay redirect so data is saved before page unload
    setTimeout(() => {
      window.location.href = "/shop/checkout";
    }, 200);
  }
});

// ---------- Update Cart Display ----------
function updateCart(cartObj) {
  for (const key in cartObj) {
    const div = document.getElementById('div' + key);
    if (div) {
      div.innerHTML = `
        <button id="minus${key}" class="btn btn-sm btn-primary minus">-</button>
        <span id="val${key}" class="mx-2">${cartObj[key]}</span>
        <button id="plus${key}" class="btn btn-sm btn-primary plus">+</button>
      `;
    }
  }

  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cartObj));

  // Update cart count in navbar
  const cartDisplay = document.getElementById('cart');
  if (cartDisplay) {
    cartDisplay.innerText = Object.keys(cartObj).length;
  }

  // Update Bootstrap Popover
  updatePopover(cartObj);
}

// ---------- Plus / Minus Buttons ----------
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('minus')) {
    const id = e.target.id.slice(5); // remove 'minus'
    cart[id] = Math.max(0, (cart[id] || 0) - 1);

    if (cart[id] === 0) {
      delete cart[id];
      document.getElementById('div' + id).innerHTML =
        `<button id="${id}" class="btn btn-primary cart">Add to Cart</button>`;
    } else {
      document.getElementById('val' + id).innerText = cart[id];
    }

    updateCart(cart);
  }

  if (e.target.classList.contains('plus')) {
    const id = e.target.id.slice(4); // remove 'plus'
    cart[id] = (cart[id] || 0) + 1;
    document.getElementById('val' + id).innerText = cart[id];
    updateCart(cart);
  }
});

// ---------- Bootstrap Popover ----------
function updatePopover(cartObj) {
  const popcart = document.getElementById('popcart');
  if (!popcart) return;

  let count = Object.keys(cartObj).length;
  let contentHTML = `<h5>Cart Items: ${count}</h5>`;
  if (count > 0) {
    contentHTML += `<a href="/shop/checkout" class="btn btn-sm btn-primary mt-2">Checkout</a>`;
  }

  if (bootstrap.Popover.getInstance(popcart)) {
    popcart.setAttribute("data-bs-content", contentHTML);
  } else {
    new bootstrap.Popover(popcart, { html: true, content: contentHTML });
  }
}
