const productsBtn = document.querySelectorAll('.product_btn'); //skolko raz nazhaly na buy a game
const cartProductsList = document.querySelector('.cart-content_list'); // list of the games that u gonna buy
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart_quantity');
const fullprice = document.querySelector('fullprice');
let price=0;
//здесь создаем функцию рандом которая будет давать рандомные айди элементов(игр), для того чтобы
//мы задавали каждой игре рандомный элемент, и по нему будем передавать данные блоки в корзину
//для того чтобы при нажатии удалить мы могли связать то,что в корзине с игрой в сайте
const randomId =() =>
{
  return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
};
// фунция для удаления спэйсов,тг  в стрингее
const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};
//Функциякоторая наоборот добавляет пробелы среди больших чисел (1 000)
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};


// функции которые суммируют и отнимают
const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};
// функция которая выводит полностью фулл прайс, берем переменную и выводим в нормальном формате со спэйсами
const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} tg`;
};


// функция которая возращает нам все четыре параметра о указанной игре через шаблон
const generateCartProduct = (img, title, price, id) => {
	return `
		<li class="cart-content_item">
			<article class="cart-content_product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product_img">
				<div class="cart-product_text">
					<h3 class="cart-product_title">${title}</h3>
					<span class="cart-product_price">${normalPrice(price)}</span>
				</div>
				<button class="cart-product_delete" aria-label="Delete the game"></button>
			</article>
		</li>
	`;
};
//функция при нажатии кнопки купить игру
productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());//здесь добавляется каждому обьекту-игре рандомный айди

	el.addEventListener('click', (e) => {
		let self = e.currentTarget; // текущий элемент по которому мы кликаем по карент таргет
		let parent = self.closest('.product'); // находим текущий продукт
		let id = parent.dataset.id; // here i take the id of the object
		let img = parent.querySelector('.image-switch_img img').getAttribute('src');//here i take the first img of the game
		let title = parent.querySelector('.product_title').textContent;//here i take the text of the product
		// let priceString = priceWithoutSpaces(parent.querySelector('.product-price_current').textContent);
    // сначала берем стринг цену, переводим его без спэйсов, делаем его инт
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price_current').textContent));
    //call to all our functions
		plusFullPrice(priceNumber);

		printFullPrice();
    // output all the list
		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
    // here print the number of items
  	printQuantity();

//после тогог как элемент выбран, ставим его не нажимаемым
		self.disabled = true;
	});
});

// функция которая удаляет игру с листа
const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;// здесь мы обратились к li, нашли айди и записали
  // здесь смотрим на продукт у которого такой же айди, и ставим кнопку открытой
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product_btn').disabled = false;
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product_price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
  //тут ремув делаем
	productParent.remove();

	printQuantity();
};
// функция при нажатии на кпопку где стоит наш крестик, мы вызываем функцию
cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product_delete')) {
		deleteProducts(e.target.closest('.cart-content_item'));
	}
});
