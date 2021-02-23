import { Input, InputComponent } from '../props'

const StringInputComponent: InputComponent<string> = props => {
  return null
}

const stringInput: Input = {
  name: 'string',
  Component: StringInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'string'
}

export default stringInput
