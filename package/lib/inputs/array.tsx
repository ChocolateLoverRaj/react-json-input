import { JSONSchema7 } from 'json-schema'
import React, { MouseEventHandler } from 'react'
import { Input, InputComponent, ControlledPropsOnChange, RowPropsWithoutChildrenOnDelete } from '../props'
import schemaToValue from '../schemaToValue'

const ArrayInputComponent: InputComponent<any[]> = props => {
  const { schema, name, rootProps, children, value, onChange } = props
  const { items } = schema
  const { InputChooser } = rootProps

  if (items instanceof Array) {
    throw new Error('Tuples not supported yet')
  } else if (typeof items === 'boolean') {
    throw new Error('Unknown items type')
  }

  const itemSchema: JSONSchema7 = items ?? {}

  const handleNewElement: MouseEventHandler<HTMLButtonElement> = () => {
    onChange([...value, schemaToValue(itemSchema)])
  }

  return (
    <>
      <tr>
        <td>Validation Coming Soon</td>
        <th>{name}</th>
        <td>{children}</td>
      </tr>
      {value.map((element, i) => {
        const handleChange: ControlledPropsOnChange = newValue => {
          onChange([...value.slice(0, i), newValue, ...value.slice(i + 1)])
        }

        const handleDelete: RowPropsWithoutChildrenOnDelete = () => {
          console.log(value, [...value.slice(0, i), ...value.slice(i + 1)])
          onChange([...value.slice(0, i), ...value.slice(i + 1)])
        }

        // FIXME: We need to use the `key` prop, but idk how
        return (
          <InputChooser
            rootProps={rootProps}
            name={`${name}[${i}]`}
            schema={itemSchema}
            value={element}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        )
      })}
      <tr>
        <td></td>
        <th>{name}[+]</th>
        <td>
          <button onClick={handleNewElement}>New Element</button>
        </td>
      </tr>
    </>
  )
}

const arrayInput: Input<any[]> = {
  name: 'array',
  Component: ArrayInputComponent,
  isType: value => value instanceof Array,
  isValid: schema => schema.type === undefined || schema.type === 'array',
  to: () => []
}

export default arrayInput
