import { SelectComponent } from '@chocolateloverraj/react-json-input/dist/props'
import { Select as SelectAntd } from 'antd'
import { useCallback } from 'react'

const Select: SelectComponent = props => {
  const { value, onChange, disabled, children } = props

  const handleChange = useCallback(newValue => {
    onChange(newValue)
  }, [onChange])

  return <SelectAntd value={value} onChange={handleChange} disabled={disabled}>{children}</SelectAntd>
}

export default Select
