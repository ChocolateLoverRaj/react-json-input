import { RootContext } from '@chocolateloverraj/react-json-input'
import { InputComponent } from '@chocolateloverraj/react-json-input/dist/props'
import rowProps from '@chocolateloverraj/react-json-input/dist/rowProps'
import { useContext } from 'react'
import { InputNumber as InputNumberAntd } from 'antd'

const InputNumber: InputComponent<number, undefined> = props => {
  const { value, onChange } = props

  const { Row, disabled, readOnly } = useContext(RootContext)

  return (
    <Row {...rowProps(props)}>
      <InputNumberAntd
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Row>
  )
}

export default InputNumber
