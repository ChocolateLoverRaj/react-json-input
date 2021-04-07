import React, { ChangeEventHandler, useCallback, useContext } from 'react'
import isAnyOf from '../isAnyOf'
import isEnum from '../isEnum'
import { Input, InputComponent } from '../props'
import RootContext from '../RootContext'
import rowProps from '../rowProps'

const BooleanInputComponent: InputComponent<boolean> = props => {
  const { value, onChange } = props

  const { readOnly, disabled, Row } = useContext(RootContext)

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { checked } }) => {
    onChange(checked)
  }, [onChange])

  return (
    <Row {...rowProps(props)}>
      <input
        type='checkbox'
        checked={value}
        onChange={handleChange}
        disabled={disabled || readOnly}
      />
    </Row>
  )
}

const booleanInput: Input<boolean, undefined> = {
  name: 'boolean',
  Component: BooleanInputComponent,
  isValid: schema => !isEnum(schema) && !isAnyOf(schema) && (schema.type === undefined || schema.type === 'boolean'),
  isType: value => typeof value === 'boolean',
  to: value => ({
    value: Boolean(value),
    state: undefined
  })
}

export default booleanInput
