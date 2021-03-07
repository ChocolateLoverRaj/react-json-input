import { JSONSchema7 } from 'json-schema'

/**
 * Check if a schema is a enum
 */
const isEnum = (schema: JSONSchema7): boolean => schema.enum !== undefined

export default isEnum
