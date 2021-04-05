import { DeleteButtonComponent } from '@chocolateloverraj/react-json-input/dist/props'
import { CloseOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { RootContext } from '@chocolateloverraj/react-json-input'
import { Button } from 'antd'

const DeleteButton: DeleteButtonComponent = props => {
  const { onClick } = props

  const { disabled, readOnly } = useContext(RootContext)

  return (
    <Button
      disabled={disabled || readOnly}
      icon={<CloseOutlined onClick={onClick} />}
      type='text'
    />
  )
}

export default DeleteButton
