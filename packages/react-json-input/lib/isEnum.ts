import { JSONSchema7 } from 'json-schema'

/**
 * Check if a schema is a enum
 */
const isEnum = (schema: JSONSchema7): boolean => (schema.enum ?? schema.const) !== undefined

export default isEnum
