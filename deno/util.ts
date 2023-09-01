// deno-lint-ignore-file no-explicit-any
type RangeValidator = (value: number) => boolean;
export function makeRange(min: number, max: number): RangeValidator {
	return (value: number) => min <= value && value <= max;
}

export type Base2 = 0 | 1;
export type Base10 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * The `exec` function takes two inputs, `a` and `b`, and a function `fn`, and returns the result of
 * applying `fn` to `a` and `b`, either as a single value or as an array of values if `a` or `b` is an
 * array.
 * @param {A | A[]} a - The parameter `a` can be either a single value of type `A` or an array of
 * values of type `A`.
 * @param {B | B[]} b - The parameter `b` can be either a single value of type `B` or an array of
 * values of type `B`.
 * @param fn - The `fn` parameter is a function that takes two arguments `a` and `b` of types `A` and
 * `B` respectively, and returns a value of type `C`.
 * @returns The function `exec` returns either a single value of type `C` or an array of values of type
 * `C`.
 */
export function exec<A, B, C>(
	a: A | A[],
	b: B | B[],
	fn: (a: A, b: B) => C
): C | C[] {
	if (Array.isArray(a) && Array.isArray(b)) {
		const results: C[] = [];
		for (let i = 0; i < a.length; i++)
			for (let j = 0; j < b.length; j++) results.push(fn(a[i], b[j]));

		return results;
	}
	if (Array.isArray(a)) {
		const results: C[] = [];
		for (let i = 0; i < a.length; i++) results.push(fn(a[i], b as B));
		return results;
	}
	if (Array.isArray(b)) {
		const results: C[] = [];
		for (let i = 0; i < b.length; i++) results.push(fn(a as A, b[i]));
		return results;
	}
	return fn(a as A, b as B);
}

export const List = {
/* The `concat` function is used to concatenate multiple arrays into a single array. */
	concat<T>(
		array: T[],
		compare: (x: T, y: T) => boolean,
		...lists: T[][]
	): T[] {
		for (let i = 0; i < lists.length; i++)
			List.push(array, compare, ...lists[i]);

		return array;
	},
/* The `push` function is used to add elements to an array `array` while ensuring that no duplicate
elements are added. */
	push<T>(array: T[], compare: (x: T, y: T) => boolean, ...lists: T[]): T[] {
		for (let i = 0; i < lists.length; i++) {
			const element = lists[i];
			if (!array.find(x => compare(x, element))) array.push(element);
		}
		return array;
	},
/* The `toConcat` function is used to concatenate multiple arrays into a single array while ensuring
that no duplicate elements are added. */
	toConcat<T>(
		array: T[],
		compare: (x: T, y: T) => boolean,
		...lists: T[][]
	): T[] {
		const result = [...array];
		List.concat(result, compare, ...lists);
		return result;
	},
/* The `toPush` function is used to add elements to an array `array` while ensuring that no duplicate
elements are added. It takes an array `array`, a comparison function `compare`, and one or more
lists of elements `lists` as parameters. */
	toPush<T>(array: T[], compare: (x: T, y: T) => boolean, ...lists: T[]): T[] {
		const result = [...array];
		List.push(result, compare, ...lists);
		return result;
	},
};
/**
 * The function `getRuntime` determines the runtime environment (Node.js, Deno, Bun.js, or Browser)
 * based on the presence of specific global objects.
 * @returns the runtime environment in which the code is being executed. It will return one of the
 * following values: 'Node.js' if the code is running in Node.js, 'Deno' if the code is running in
 * Deno, 'Bun.js' if the code is running in Bun.js, or 'Browser' if the code is running in a browser.
 */
export function getRuntime() {
	// Node.js
	if ((globalThis as any).Buffer) return 'Node.js';
	// Deno
	if ((globalThis as any).Deno) return 'Deno';
	// Bun.js
	if ((globalThis as any).Bun) return 'Bun.js';
	// Browser
	return 'Browser';
}
