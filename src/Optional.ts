export type None = undefined | null;

export type Mapper<TSource, TDest> = (source: TSource) => TDest;

export interface HasEquals {
  equals(other: ThisType<this>): boolean;
}

export namespace Optional {
  export function map<TSource, TDest>(
    source: TSource | None,
    mapper: Mapper<TSource, TDest>
  ): TDest | undefined {
    switch (source) {
      case undefined:
      case null:
        return undefined;

      default:
        return mapper(source);
    }
  }

  export function equals<T extends HasEquals>(
    left: T | None,
    right: T | None
  ): boolean {
    if (left == null || right == null) {
      return left == null && right == null;
    }

    return left.equals(right);
  }
}
