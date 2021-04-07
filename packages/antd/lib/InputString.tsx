import { RootContext } from '@chocolateloverraj/react-json-input'
import { InputComponent } from '@chocolateloverraj/react-json-input/dist/props'
import rowProps from '@chocolateloverraj/react-json-input/dist/rowProps'
import { ChangeEventHandler, useCallback, useContext } from 'react'
import { Input } from 'antd'

const InputString: InputComponent<string, undefined> = props => {
  const { value, onChange } = props

  const { Row, disabled, readOnly } = useContext(RootContext)

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <Row {...rowProps(props)}>
      <Input
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Row>
  )
}

export default InputString
