import { JSONSchema7 } from 'json-schema'
import defaultInputs from './defaultInputs'
import getValidInput from './getValidInput'
import { Input } from './props'

const valueFromSchema = (schema: JSONSchema7, inputs: Array<Input<any, any>> = defaultInputs): any => getValidInput(inputs, schema)
  .to(undefined, undefined, schema, inputs)
  .value

export default valueFromSchema
