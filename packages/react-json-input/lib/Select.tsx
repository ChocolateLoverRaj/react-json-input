import { ChangeEventHandler, useCallback } from 'react'
import { SelectComponent } from './props'

const Select: SelectComponent = props => {
  const { value, onChange, children, disabled } = props

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(e => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      {children}
    </select>
  )
}

export default Select
