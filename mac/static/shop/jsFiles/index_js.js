// ---------------- CART -----------------
let cart = {};
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}
document.getElementById('cart').innerText = Object.keys(cart).length;
updateCart(cart);

// add-to-cart
document.querySelectorAll('.cart').forEach(btn => {
  btn.addEventListener('click', function () {
    let id = this.id;        // e.g. "pr12"
    cart[id] = (cart[id] || 0) + 1;
    updateCart(cart);
  });
});

function updateCart(cartObj) {
  for (const key in cartObj) {
    const span = document.getElementById('div' + key);
    if (!span) continue;
    span.innerHTML = `
      <button id="minus${key}" class="btn btn-sm btn-primary minus">-</button>
      <span id="val${key}" class="mx-2">${cartObj[key]}</span>
      <button id="plus${key}" class="btn btn-sm btn-primary plus">+</button>
    `;
  }
  localStorage.setItem('cart', JSON.stringify(cartObj));
  document.getElementById('cart').innerText = Object.keys(cartObj).length;
}

// increment / decrement
document.querySelectorAll('.divpr').forEach(div => {
  div.addEventListener('click', function (e) {
    if (e.target.classList.contains('minus')) {
      let id = e.target.id.slice(5);          // remove "minus"
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
      let id = e.target.id.slice(4);          // remove "plus"
      cart[id] = (cart[id] || 0) + 1;
      document.getElementById('val' + id).innerText = cart[id];
      updateCart(cart);
    }
  });
});

// ---------------- BOOTSTRAP POPOVER -----------------
const popcart = document.getElementById('popcart');
if (popcart) {
  new bootstrap.Popover(popcart, {
    html: true,
    content: `<h5>Cart Items: ${Object.keys(cart).length}</h5>`
  });
}