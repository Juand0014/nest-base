export const envConfig = () => ({
	database: {
		development: process.env.DB_URI_DEV,
	},
	environment: process.env.NODE_ENV || 'development',
	cors: {
		allowedHosts: process.env.CORS_ALLOWED_HOSTS,
		credential: true
	},
	dburi: process.env.DB_URI_DEV
});

export const { database, environment, cors, dburi } = envConfig();