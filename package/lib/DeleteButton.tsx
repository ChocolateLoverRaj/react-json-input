import { useContext } from 'react'
import { DeleteButtonComponent } from './props'
import RootContext from './RootContext'

const DeleteButton: DeleteButtonComponent = props => {
  const { onClick } = props

  const { disabled, readOnly } = useContext(RootContext)

  return disabled || readOnly
    ? null
    : <span onClick={onClick}>{'\u2717'}</span>
}

export default DeleteButton
