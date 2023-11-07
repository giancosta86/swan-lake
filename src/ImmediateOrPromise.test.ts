import { ImmediateOrPromise } from "./ImmediateOrPromise";

describe("Immediate or promise", () => {
  describe("when used as a function parameter", () => {
    async function f(x: ImmediateOrPromise<number>): Promise<number> {
      const xValue = await x;

      return xValue + 90;
    }

    it("should accept an immediate value", async () => {
      const result = await f(2);

      expect(result).toBe(92);
    });

    it("should accept a promise", async () => {
      const inputPromise = Promise.resolve(5);
      const result = await f(inputPromise);

      expect(result).toBe(95);
    });
  });
});
