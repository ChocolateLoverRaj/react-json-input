import { RootContext } from '@chocolateloverraj/react-json-input'
import { InputComponent } from '@chocolateloverraj/react-json-input/dist/props'
import { useCallback, useContext } from 'react'
import rowProps from '@chocolateloverraj/react-json-input/dist/rowProps'
import { Checkbox } from 'antd'
import { AbstractCheckboxProps, CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox'

const InputBoolean: InputComponent<boolean, undefined> = props => {
  const { value, onChange } = props

  const { Row, disabled, readOnly } = useContext(RootContext)

  const handleChange = useCallback<Exclude<AbstractCheckboxProps<CheckboxChangeEvent>['onChange'], undefined>>(e => {
    onChange(e.target.checked)
  }, [onChange])

  return (
    <Row {...rowProps(props)}>
      <Checkbox
        checked={value}
        onChange={handleChange}
        disabled={disabled || readOnly}
      />
    </Row>
  )
}

export default InputBoolean
