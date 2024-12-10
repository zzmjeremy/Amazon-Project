import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
   <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">
          ${product.getPrice()}
          </div>
          <!-- have 2 decimals -->

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

updateCartQuantity();

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  if (cartQuantity > 0) {
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  } else {
    document.querySelector(".js-cart-quantity").innerHTML = "";
  }
}

function addToCartIcon(productId) {
  //set added icon
  const cartElement = document.querySelector(`.js-cart-${productId}`);
  cartElement.classList.add("display");
  // 清除之前的计时器，如果存在的话
  if (cartElement.dataset.timeoutId) {
    clearTimeout(cartElement.dataset.timeoutId);
  }

  // 设置新的计时器并存储它的 ID
  const timeoutId = setTimeout(() => {
    cartElement.classList.remove("display");
  }, 2000);
  cartElement.dataset.timeoutId = timeoutId;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    //from kabab case product-id to camel case productId
    const productCount = document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value;
    const productNumber = Number(productCount);
    addToCartIcon(productId);
    addToCart(productId, productNumber);
    updateCartQuantity();
  });
});
