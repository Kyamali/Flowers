document.querySelector('.add-to-cart').addEventListener('click', function(event) {
    event.preventDefault();

    let product = {
        name: document.getElementById('productName').innerText,
        price: document.getElementById('productPrice').innerText.split(" ")[1], // Цена
        img: document.getElementById('productImage').src
    };

    // Добавляем товар в корзину
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Товар добавлен в корзину');
});
