/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Enterprise-grade type utility library
 * UTILITY REASON: Advanced TypeScript utility types for complex enterprise applications
 * ARCHITECTURE: Comprehensive utility type collection with performance optimization and type safety
 *
 * Phase 3 Type Safety Framework - Enterprise Utility Types
 * Design Pattern: Advanced mapped types, conditional types, and template literal types
 * Zero Runtime Cost: All utilities are compile-time only with maximum type inference
 * Enterprise-Grade: Production-ready utilities for complex business logic and data transformation
 */

// CONTEXT7 SOURCE: /sindresorhus/type-fest - Advanced utility type patterns
// UTILITY FOUNDATION: Base utility types for enterprise applications

// ============================================================================
// BRANDED TYPE SYSTEM
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Branded types with unique symbols
// BRANDED TYPES: Advanced nominal typing for enterprise type safety
declare const __brand: unique symbol;
declare const __opaque: unique symbol;
declare const __nominal: unique symbol;

export type Brand<T, B> = T & { readonly [__brand]: B };
export type Opaque<T, B> = T & { readonly [__opaque]: B };
export type Nominal<T, B> = T & { readonly [__nominal]: B };

// CONTEXT7 SOURCE: /microsoft/typescript - Branded type utilities
// BRAND UTILITIES: Extract and manipulate branded types
export type ExtractBrand<T> = T extends Brand<any, infer B> ? B : never;
export type ExtractBase<T> = T extends Brand<infer U, any> ? U : T;
export type RebrandType<T, NewBrand> = T extends Brand<infer U, any>
  ? Brand<U, NewBrand>
  : Brand<T, NewBrand>;

// ============================================================================
// DEEP TYPE MANIPULATION
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Recursive mapped types for deep transformation
// DEEP UTILITIES: Advanced deep type manipulation utilities
export type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends Record<any, any>
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

export type DeepWritable<T> = T extends readonly (infer U)[]
  ? DeepWritable<U>[]
  : T extends ReadonlyArray<infer U>
  ? DeepWritable<U>[]
  : T extends ReadonlyMap<infer K, infer V>
  ? Map<DeepWritable<K>, DeepWritable<V>>
  : T extends ReadonlySet<infer U>
  ? Set<DeepWritable<U>>
  : T extends Record<any, any>
  ? { -readonly [K in keyof T]: DeepWritable<T[K]> }
  : T;

export type DeepPartial<T> = T extends Record<any, any>
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

export type DeepRequired<T> = T extends Record<any, any>
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : T;

export type DeepNonNullable<T> = T extends Record<any, any>
  ? { [K in keyof T]: DeepNonNullable<NonNullable<T[K]>> }
  : NonNullable<T>;

// ============================================================================
// ADVANCED OBJECT MANIPULATION
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced Pick and Omit variants
// OBJECT UTILITIES: Advanced object property manipulation
export type StrictPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type StrictOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

export type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export type OmitByValue<T, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K];
};

export type PickByValueType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

export type RequiredProperties<T> = Pick<T, RequiredKeys<T>>;
export type OptionalProperties<T> = Pick<T, OptionalKeys<T>>;

// CONTEXT7 SOURCE: /microsoft/typescript - Conditional object types
// CONDITIONAL OBJECT: Object types with conditional properties
export type ConditionalPick<T, Condition> = {
  [K in keyof T as T[K] extends Condition ? K : never]: T[K];
};

export type ConditionalOmit<T, Condition> = {
  [K in keyof T as T[K] extends Condition ? never : K]: T[K];
};

export type NonEmptyObject<T> = keyof T extends never ? never : T;

export type AtLeastOne<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Omit<T, K>>;
}[keyof T];

export type ExactlyOne<T> = {
  [K in keyof T]: Pick<T, K> & { [P in Exclude<keyof T, K>]?: never };
}[keyof T];

// ============================================================================
// FUNCTION TYPE UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced function type manipulation
// FUNCTION UTILITIES: Advanced function type manipulation and transformation
export type AsyncFunction<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => infer R
  ? (...args: A) => Promise<R>
  : never;

