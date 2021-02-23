import Container from './Container'
import stringInput from './inputs/StringInput'
import { BaseProps } from './props'
import Row from './Row'

const defaultProps: BaseProps = {
  Container: Container,
  Row: Row,
  schema: {},
  inputs: [stringInput]
}

export default defaultProps
