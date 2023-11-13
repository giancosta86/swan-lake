export type None = undefined | null;

export type Mapper<TSource, TDest> = (source: TSource) => TDest;

export interface HasEquals {
  equals(other: ThisType<this>): boolean;
}

export namespace Option {
  export function map<TSource, TDest>(
    source: TSource | None,
    mapper: Mapper<TSource, TDest>
  ): TDest | None {
    switch (source) {
      case undefined:
        return undefined;

      case null:
        return null;

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
