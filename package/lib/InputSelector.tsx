import React, { ChangeEventHandler, useCallback } from 'react'
import { InputSelectorComponent } from './props'

const InputSelector: InputSelectorComponent = props => {
  const { schema, rootProps, value, onChange } = props
  const { inputs } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(({ target: { value } }) => {
    onChange(parseInt(value))
  }, [onChange])

  return (
    <select value={value} onChange={handleChange}>
      {inputs
        .filter(({ isValid }) => isValid(schema))
        .map(({ name }, i) => <option value={i}>{name}</option>)}
    </select>
  )
}

export default InputSelector
