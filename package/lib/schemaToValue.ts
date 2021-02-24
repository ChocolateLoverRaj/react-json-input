import { JSONSchema7 } from 'json-schema'

const schemaToValue = (schema: JSONSchema7): any => {
  const { type } = schema
  switch (type) {
    case undefined:
      return null
    case 'null':
      return null
    case 'boolean':
      return false
    case 'string':
      return ''
    case 'number':
      return 0
    case 'array':
      // TODO: better array schema
      return []
    default:
      throw new Error('Unsupported schema type')
  }
}

export default schemaToValue
