import { Props } from '@chocolateloverraj/react-json-input/dist/props'
import { JsonInput } from '@chocolateloverraj/react-json-input'
import ValidationNoErrors from './ValidationNoErrors'
import ValidationErrors from './ValidationErrors'

const JsonInputAntd = <T extends unknown = any>(props: Partial<Props<T>>): JSX.Element => {
  return (
    <JsonInput
      ValidationNoErrors={ValidationNoErrors}
      ValidationErrors={ValidationErrors}
      {...props}
    />
  )
}

export default JsonInputAntd
