import React, { ChangeEventHandler, useCallback } from 'react'
import { Input, InputComponent } from '../props'

const BooleanInputComponent: InputComponent<boolean> = props => {
  const { value, onChange, rootProps } = props
  const { readOnly, disabled } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { checked } }) => {
    onChange(checked)
  }, [onChange])

  return (
    <input
      type='checkbox'
      checked={value}
      onChange={handleChange}
      readOnly={readOnly}
      disabled={disabled}
    />
  )
}

const booleanInput: Input = {
  name: 'boolean',
  Component: BooleanInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'boolean',
  isType: value => typeof value === 'boolean'
}

export default booleanInput
