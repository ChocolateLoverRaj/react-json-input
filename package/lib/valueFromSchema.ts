import { JSONSchema7 } from 'json-schema'
import getValidInput from './getValidInput'
import { Input } from './props'

const valueFromSchema = (value: any, inputs: Array<Input<any, any>>, schema: JSONSchema7): any => getValidInput(inputs, schema)
  .to(value, schema, inputs)

export default valueFromSchema
