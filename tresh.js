let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const RUB_TO_KZT = 6; // Конвертация рубля в тенге

        function displayCart() {
            const cartContent = document.getElementById('cartContent');
            if (cart.length === 0) {
                cartContent.innerHTML = '<p>Корзина пуста.</p>';
            } else {
                cartContent.innerHTML = '';
                cart.forEach((item, index) => {
                    cartContent.innerHTML += `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" />
                            <p>${item.name}</p>
                            <p>Цена: ${item.price * RUB_TO_KZT} KZT</p>
                            <p>${item.description}</p>
                            <button onclick="removeFromCart(${index})">Удалить</button>
                        </div>
                    `;
                });
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }

        document.getElementById('orderForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const note = document.getElementById('note').value;
            sendOrder(email, note); // Отправка данных на почту
        });

        function sendOrder(email, note) {
            const orderData = {
                email: email,
                note: note,
                items: cart
            };

            fetch('submit_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
            .then(response => response.json())
            .then(data => {
                alert('Заказ успешно оформлен!');
                localStorage.removeItem('cart'); // Очистить корзину
                window.location.href = 'index.html'; // Перенаправление на главную
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Произошла ошибка при отправке заказа.');
            });
        }


        window.onload = displayCart;