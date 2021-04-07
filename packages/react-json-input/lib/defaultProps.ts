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
import DeleteButton from './DeleteButton'
import Select from './Select'
import Option from './Option'
import Button from './Button'

const defaultProps: BaseProps = {
  Container: Container,
  InputChooser: InputChooser,
  InputSelector: InputSelector,
  Validation: Validation,
  ValidationNoErrors: ValidationNoErrors,
  ValidationErrors: ValidationErrors,
  DeleteButton: DeleteButton,
  Row: Row,
  InputName: InputName,
  Select: Select,
  Option: Option,
  Button: Button,
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
