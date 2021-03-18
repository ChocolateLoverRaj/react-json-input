import never from 'never'
import { Input, InputComponent } from '../props'
import rowProps from '../rowProps'
import React, { ChangeEventHandler, useCallback, useContext } from 'react'
import { JSONSchema7 } from 'json-schema'
import isEnum from '../isEnum'
import RootContext from '../RootContext'

type EnumType = string | number | null | boolean

const getOptions = (schema: JSONSchema7): EnumType[] => schema.enum as EnumType[] ?? [schema.const]

const EnumInputComponent: InputComponent<EnumType> = props => {
  const { value, onChange, schema } = props

  const { readOnly, disabled, Row } = useContext(RootContext)

  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(e => {
    onChange(JSON.parse(e.target.value))
  }, [onChange])

  const options = getOptions(schema)

  return (
    <Row {...rowProps(props)}>
      <select
        disabled ={disabled || readOnly}
        value={JSON.stringify(value)}
        onChange={handleChange}
      >
        {options.map(option => {
          const value = JSON.stringify(option)
          return <option key={value} value={value}>{value}</option>
        })}
      </select>
    </Row>
  )
}

const enumInput: Input<EnumType, undefined> = {
  name: 'enum',
  Component: EnumInputComponent,
  isType: value => ['string', 'number', 'null', 'boolean'].includes(typeof value),
  isValid: schema => isEnum(schema),
  to: (value, state, schema) => {
    const options = getOptions(schema)
    return {
      value: options.includes(value) ? value : options[0] ?? never('No options in enum'),
      state: undefined
    }
  }
}

export default enumInput
