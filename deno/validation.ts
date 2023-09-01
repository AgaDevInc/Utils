/**
 * The function `ValidType` checks if a value matches a specific type and throws an error if it
 * doesn't.
 * @param {T} value - The value parameter is the value that needs to be checked for its type validity.
 * It can be of any type.
 * @param callback - The `callback` parameter is a function that takes an `unknown` value as input and
 * returns a boolean value indicating whether the input value is of type `T`.
 * @returns the value if the callback function returns true for the value. Otherwise, it throws a
 * TypeError with a message indicating that the value is not a valid type.
 */
export function ValidType<T>(value: T, callback: (value: unknown) => value is T){
  if(callback(value)) return value;
  throw new TypeError(`${value} is not a valid type`);
}