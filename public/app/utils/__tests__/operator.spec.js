import takeUntil from "../operators.js";

describe("Utils", () => {
  it("should ", () => {
    const showMessage = () => console.log("Opa!");
    const operation = takeUntil(3, showMessage);
    let counter = 10;
    while (counter--) operation();
  });
});
