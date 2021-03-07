import { JSONSchema7 } from 'json-schema'
import never from 'never'
import { Input } from './props'

const getValidInput = (inputs: Input[], schema: JSONSchema7): Input => inputs
  .find(({ isValid }) => isValid(schema)) ?? never('No valid input')

export default getValidInput
