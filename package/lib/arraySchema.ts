import { JSONSchema7 } from 'json-schema'
import definitionToSchema from './definitionToSchema'

/**
 * Convert an array schema into an array of item schemas
 */
const arraySchema = (schema: JSONSchema7): JSONSchema7[] => {
  const { items, minItems } = schema
  const arr: JSONSchema7[] = []
  const itemsLength = items instanceof Array ? items.length : minItems ?? 0
  for (let i = 0; i < itemsLength; i++) {
    const itemSchema: JSONSchema7 = items instanceof Array
      ? definitionToSchema(items[i])
      : definitionToSchema(items)
    arr.push(itemSchema)
  }
  return arr
}

export default arraySchema
