import React, { ChangeEventHandler, useCallback, useContext } from 'react'
import isEnum from '../isEnum'
import { Input, InputComponent } from '../props'
import RootContext from '../RootContext'
import rowProps from '../rowProps'

const StringInputComponent: InputComponent<string> = props => {
  const { value, onChange } = props

  const { readOnly, disabled, Row } = useContext(RootContext)

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    onChange(value)
  }, [onChange])

  return (
    <Row {...rowProps(props)}>
      <input
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
      />
    </Row>
  )
}

const stringInput: Input<string, undefined> = {
  name: 'string',
  Component: StringInputComponent,
  isValid: schema => !isEnum(schema) && (schema.type === undefined || schema.type === 'string'),
  isType: value => typeof value === 'string',
  to: value => ({
    value: String(value),
    state: undefined
  })
}

export default stringInput
