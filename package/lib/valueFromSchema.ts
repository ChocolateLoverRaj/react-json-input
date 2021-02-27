import { JSONSchema7 } from 'json-schema'
import getValidInput from './getValidInput'
import { Input } from './props'

const valueFromSchema = (inputs: Array<Input<any, any>>, schema: JSONSchema7): any => getValidInput(inputs, schema)
  .to(undefined)

export default valueFromSchema
