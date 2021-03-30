import { JSONSchema7 } from 'json-schema'
import never from 'never'
import { Input } from './props'

const getValidInput = (inputs: Input[], schema: JSONSchema7, value?: any): Input => {
  const validInputs = inputs.filter(({ isValid }) => isValid(schema))
  return validInputs.find(({ isType }) => isType(value)) ?? validInputs[0] ?? never('No valid input')
}

export default getValidInput
