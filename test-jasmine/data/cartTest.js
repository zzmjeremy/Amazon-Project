import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
describe("test suite: addToCart", () => {
  document.querySelector(".js-test-cart").innerHTML = `
    <div class="js-cart-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"></div>
    `;
  it("adds existing products to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 2);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(3);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 2);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });
});
