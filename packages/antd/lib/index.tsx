import { Props } from '@chocolateloverraj/react-json-input/dist/props'
import { JsonInput } from '@chocolateloverraj/react-json-input'
import ValidationNoErrors from './ValidationNoErrors'
import ValidationErrors from './ValidationErrors'
import Select from './Select'
import Option from './Option'
import DeleteButton from './DeleteButton'

const JsonInputAntd = <T extends unknown = any>(props: Partial<Props<T>>): JSX.Element => {
  return (
    <JsonInput
      ValidationNoErrors={ValidationNoErrors}
      ValidationErrors={ValidationErrors}
      Select={Select}
      Option={Option}
      DeleteButton={DeleteButton}
      {...props}
    />
  )
}

export default JsonInputAntd
