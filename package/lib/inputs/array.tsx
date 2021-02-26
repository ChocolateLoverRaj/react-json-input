import { JSONSchema7 } from 'json-schema'
import React, { MouseEventHandler } from 'react'
import DeleteButton from '../deleteButton'
import getSelectedInput from '../getSelectedInput'
import getValidInput from '../getValidInput'
import { Input, InputComponent, ControlledPropsOnChange, RowPropsWithoutChildrenOnDelete, OnSelectedInputChange, SelectedInput } from '../props'

const ArrayInputComponent: InputComponent<any[], Array<SelectedInput<any>>> = props => {
  const {
    schema,
    name,
    rootProps,
    children,
    value,
    onChange,
    inputData,
    onInputDataChange,
    onDelete
  } = props
  const { items } = schema
  const { InputChooser, inputs } = rootProps

  if (items instanceof Array) {
    throw new Error('Tuples not supported yet')
  } else if (typeof items === 'boolean') {
    throw new Error('Unknown items type')
  }

  const itemSchema: JSONSchema7 = items ?? {}

  const handleNewElement: MouseEventHandler<HTMLButtonElement> = () => {
    const input = getValidInput(inputs, itemSchema)
    onChange([...value, input.to(undefined)])
    onInputDataChange([...inputData, getSelectedInput(input)])
  }

  return (
    <>
      <tr>
        <td>Validation Coming Soon</td>
        <th>{name}</th>
        <td>{children}</td>
        <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
      </tr>
      {value.map((element, i) => {
        const selectedInput = inputData[i]

        const handleChange: ControlledPropsOnChange = newValue => {
          onChange([...value.slice(0, i), newValue, ...value.slice(i + 1)])
        }

        const handleDelete: RowPropsWithoutChildrenOnDelete = () => {
          onChange([...value.slice(0, i), ...value.slice(i + 1)])
          onInputDataChange([...inputData.slice(0, i), ...inputData.slice(i + 1)])
        }

        const handleSelectedInputChange: OnSelectedInputChange<any> = newSelectedInput => {
          onInputDataChange([...inputData.slice(0, i), newSelectedInput, ...inputData.slice(i + 1)])
        }

        return (
          <InputChooser
            key={`${i} ${selectedInput.name}`}
            rootProps={rootProps}
            name={`${name}[${i}]`}
            schema={itemSchema}
            value={element}
            onChange={handleChange}
            onDelete={handleDelete}
            selectedInput={selectedInput}
            onSelectedInputChange={handleSelectedInputChange}
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

const arrayInput: Input<any[], Array<SelectedInput<any>>> = {
  name: 'array',
  Component: ArrayInputComponent,
  isType: value => value instanceof Array,
  isValid: schema => schema.type === undefined || schema.type === 'array',
  to: () => [],
  getInitialInputData: () => []
}

export default arrayInput
