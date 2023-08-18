export interface Comparable<T> {
  isEqual(object: T): boolean;
}