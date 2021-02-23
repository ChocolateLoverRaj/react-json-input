import Container from './Container'
import stringInput from './inputs/_stringInput'
import InputSelector from './InputSelector'
import { BaseProps } from './props'
import Row from './Row'

const defaultProps: BaseProps = {
  Container: Container,
  Row: Row,
  InputSelector: InputSelector,
  schema: {},
  inputs: [stringInput]
}

export default defaultProps
