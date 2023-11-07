import { optionalEquals } from "./Equals";

class Bear {
  constructor(readonly name: string) {}

  equals(other: Bear): boolean {
    return this.name == other.name;
  }
}

class Fish {
  static create(name: string): Fish {
    return new Fish(name);
  }

  private constructor(readonly name: string) {}

  equals(other: Fish): boolean {
    return this.name == other.name;
  }
}

describe("Equality", () => {
  describe.each([
    {
      constructorVisibility: "public",
      factory: (name: string) => new Bear(name)
    },

    {
      constructorVisibility: "private",
      factory: (name: string) => Fish.create(name)
    }
  ])("for class having a $constructorVisibility constructor", ({ factory }) => {
    describe("when neither operand is undefined", () => {
      describe("when the operands are equal", () => {
        it("should return true", () => {
          expect(
            optionalEquals(factory("Omicron"), factory("Omicron"))
          ).toBeTrue();
        });
      });

      describe("when the operands are different", () => {
        it("should return false", () => {
          expect(optionalEquals(factory("Alpha"), factory("Beta"))).toBeFalse();
        });
      });
    });

    describe("when only the left operand is undefined", () => {
      it("should return false", () => {
        expect(optionalEquals(undefined, factory("Beta"))).toBeFalse();
      });
    });

    describe("when only the right operand is undefined", () => {
      it("should return false", () => {
        expect(optionalEquals(factory("Alpha"), undefined)).toBeFalse();
      });
    });

    describe("when both operands are undefined", () => {
      it("should return true", () => {
        expect(
          optionalEquals(
            undefined as unknown as Bear,
            undefined as unknown as Bear
          )
        ).toBeTrue();
      });
    });
  });

  describe("when the operands belong to different classes", () => {
    describe("when the types are structurally compatible", () => {
      it("should still return true", () => {
        const name = "Yogi";
        const bear = new Bear(name);
        const fish = Fish.create(name);
        const equality = optionalEquals(bear, fish);

        expect(equality).toBeTrue();
      });
    });
  });
});
