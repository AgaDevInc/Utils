/* The InvalidTokenError class is a custom error class that represents an error related to an invalid
token. */
export class InvalidTokenError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidTokenError';
	}
}

/* The `export interface Token<TokenType>` is defining an interface called `Token` that represents a
token in the code. It has four properties: */
export interface Token<TokenType> {
	type: TokenType;
	value: string;
	col: number;
	row: number;
}
type TokenOptionsCallback<TokenType> = (
	value: string,
	index: { col: number; row: number },
	line: string
) => [Token<TokenType> | null, number];
export type TokenOptions<TokenType> = [
	string | RegExp,
	TokenType | TokenOptionsCallback<TokenType>
][];

/**
 * The `tokenize` function takes a source code string and options, and returns an array of tokens based
 * on the provided options.
 * @param {string} source - The `source` parameter is a string that represents the source code or text
 * that needs to be tokenized.
 * @param options - The `options` parameter is an array of token options. Each token option is an array
 * with two elements: the first element is either a string or a regular expression that represents the
 * character(s) that should be matched, and the second element is the value or type of the token.
 * @returns an array of Token objects.
 */
export default function tokenize<TokenType>(
	source: string,
	options: TokenOptions<TokenType>
): Token<TokenType>[] {
	const tokens: Token<TokenType>[] = [];
	const lines = source.split(/\r?\n/);
	for (let row = 0; row < lines.length; row++) {
		const line = lines[row];
		for (let col = 0; col < line.length; col++) {
			const char = line[col];
			const token = options.find(option => {
				if (typeof option[0] === 'string') return option[0] === char;
				if (option[0] instanceof RegExp) return option[0].test(char);
			});
			if (token) {
				const v = token[1];
				if (typeof v === 'function') {
					const [t, i] = (v as TokenOptionsCallback<TokenType>)(
						char,
						{ col, row },
						line
					);
					if (t) tokens.push(t);
					col += i;
					continue;
				}
				tokens.push({ type: v, value: char, col, row });
			} else throw new InvalidTokenError(`Invalid token ${char}`);
		}
	}

	return tokens;
}

/**
 * The function "skip" returns a tuple with a null value and zero.
 * @returns an array with two elements: null and 0.
 */
export function skip(): [null, 0] {
	return [null, 0];
}
