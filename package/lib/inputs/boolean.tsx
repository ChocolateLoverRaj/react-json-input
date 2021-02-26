import React, { ChangeEventHandler, useCallback } from 'react'
import { Input, InputComponent } from '../props'
import rowProps from '../rowProps'

const BooleanInputComponent: InputComponent<boolean> = props => {
  const { value, onChange, rootProps } = props
  const { readOnly, disabled, Row } = rootProps

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { checked } }) => {
    onChange(checked)
  }, [onChange])

  return (
    <Row {...rowProps(props)}>
      <input
        type='checkbox'
        checked={value}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </Row>
  )
}

const booleanInput: Input<boolean, undefined> = {
  name: 'boolean',
  Component: BooleanInputComponent,
  isValid: schema => schema.type === undefined || schema.type === 'boolean',
  isType: value => typeof value === 'boolean',
  to: Boolean,
  getInitialInputData: () => undefined
}

export default booleanInput
