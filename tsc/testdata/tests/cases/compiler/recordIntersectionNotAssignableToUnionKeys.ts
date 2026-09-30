// @strict: true

// A key that belongs only to one side of the intersection has that side's property type.
// It is not T & U, so the intersection is not assignable to Record<K1 | K2, T & U>.
const f = <K1 extends string, T, K2 extends string, U>(
    x: Record<K1, T> & Record<K2, U>,
    // @ts-expect-error
): Record<K1 | K2, T & U> => x;

// An empty mapped type does not supply the missing keys.
const f2 = <K1 extends string, T, K2 extends string, U>(
    x: Record<never, unknown> & Record<K1, T> & Record<K2, U>,
    // @ts-expect-error
): Record<never, unknown> & Record<K1 | K2, T & U> => x;

// A concrete constituent does not supply the missing keys either.
const f2b = <K1 extends string, T, K2 extends string, U>(
    x: { x: 2 } & Record<K1, T> & Record<K2, U>,
    // @ts-expect-error
): { x: 2 } & Record<K1 | K2, T & U> => x;

// The same non-mapped constituent is fine when every target key is on both records.
const f3 = <K extends string, T, U>(
    x: { x: 2 } & Record<K, T> & Record<K, U>,
): { x: 2 } & Record<K, T & U> => x;

// Same keys: every property is present on both sides.
const g = <K extends string, T, U>(
    x: Record<K, T> & Record<K, U>,
): Record<K, T & U> => x;

// Same property type on every key.
const h = <K1 extends string, K2 extends string, T>(
    x: Record<K1, T> & Record<K2, T>,
): Record<K1 | K2, T> => x;

// K2 is a subset of K1, so every key of the target is present on both sides.
const i = <K1 extends string, K2 extends K1, T, U>(
    x: Record<K1, T> & Record<K2, U>,
): Record<K2, T & U> => x;

// T is assignable to U, so each side's property type is assignable to U.
const j = <K1 extends string, K2 extends string, T extends U, U>(
    x: Record<K1, T> & Record<K2, U>,
): Record<K1 | K2, U> => x;
