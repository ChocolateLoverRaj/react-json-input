import { Button as ButtonAntd } from 'antd'
import { ButtonComponent } from '@chocolateloverraj/react-json-input/dist/props'

const Button: ButtonComponent = props => {
  const { onClick, disabled, children } = props

  return <ButtonAntd onClick={onClick} disabled={disabled}>{children}</ButtonAntd>
}

export default Button
