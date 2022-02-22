export function invariant(value: unknown, message = 'INVARIANT'): asserts value {
  if (!value) {
    throw new Error(message);
  }
}
