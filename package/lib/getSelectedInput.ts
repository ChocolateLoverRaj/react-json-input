import { JSONSchema7 } from 'json-schema'
import { Input, SelectedInput } from './props'

const getSelectedInput = (input: Input, schema: JSONSchema7, inputs: Array<Input<any, any>>): SelectedInput<any, any> => {
  const { name, getInitialInputData } = input
  return {
    name: name,
    state: getInitialInputData(schema, inputs)
  }
}

export default getSelectedInput
