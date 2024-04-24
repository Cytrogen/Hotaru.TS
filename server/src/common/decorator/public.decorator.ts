import { SetMetadata } from '@nestjs/common'

/**
 * A string constant used as a key for the metadata.
 * It identifies whether a route is public or not.
 */
export const IS_PUBLIC_KEY = 'isPublic'

/**
 * A decorator that sets metadata on a route to mark it as public.
 * When a route is marked as public, it means it can be accessed without authentication.
 *
 * @constructor
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
