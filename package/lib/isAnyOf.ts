import { JSONSchema7 } from 'json-schema'

/**
 * Check if a schema is an anyOf
 */
const isAnyOf = (schema: JSONSchema7): boolean => schema.anyOf !== undefined

export default isAnyOf
