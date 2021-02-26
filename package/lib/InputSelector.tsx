import React, { ChangeEventHandler, useCallback } from 'react'
import { InputSelectorComponent } from './props'

const InputSelector: InputSelectorComponent = props => {
  const { inputs, rootProps, value, onChange } = props
  const { readOnly, disabled } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(({ target: { value } }) => {
    onChange(value)
  }, [onChange])

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled || readOnly}
    >
      {inputs.map(({ name }) => <option key={name} value={name}>{name}</option>)}
    </select>
  )
}

export default InputSelector
