import React, { ChangeEventHandler, useCallback } from 'react'
import { InputSelectorComponent } from './props'

const InputSelector: InputSelectorComponent = props => {
  const { schema, rootProps, value, onChange } = props
  const { inputs, readonly, disabled } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(({ target: { value } }) => {
    onChange(parseInt(value))
  }, [onChange])

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled || readonly}
    >
      {inputs
        .filter(({ isValid }) => isValid(schema))
        .map(({ name }, i) => <option key={i} value={i}>{name}</option>)}
    </select>
  )
}

export default InputSelector
