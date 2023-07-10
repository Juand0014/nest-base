export const envConfig = () => ({
	database: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_DATABASE
	},
	environment: process.env.NODE_ENV || 'development',
	cors: {
		origin: process.env.CORS_ALLOWED_HOSTS.split(','),
		credential: true
	},
	dburi: process.env.DB_URI_DEV
});

export const { database, environment, cors, dburi } = envConfig();