import { JSONSchema7 } from 'json-schema'
import { Input, SelectedInput } from './props'

const getSelectedInput = (input: Input, schema: JSONSchema7, inputs: Array<Input<any, any>>): SelectedInput<any> => {
  const { name, getInitialInputData } = input
  return {
    name: name,
    data: getInitialInputData(schema, inputs)
  }
}

export default getSelectedInput
