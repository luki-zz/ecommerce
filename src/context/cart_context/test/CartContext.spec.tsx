import { CartProvider, useCartContext } from "../CartContext";
import { createProduct } from "src/tests/mocks/createProduct";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const CheckContextComp = () => {
  const { cart, cartSummary, clearCart, addToCart } = useCartContext();
  return (
    <>
      <p>total Cost: {cartSummary.totalCost}</p>
      <p>total Amout: {cartSummary.totalAmount}</p>
      <button onClick={() => addToCart(createProduct())}>Add product</button>
      <button>Clear cart</button>
    </>
  );
};

describe("Cart Context", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    });
  });
  it("if add product, local storage should update", async () => {
    const { getAllByRole } = render(
      <CartProvider>
        <CheckContextComp />
      </CartProvider>
    );
    const [addButton, clearButton] = getAllByRole("button");
    await userEvent.click(addButton);
    expect(window.localStorage.setItem).toBeCalled();
  });
});
