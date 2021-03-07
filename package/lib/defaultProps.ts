import Container from './Container'
import InputSelector from './InputSelector'
import { BaseProps } from './props'
import InputChooser from './InputChooser'
import Validation from './Validation'
import Row from './Row'
import ValidationNoErrors from './ValidationNoErrors'
import ValidationErrors from './ValidationErrors'
import InputName from './InputName'
import defaultInputs from './defaultInputs'

const defaultProps: BaseProps = {
  Container: Container,
  InputChooser: InputChooser,
  InputSelector: InputSelector,
  Validation: Validation,
  ValidationNoErrors: ValidationNoErrors,
  ValidationErrors: ValidationErrors,
  Row: Row,
  InputName: InputName,
  schema: {},
  inputs: defaultInputs,
  readOnly: false,
  disabled: false,
  nameStyle: {
    style: 'indent',
    spaces: 4
  }
}

export default defaultProps
