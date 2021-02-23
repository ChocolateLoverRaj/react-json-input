import Container from './Container'
import booleanInput from './inputs/boolean'
import numberInput from './inputs/number'
import stringInput from './inputs/string'
import InputSelector from './InputSelector'
import { BaseProps } from './props'
import Row from './Row'
import Validation from './Validation'

const defaultProps: BaseProps = {
  Container: Container,
  Row: Row,
  InputSelector: InputSelector,
  Validation: Validation,
  schema: {},
  inputs: [stringInput, numberInput, booleanInput],
  readOnly: false,
  disabled: false
}

export default defaultProps
