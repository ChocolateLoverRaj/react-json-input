import React, { useCallback, useContext } from 'react'
import { InputSelectorComponent, SelectPropsOnChange } from './props'
import RootContext from './RootContext'

const InputSelector: InputSelectorComponent = props => {
  const { inputs, value: { name }, onChange } = props

  const { readOnly, disabled, Select, Option } = useContext(RootContext)

  const handleChange = useCallback<SelectPropsOnChange>(newIndex => {
    onChange(inputs[newIndex])
  }, [inputs, onChange])

  return (
    <Select
      value={inputs.findIndex(({ name: currentName }) => currentName === name)}
      onChange={handleChange}
      disabled={disabled || readOnly}
    >
      {inputs.map(({ name }, i) => <Option key={i} value={i}>{name}</Option>)}
    </Select>
  )
}

export default InputSelector
