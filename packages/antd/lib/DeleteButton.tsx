import { DeleteButtonComponent } from '@chocolateloverraj/react-json-input/dist/props'
import { CloseOutlined } from '@ant-design/icons'

const DeleteButton: DeleteButtonComponent = props => {
  const { onClick } = props

  return <CloseOutlined onClick={onClick} />
}

export default DeleteButton
