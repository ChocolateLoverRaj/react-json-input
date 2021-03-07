import React, { ChangeEventHandler, useCallback } from 'react'
import { InputSelectorComponent } from './props'

const InputSelector: InputSelectorComponent = props => {
  const { inputs, rootProps, value: { name }, onChange } = props
  const { readOnly, disabled } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(({ target: { value } }) => {
    onChange(inputs[value])
  }, [inputs, onChange])

  return (
    <select
      value={inputs.findIndex(({ name: currentName }) => currentName === name)}
      onChange={handleChange}
      disabled={disabled || readOnly}
    >
      {inputs.map(({ name }, i) => <option key={i} value={i}>{name}</option>)}
    </select>
  )
}

export default InputSelector
