import Container from './Container'
import numberInput from './inputs/number'
import stringInput from './inputs/string'
import InputSelector from './InputSelector'
import { BaseProps } from './props'
import Row from './Row'

const defaultProps: BaseProps = {
  Container: Container,
  Row: Row,
  InputSelector: InputSelector,
  schema: {},
  inputs: [stringInput, numberInput],
  readonly: false,
  disabled: false
}

export default defaultProps
