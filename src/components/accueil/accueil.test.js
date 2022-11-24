import { sum } from "./accueil.jsx";
import { render, screen } from "@testing-library/react";
import Accueil from "./accueil";
import store from "../../reduxStore";

test("Ma fonction sum", () => {
  const result = sum(3, 7);
  expect(result).toBe(10);
});

describe("Accueil component", () => {
  it("should render heading title", () => {
    render(<Accueil store={store} />);
    // screen.debug(); // pour afficher tout le body dans la console
    expect(
      screen.getByRole("heading", { level: 1, name: "Bienvenue sur HomeSono" })
    ).toBeTruthy();
  });
});
