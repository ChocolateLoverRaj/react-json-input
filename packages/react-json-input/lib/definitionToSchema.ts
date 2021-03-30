import { JSONSchema7, JSONSchema7Definition } from 'json-schema'

/**
 * Handles undefined and boolean values
 */
const definitionToSchema = (definition?: JSONSchema7Definition): JSONSchema7 => typeof definition === 'boolean'
  ? {}
  : definition ?? {}

export default definitionToSchema
