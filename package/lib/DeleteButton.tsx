import { DeleteButtonComponent } from './props'

const DeleteButton: DeleteButtonComponent = props => {
  const { onClick, rootProps: { disabled, readOnly } } = props
  return disabled || readOnly
    ? null
    : <span onClick={onClick}>{'\u2717'}</span>
}

export default DeleteButton
