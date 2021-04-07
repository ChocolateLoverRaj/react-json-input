import { ValidationErrorsComponent } from '@chocolateloverraj/react-json-input/dist/props'
import { WarningOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

const ValidationErrors: ValidationErrorsComponent = props => {
  const { message } = props
  return (
    <Tooltip title={message}>
      <WarningOutlined />
    </Tooltip>
  )
}

export default ValidationErrors
