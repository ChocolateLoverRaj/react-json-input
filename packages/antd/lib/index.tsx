import { Props } from '@chocolateloverraj/react-json-input/dist/props'
import { JsonInput } from '@chocolateloverraj/react-json-input'
import ValidationNoErrors from './ValidationNoErrors'
import ValidationErrors from './ValidationErrors'
import Select from './Select'
import Option from './Option'

const JsonInputAntd = <T extends unknown = any>(props: Partial<Props<T>>): JSX.Element => {
  return (
    <JsonInput
      ValidationNoErrors={ValidationNoErrors}
      ValidationErrors={ValidationErrors}
      Select={Select}
      Option={Option}
      {...props}
    />
  )
}

export default JsonInputAntd
