// ✅ Golden Wolf Shop — Checkout Script (fixed Buy Now + Add to Cart)
console.log("✅ checkout.js loaded successfully");

document.addEventListener("DOMContentLoaded", async () => {
  // ---------- Load cart data ----------
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  const cartItems = document.getElementById('cart-items');
  const totalElem = document.getElementById('cart-total');
  let totalPrice = 0;

  if (Object.keys(cart).length === 0) {
    cartItems.innerHTML = `
      <li class="list-group-item text-center">Your cart is empty 🛒</li>`;
    totalElem.innerText = 0;
    return;
  }

  // ---------- Fetch all products from backend ----------
  try {
    const response = await fetch("/shop/api/products/");
    const products = await response.json();

    // Create dictionary for lookup
    const productMap = {};
    products.forEach(p => {
      productMap[p.product_id] = {
        name: p.product_name,
        price: p.price
      };
    });

    // ---------- Build Cart Summary ----------
    cartItems.innerHTML = ""; // clear old items
    for (let key in cart) {
      const productId = key.replace('pr', '');
      const qty = cart[key];
      const product = productMap[productId];

      if (!product) continue; // skip if product missing

      const subtotal = qty * product.price;
      totalPrice += subtotal;

      cartItems.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span><strong>${product.name}</strong></span>
          <span>${qty} × ₹${product.price} = ₹${subtotal}</span>
        </li>`;
    }

    totalElem.innerText = totalPrice;

  } catch (err) {
    console.error("❌ Error fetching product data:", err);
    cartItems.innerHTML = `
      <li class="list-group-item text-center text-danger">
        Failed to load cart details. Try again later.
      </li>`;
  }

  // ---------- Handle form submission ----------
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      document.getElementById('items_json').value = JSON.stringify(cart);
      localStorage.removeItem('cart'); // clear cart after order
      alert("✅ Order placed successfully!");
    });
  }
});
// ---------- End of checkout.js ----------
