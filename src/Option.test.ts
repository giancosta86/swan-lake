import { Option } from "./Option";

describe("Option", () => {
  describe("mapping", () => {
    describe("when the source is undefined", () => {
      it("should return undefined", () => {
        const mapping = Option.map<number, number>(undefined, x => x + 90);

        expect(mapping).toBeUndefined();
      });
    });

    describe("when the source is null", () => {
      it("should return null", () => {
        const mapping = Option.map<number, number>(null, x => x + 90);

        expect(mapping).toBeNull();
      });
    });

    describe("when the source is neither undefined nor null", () => {
      it("should apply the mapping", () => {
        const mapping = Option.map<number, number>(2, x => x + 90);

        expect(mapping).toBe(92);
      });
    });
  });

  describe("equality", () => {
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

    describe.each([
      {
        constructorVisibility: "public",
        factory: (name: string) => new Bear(name)
      },

      {
        constructorVisibility: "private",
        factory: (name: string) => Fish.create(name)
      }
    ])(
      "for class having a $constructorVisibility constructor",
      ({ factory }) => {
        describe("when neither operand is undefined or null", () => {
          describe("when the operands are equal", () => {
            it("should return true", () => {
              expect(
                Option.equals(factory("Omicron"), factory("Omicron"))
              ).toBeTrue();
            });
          });

          describe("when the operands are different", () => {
            it("should return false", () => {
              expect(
                Option.equals(factory("Alpha"), factory("Beta"))
              ).toBeFalse();
            });
          });
        });

        describe.each([undefined, null])(
          "when the type meaning 'missing value' is '%p'",
          missingType => {
            describe(`when only the left operand is ${missingType}`, () => {
              it("should return false", () => {
                expect(Option.equals(missingType, factory("Beta"))).toBeFalse();
              });
            });

            describe(`when only the right operand is ${missingType}`, () => {
              it("should return false", () => {
                expect(
                  Option.equals(factory("Alpha"), missingType)
                ).toBeFalse();
              });
            });

            describe(`when both operands are ${missingType}`, () => {
              it("should return true", () => {
                expect(
                  Option.equals(
                    missingType as unknown as Bear,
                    missingType as unknown as Bear
                  )
                ).toBeTrue();
              });
            });
          }
        );
      }
    );

    describe(`when one operand is null and the other undefined`, () => {
      it("should return true", () => {
        expect(
          Option.equals(null as unknown as Bear, undefined as unknown as Bear)
        ).toBeTrue();
      });
    });

    describe("when the operands belong to different classes", () => {
      describe("when the types are structurally compatible", () => {
        it("should still return true", () => {
          const name = "Yogi";
          const bear = new Bear(name);
          const fish = Fish.create(name);
          const equality = Option.equals(bear, fish);

          expect(equality).toBeTrue();
        });
      });
    });
  });
});
