import { registerAs } from '@nestjs/config'

/**
 * Configuration for the JWT module.
 *
 * @returns { Object } - Configuration object for the JWT module:
 * - secret: The secret key used to sign JWT tokens.
 * - audience: The audience for the JWT token, usually the identifier of the application.
 * - issuer: The issuer of the JWT token, usually the URL or name of the application.
 * - accessTokenTtl: The time-to-live (TTL) for access tokens in seconds.
 */
export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  }
})
