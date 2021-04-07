import { OptionComponent } from '@chocolateloverraj/react-json-input/dist/props'
import { Select } from 'antd'

const Option: OptionComponent = props => {
  const { value, children } = props

  return <Select.Option value={value}>{children}</Select.Option>
}

export default Option
