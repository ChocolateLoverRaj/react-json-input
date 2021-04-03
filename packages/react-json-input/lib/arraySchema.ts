import { JSONSchema7 } from 'json-schema'
import definitionToSchema from './definitionToSchema'

/**
 * Convert an array schema into an array of item schemas.
 * Note: The number of items can be greater than limit because of the `minItems` property.
 */
function * arraySchema (schema: JSONSchema7, limit: number): Generator<JSONSchema7> {
  const { items, maxItems, additionalItems, minItems } = schema
  const additionalItemSchema = definitionToSchema(additionalItems)
  const itemsLength = Math.max(minItems ?? 0, Math.min(maxItems ?? Infinity, limit))
  for (let i = 0; i < itemsLength; i++) {
    const itemSchema: JSONSchema7 = items instanceof Array
      ? definitionToSchema(i < items.length ? items[i] : additionalItemSchema)
      : definitionToSchema(items)
    yield itemSchema
  }
}

export default arraySchema
