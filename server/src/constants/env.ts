const getEnv = (key: string, defaultValue?: string): string => {
	const value = process.env[key] || defaultValue;

	if (value === undefined) {
		throw new Error(`Environment variable ${key} is required`);
	}

	return value;
};

export const PORT = getEnv('PORT', '8000');
export const MONGO_URI = getEnv('MONGO_URI');
