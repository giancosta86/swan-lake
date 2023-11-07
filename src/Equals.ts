export interface HasEquals {
  equals(other: ThisType<this>): boolean;
}

export function optionalEquals<T extends HasEquals>(
  left: T | undefined,
  right: T | undefined
): boolean {
  if (left === undefined || right === undefined) {
    return left === undefined && right === undefined;
  }

  return left.equals(right);
}
