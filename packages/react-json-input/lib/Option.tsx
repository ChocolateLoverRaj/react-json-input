import { OptionComponent } from './props'

const Option: OptionComponent = props => {
  const { value, children } = props
  return <option value={value}>{children}</option>
}

export default Option
