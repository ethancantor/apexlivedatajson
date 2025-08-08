
export type CamelCase<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Lowercase<First>}${Rest}`
    : S;

export type PascalCase<S extends string> = S extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : S;

export type GetValueFromUnion<Union, Key extends string | number | symbol> = Union extends Record<Key, infer V> ? V : never;

export type StrictEmptyObject<T> =
    keyof T extends never
    ? Record<string, never>
    : T;

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = U[keyof U];

export type KeysFromUnion<T> = T extends T ? keyof T : never;