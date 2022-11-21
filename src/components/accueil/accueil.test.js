import { sum } from "./accueil.jsx";

test("Ma fonction sum", () => {
  const result = sum(3, 7);
  expect(result).toBe(10);
});
