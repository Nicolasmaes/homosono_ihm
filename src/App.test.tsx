import { render, screen } from "@testing-library/react";
import { chatboxEllipsesSharp } from "ionicons/icons";
import App from "./App";

//  Ces teux tests verifient la même chose

test("renders the App component without crashing", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});

describe("App component", () => {
  it("should render without crash", () => {
    render(<App />);
  });
});
