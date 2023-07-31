type RangeValidator = (value: number) => boolean;
export function makeRange(min: number, max: number): RangeValidator

export type Base2 = 0 | 1;
export type Base10 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function exec<A, B, C>(
	a: A | A[],
	b: B | B[],
	fn: (a: A, b: B) => C
): C | C[] 

export const List: {
	concat<T>(array: T[], compare: (x: T, y: T) => boolean, ...lists: T[][]): T[];
	push<T>(array: T[], compare: (x: T, y: T) => boolean, ...lists: T[]): T[];
	toConcat<T>(
		array: T[],
		compare: (x: T, y: T) => boolean,
		...lists: T[][]
	): T[];
	toPush<T>(array: T[], compare: (x: T, y: T) => boolean, ...lists: T[]): T[];
};
export function getRuntime(): 'Node.js' | 'Deno' | 'Bun.js' | 'Browser';
