import { render } from "@testing-library/react";
import App from "./App";

test("renders without crashing homesono", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
