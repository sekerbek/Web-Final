const products = document.querySelectorAll('.product');
if(products){
  products.forEach(el => {
    let currentProduct = el;
    const imageSwitchItems = el.querySelectorAll('.image-switch_item');
    const imagePagination = el.querySelector('.image-pagination');
// here i added condition, where it check if there more than one item(img of games), it will do, otherwise it is not needed
    if(imageSwitchItems.length > 1){
      imageSwitchItems.forEach((el, index) => {
        el.setAttribute('data-index', index); // here we add index for our items 0,1,2
        //if our index is equal to 0 we add class for its.otherwise not
        imagePagination.innerHTML += `<li class="image-pagination_item ${index == 0  ? '.image-pagination_item--active' : ''}" data-index="${index}"></li>`;
        el.addEventListener('mouseenter', (e)=> {
          currentProduct.querySelectorAll('.image-pagination_item').forEach(el => {el.classList.remove('image-pagination_item--active')});
          currentProduct.querySelector(`.image-pagination_item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination_item--active');

          });

        });
      }
      });
}
