import { Props, Input } from '@chocolateloverraj/react-json-input/dist/props'
import { JsonInput, defaultInputs } from '@chocolateloverraj/react-json-input'
import ValidationNoErrors from './ValidationNoErrors'
import ValidationErrors from './ValidationErrors'
import Select from './Select'
import Option from './Option'
import DeleteButton from './DeleteButton'
import Button from './Button'
import InputBoolean from './InputBoolean'
import InputNumber from './InputNumber'

const JsonInputAntd = <T extends unknown = any>(props: Partial<Props<T>>): JSX.Element => {
  const { inputs } = props

  const antdInputs = ((inputs ?? defaultInputs) as Input[])
    .map(input => {
      switch (input.name) {
        case 'boolean':
          return {
            ...input,
            Component: InputBoolean
          }
        case 'number':
          return {
            ...input,
            Component: InputNumber
          }
        default:
          return input
      }
    })

  return (
    <JsonInput
      ValidationNoErrors={ValidationNoErrors}
      ValidationErrors={ValidationErrors}
      Select={Select}
      Option={Option}
      DeleteButton={DeleteButton}
      Button={Button}
      {...props}
      inputs={antdInputs}
    />
  )
}

export default JsonInputAntd
