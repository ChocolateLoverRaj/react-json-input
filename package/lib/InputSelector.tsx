import React, { ChangeEventHandler, useCallback, useContext } from 'react'
import { InputSelectorComponent } from './props'
import RootContext from './RootContext'

const InputSelector: InputSelectorComponent = props => {
  const { inputs, value: { name }, onChange } = props

  const { readOnly, disabled } = useContext(RootContext)

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
