class InvalidTokenError extends Error {
	constructor(message) {
		super(message);
		this.name = 'InvalidTokenError';
	}
}
module.exports.InvalidTokenError = InvalidTokenError

function tokenize(source, options) {
	const tokens = [];
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
					const [t, i] = v(char, { col, row }, line);
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
module.exports.default = tokenize

function skip() {
	return [null, 0];
}
module.exports.skip = skip;