// Find out the cart items from localStorage
if (localStorage.getItem('cart') == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
    document.getElementById('cart').innerHTML = Object.keys(cart).length;
    updateCart(cart);
}
// If the add to cart button is clicked, add/increment the item
$('.cart').click(function() {
    var idstr = this.id.toString();
    if (cart[idstr] != undefined) {
        cart[idstr] = cart[idstr] + 1;
    } else {
        cart[idstr] = 1;
    }
    updateCart(cart);
    
});
//Add Popover to cart
$('#popcart').popover();
document.getElementById("popcart").setAttribute('data-content', '<h5>Cart for your items in my shopping cart</h5>');
function updateCart(cart) {
    for (var item in cart) {
        document.getElementById('div' + item).innerHTML = "<button id='minus" + item + "' class='btn btn-primary minus'>-</button> <span id='val" + item + "''>" + cart[item] + "</span> <button id='plus" + item + "' class='btn btn-primary plus'> + </button>";
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart').innerHTML = Object.keys(cart).length;
    console.log(cart);
}
// If plus or minus button is clicked, change the cart as well as the display value
$('.divpr').on("click", "button.minus", function() {
    a = this.id.slice(7, );
    cart['pr' + a] = cart['pr' + a] - 1;
    cart['pr' + a] = Math.max(0, cart['pr' + a]);
    document.getElementById('valpr' + a).innerHTML = cart['pr' + a];
    updateCart(cart);
});
$('.divpr').on("click", "button.plus", function() {
    a = this.id.slice(6, );
    cart['pr' + a] = cart['pr' + a] + 1;
    document.getElementById('valpr' + a).innerHTML = cart['pr' + a];
    updateCart(cart);
});
