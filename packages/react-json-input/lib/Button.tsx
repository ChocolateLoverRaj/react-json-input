import { ButtonComponent } from './props'

const Button: ButtonComponent = props => {
  const { onClick, children, disabled } = props

  return <button onClick={onClick} disabled={disabled}>{children}</button>
}

export default Button
