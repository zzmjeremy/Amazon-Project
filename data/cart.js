export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addedIcon(productId) {
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


export function addToCart(productId) {
  addedIcon(productId);
  //added to cart
    const productCount = document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value;
    const productNumber = Number(productCount);
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += productNumber;
  } else {
    cart.push({
      productId: productId,
      quantity: productNumber,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
