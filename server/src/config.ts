/**
 * JWT config.
 */
export const config = {
	algorithms: ['HS256' as const],
	secret: 'logu_bc', // TODO Put in process.env
};
