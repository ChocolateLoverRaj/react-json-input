import { Props } from '@chocolateloverraj/react-json-input/dist/props'
import {JsonInput} from '@chocolateloverraj/react-json-input'

const JsonInputAntd = <T extends unknown = any>(props: Partial<Props<T>>): JSX.Element => {
  return <JsonInput {...props} />
}

export default JsonInputAntd