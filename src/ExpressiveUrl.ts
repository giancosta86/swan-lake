export namespace ExpressiveUrl {
  export function create(source: string): URL {
    try {
      return new URL(source);
    } catch {
      throw new Error(`Invalid URL: ${source}`);
    }
  }
}
