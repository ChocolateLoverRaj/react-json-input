import Container from './Container'
import booleanInput from './inputs/boolean'
import numberInput from './inputs/number'
import stringInput from './inputs/string'
import InputSelector from './InputSelector'
import { BaseProps } from './props'
import InputChooser from './InputChooser'
import Validation from './Validation'
import Row from './Row'
import nullInput from './inputs/null'

const defaultProps: BaseProps = {
  Container: Container,
  InputChooser: InputChooser,
  InputSelector: InputSelector,
  Validation: Validation,
  Row: Row,
  schema: {},
  inputs: [stringInput, numberInput, booleanInput, nullInput],
  readOnly: false,
  disabled: false
}

export default defaultProps
