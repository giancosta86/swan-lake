import { ExpressiveUrl } from "./ExpressiveUrl";

describe("Expressive URL", () => {
  describe("creation", () => {
    describe("when passing a valid URL", () => {
      it("should create the url", () => {
        const sourceString = "https://gianlucacosta.info/";

        const url = ExpressiveUrl.create(sourceString);

        expect(url.toString()).toBe(sourceString);
      });
    });

    describe("when passing an  URL", () => {
      it("should create the url", () => {
        const sourceString = "<THIS IS NOT A URL>";

        expect(() => {
          ExpressiveUrl.create(sourceString);
        }).toThrow(`Invalid URL: ${sourceString}`);
      });
    });
  });
});