export type SyncFunction<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => Promise<infer R>
  ? (...args: A) => R
  : T;

export type CurriedFunction<T extends (...args: any[]) => any> = T extends (
  arg: infer A,
  ...rest: infer R
) => infer Return
  ? R extends []
    ? (arg: A) => Return
    : (arg: A) => CurriedFunction<(...args: R) => Return>
  : never;

export type PartialParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? {
      [K in keyof P]?: P[K];
    }
  : never;

export type FirstParameter<T extends (...args: any[]) => any> = T extends (
  first: infer F,
  ...args: any[]
) => any
  ? F
  : never;

export type LastParameter<T extends (...args: any[]) => any> = T extends (
  ...args: [...any[], infer L]
) => any
  ? L
  : never;

// ============================================================================
// ARRAY AND TUPLE UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced tuple and array manipulation
// ARRAY UTILITIES: Advanced array and tuple type manipulation
export type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]]
  ? H
  : never;

export type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest]
  ? Rest
  : never;

export type Last<T extends readonly any[]> = T extends readonly [...any[], infer L]
  ? L
  : never;

export type Init<T extends readonly any[]> = T extends readonly [...infer Init, any]
  ? Init
  : never;

export type Length<T extends readonly any[]> = T['length'];

export type Reverse<T extends readonly any[]> = T extends readonly [
  ...infer Rest,
  infer Last
]
  ? [Last, ...Reverse<Rest>]
  : [];

export type Zip<A extends readonly any[], B extends readonly any[]> = {
  [K in keyof A]: K extends keyof B ? [A[K], B[K]] : never;
};

export type Flatten<T extends readonly any[]> = T extends readonly [
  infer First,
  ...infer Rest
]
  ? First extends readonly any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : [];

export type Join<T extends readonly string[], Delimiter extends string = ','>
  = T extends readonly [infer First, ...infer Rest]
    ? First extends string
      ? Rest extends readonly string[]
        ? Rest['length'] extends 0
          ? First
          : `${First}${Delimiter}${Join<Rest, Delimiter>}`
        : never
      : never
    : '';

// ============================================================================
// STRING MANIPULATION UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Template literal types for string manipulation
// STRING UTILITIES: Advanced string manipulation with template literal types
export type Capitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

export type Uncapitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Capitalize<CamelCase<`${P2}${P3}`>>}`
  : S;

export type PascalCase<S extends string> = Capitalize<CamelCase<S>>;

export type KebabCase<S extends string> = S extends `${infer C}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<C>}${KebabCase<Rest>}`
    : `${Lowercase<C>}-${KebabCase<Uncapitalize<Rest>>}`
  : S;

export type SnakeCase<S extends string> = S extends `${infer C}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<C>}${SnakeCase<Rest>}`
    : `${Lowercase<C>}_${SnakeCase<Uncapitalize<Rest>>}`
  : S;

export type StartsWith<S extends string, Prefix extends string> = S extends `${Prefix}${any}`
  ? true
  : false;

export type EndsWith<S extends string, Suffix extends string> = S extends `${any}${Suffix}`
  ? true
  : false;

export type Split<S extends string, Delimiter extends string> = S extends `${infer First}${Delimiter}${infer Rest}`
  ? [First, ...Split<Rest, Delimiter>]
  : [S];

export type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${After}`
  : S;

