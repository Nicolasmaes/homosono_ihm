import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import store from "../../reduxStore";
import Connexion from "./login.jsx";
import { sumTest, formCheckerTest } from "./login.jsx";

test("My sum function", () => {
  render(<Connexion store={store} />);
  // screen.debug(); // pour afficher tout le body dans la console
  let result;
  act(() => {
    result = sumTest(3, 7);
  });
  expect(result).toBe("success");
});

const userTest = {
  param: "",
  password: "motDePassetest",
};

describe("My formChecker function", () => {
  it("Should not allowed an empty input", () => {
    render(<Connexion store={store} />);
    const result = formCheckerTest(userTest);
    expect(result).toBe("missing e-mail");
  });
});
