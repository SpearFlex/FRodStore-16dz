const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Находим модальное окно корзины и таблицу в нем
const cartModal = document.getElementById('modal-cart');
const cartTable = cartModal.querySelector('tbody');

// Находим элемент, куда будет выводиться общая сумма
const totalElement = document.querySelector('.total');

// Функция для расчета общей суммы
function calculateTotal() {
  let total = 0;

  // Находим строки таблицы (каждая строка содержит информацию о товаре)
  const cartRows = cartTable.querySelectorAll('tr');

  // Перебираем строки таблицы и добавляем цену каждого товара к текущей сумме
  cartRows.forEach(row => {
    const priceElement = row.querySelector('.product-price');
    const totalPriceElement = row.querySelector('.total-price');
    if (priceElement !== null && totalPriceElement !== null) {
      const price = parseFloat(priceElement.innerText.replace(' ₽', ''));
      const subtotal = parseFloat(totalPriceElement.innerText.replace(' ₽', ''));
      if (!isNaN(price) && !isNaN(subtotal)) {
        total += subtotal;
      }
    }
  });

  // Выводим общую сумму на страницу
  totalElement.innerText = `Общая сумма: ${total.toFixed(2)} ₽`;
}

// Добавляем обработчик события на кнопки "Добавить в корзину"
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Находим информацию о товаре
    const title = button.closest('.product-details').querySelector('h4 a').innerText;
    const price = button.closest('.product-details').querySelector('.product-price').innerText;

    // Создаем новую строку в таблице корзины
    const cartRow = document.createElement('tr');
    cartRow.innerHTML = `
      <td><img src="${button.closest('.product-card').querySelector('img').src}" alt=""></td>
      <td><a href="#">${title}</a></td>
      <td class="product-price">${price}</td>
      <td><button type="button" class="btn btn-danger remove-item">Удалить товар</button></td>
      <td class="total-price">${price}</td>
    `;

    // Находим кнопки добавления и удаления товара и добавляем обработчики событий на них
    const removeButton = cartRow.querySelector('.remove-item');

    removeButton.addEventListener('click', () => {
      const cartRow = removeButton.closest('tr');
      cartRow.remove();
      calculateTotal();
    });

    // Добавляем строку с товаром в таблицу корзины
    cartTable.insertBefore(cartRow, cartTable.querySelector('tr:last-of-type'));
    calculateTotal();
  });
});


const btnOrder = document.querySelector('.modal-footer button.btn-primary');

// Находим строку таблицы с общей стоимостью заказа
const cartTotalRow = document.querySelector('.modal-body table tbody tr:last-child');

function clearCart() {
  // Находим элементы таблицы с продуктами
  const cartItems = document.querySelectorAll('.modal-body table tbody tr:not(:last-child)');

  // Проходимся по всем элементам и удаляем их
  cartItems.forEach((item) => {
    item.remove();
  });

  // Очищаем общую стоимость
  totalElement.textContent = '';

  // Добавляем строку общей стоимости назад в таблицу
  cartTable.appendChild(cartTotalRow);
}

// Добавляем обработчик событий на кнопку заказа
btnOrder.addEventListener('click', clearCart);