export type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${ReplaceAll<After, From, To>}`
  : S;

// ============================================================================
// UNION AND INTERSECTION UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced union and intersection manipulation
// UNION UTILITIES: Advanced union type manipulation and transformation
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? [...UnionToTuple<Exclude<T, R>>, R]
  : [];

export type LastInUnion<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

export type ExcludeStrict<T, U> = T extends U
  ? U extends T
    ? never
    : T
  : T;

export type ExtractStrict<T, U> = T extends U
  ? U extends T
    ? T
    : never
  : never;

export type SymmetricDifference<T, U> = Exclude<T | U, T & U>;

export type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2)
  ? true
  : false;

// ============================================================================
// CONDITIONAL TYPE UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced conditional types with infer
// CONDITIONAL UTILITIES: Advanced conditional type manipulation
export type If<Condition extends boolean, Then, Else> = Condition extends true
  ? Then
  : Else;

export type Not<T extends boolean> = T extends true ? false : true;

export type And<A extends boolean, B extends boolean> = A extends true
  ? B extends true
    ? true
    : false
  : false;

export type Or<A extends boolean, B extends boolean> = A extends true
  ? true
  : B extends true
  ? true
  : false;

export type Xor<A extends boolean, B extends boolean> = A extends B ? false : true;

export type IsAny<T> = 0 extends (1 & T) ? true : false;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;

export type IsNull<T> = [T] extends [null] ? true : false;
export type IsUndefined<T> = [T] extends [undefined] ? true : false;
export type IsNullOrUndefined<T> = IsNull<T> extends true
  ? true
  : IsUndefined<T> extends true
  ? true
  : false;

// ============================================================================
// PERFORMANCE OPTIMIZED UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Performance-optimized type utilities
// PERFORMANCE UTILITIES: Zero-cost type utilities for enterprise performance
export type FastPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type FastOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

export type FastPartial<T> = {
  [P in keyof T]?: T[P];
};

export type FastRequired<T> = {
  [P in keyof T]-?: T[P];
};

export type FastReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

export type FastRecord<K extends PropertyKey, T> = {
  [P in K]: T;
};

// ============================================================================
// VALIDATION TYPE UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Type validation and constraint utilities
// VALIDATION UTILITIES: Runtime and compile-time type validation
export type Expect<T extends true> = T;
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false;

export type NotEqual<X, Y> = Equal<X, Y> extends true ? false : true;

export type AssertTrue<T extends true> = T;
export type AssertFalse<T extends false> = T;
export type AssertEqual<X, Y> = AssertTrue<Equal<X, Y>>;
export type AssertNotEqual<X, Y> = AssertTrue<NotEqual<X, Y>>;

export type HasProperty<T, K extends PropertyKey> = K extends keyof T ? true : false;
export type HasMethod<T, K extends PropertyKey> = K extends keyof T
  ? T[K] extends (...args: any[]) => any
    ? true
    : false
  : false;

// ============================================================================
// ENTERPRISE BUSINESS LOGIC UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Business logic type utilities
// BUSINESS UTILITIES: Enterprise-specific type utilities for business logic
export type EntityId<T extends string> = Brand<string, `${T}Id`>;
export type Timestamp = Brand<number, 'Timestamp'>;
export type Email = Brand<string, 'Email'>;
export type UUID = Brand<string, 'UUID'>;
export type URL = Brand<string, 'URL'>;
export type Money = Brand<number, 'Money'>;
export type Percentage = Brand<number, 'Percentage'>;

export type Entity<T, IdType extends string = 'id'> = T & {
  readonly [K in IdType]: EntityId<K>;
};

export type TimestampedEntity<T> = T & {
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
};

export type AuditableEntity<T> = TimestampedEntity<T> & {
  readonly createdBy: EntityId<'user'>;
  readonly updatedBy: EntityId<'user'>;
  readonly version: number;
};

export type SoftDeletableEntity<T> = T & {
  readonly deletedAt?: Timestamp;
  readonly deletedBy?: EntityId<'user'>;
};

// CONTEXT7 SOURCE: /microsoft/typescript - State machine type utilities
// STATE MACHINE: Type-safe state machine utilities
export type StateTransition<From, To, Event> = {
  readonly from: From;
  readonly to: To;
  readonly event: Event;
};

export type StateMachine<State, Event> = {
  readonly currentState: State;
  readonly transitions: readonly StateTransition<State, State, Event>[];
  readonly canTransition: (from: State, event: Event) => boolean;
};

export type ValidTransitions<T extends StateMachine<any, any>> = T extends StateMachine<
  infer State,
  infer Event
>
  ? {
      [K in State]: {
        [E in Event]: T['transitions'][number] extends StateTransition<K, infer To, E>
          ? To
          : never;
      };
    }
  : never;

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Error handling type utilities
// ERROR UTILITIES: Type-safe error handling patterns
export type Result<T, E = Error> = Success<T> | Failure<E>;

export type Success<T> = {
  readonly success: true;
  readonly data: T;
  readonly error?: never;
};

export type Failure<E> = {
  readonly success: false;
  readonly data?: never;
  readonly error: E;
};

export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

export type Try<T> = T | Error;
export type AsyncTry<T> = Promise<Try<T>>;

export type Optional<T> = T | null | undefined;
export type NonOptional<T> = T extends null | undefined ? never : T;

// CONTEXT7 SOURCE: /microsoft/typescript - Maybe monad type utilities
// MAYBE UTILITIES: Functional programming Maybe type utilities
export type Maybe<T> = Some<T> | None;

export type Some<T> = {
  readonly _tag: 'some';
  readonly value: T;
};

export type None = {
  readonly _tag: 'none';
};

export type IsSome<T> = T extends Some<any> ? true : false;
export type IsNone<T> = T extends None ? true : false;

export type ExtractMaybe<T> = T extends Some<infer U> ? U : never;

// ============================================================================
// TESTING UTILITIES
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Testing type utilities
// TESTING UTILITIES: Type utilities for testing and validation
export type TestCase<Input, Expected> = {
  readonly input: Input;
  readonly expected: Expected;
  readonly actual: Equal<Input, Expected>;
};

export type RunTests<Tests extends readonly TestCase<any, any>[]> = {
  [K in keyof Tests]: Tests[K] extends TestCase<infer I, infer E>
    ? TestCase<I, E> & { passed: Tests[K]['actual'] }
    : never;
};

export type AllTestsPassed<Tests extends readonly TestCase<any, any>[]> = RunTests<Tests> extends readonly (TestCase<any, any> & { passed: true })[]
  ? true
  : false;

// ============================================================================
// EXPORT COLLECTIONS
// ============================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Organized exports for module interface
// ORGANIZED EXPORTS: Clean module interface with categorized exports

// Core type utilities
export type {
  Brand,
  Opaque,
  Nominal,
  ExtractBrand,
  ExtractBase,
  RebrandType
};

// Deep manipulation utilities
export type {
  DeepReadonly,
  DeepWritable,
  DeepPartial,
  DeepRequired,
  DeepNonNullable
};

// Object manipulation utilities
export type {
  StrictPick,
  StrictOmit,
  PickByValue,
  OmitByValue,
  RequiredKeys,
  OptionalKeys,
  ConditionalPick,
  ConditionalOmit,
  AtLeastOne,
  ExactlyOne
};

// Function utilities
export type {
  AsyncFunction,
  SyncFunction,
  CurriedFunction,
  FirstParameter,
  LastParameter
};

// Array and tuple utilities
export type {
  Head,
  Tail,
  Last,
  Init,
  Length,
  Reverse,
  Flatten,
  Join
};

// String manipulation utilities
export type {
  CamelCase,
  PascalCase,
  KebabCase,
  SnakeCase,
  StartsWith,
  EndsWith,
  Split,
  Replace,
  ReplaceAll
};

// Union and intersection utilities
export type {
  UnionToIntersection,
  UnionToTuple,
  IsUnion,
  SymmetricDifference,
  IsEqual
};

// Conditional utilities
export type {
  If,
  Not,
  And,
  Or,
  Xor,
  IsAny,
  IsNever,
  IsUnknown
};

// Business logic utilities
export type {
  EntityId,
  Entity,
  TimestampedEntity,
  AuditableEntity,
  Email,
  UUID,
  Money,
  Timestamp
};

// Error handling utilities
export type {
  Result,
  Success,
  Failure,
  Try,
  Maybe,
  Some,
  None,
  Optional
};