import React, { MouseEventHandler } from 'react'
import arraySchema from '../arraySchema'
import DeleteButton from '../deleteButton'
import getElementName from '../getElementName'
import getSelectedInput from '../getSelectedInput'
import getValidInput from '../getValidInput'
import { Input, InputComponent, ControlledPropsOnChange, RowPropsWithoutChildrenOnDelete, OnSelectedInputChange, SelectedInput } from '../props'
import valueFromSchema from '../valueFromSchema'
import definitionToSchema from '../definitionToSchema'

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
    onDelete,
    errors
  } = props
  const { additionalItems, items } = schema
  const {
    InputChooser,
    inputs,
    ValidationNoErrors,
    ValidationErrors,
    InputName,
    nameStyle
  } = rootProps

  const itemSchemas = arraySchema(schema)
  const minItems = schema.minItems ?? 0
  const maxItems = schema.maxItems ?? Infinity
  const newItemSchema = items instanceof Array
    ? value.length < items.length
      ? itemSchemas[value.length]
      : definitionToSchema(additionalItems)
    : definitionToSchema(items)
  const canAddNewItem = (
    value.length < maxItems &&
    (
      (items instanceof Array && value.length < items.length) ||
      additionalItems !== false
    )
  )

  const handleNewElement: MouseEventHandler<HTMLButtonElement> = () => {
    const input = getValidInput(inputs, newItemSchema)
    onChange([...value, input.to(undefined, newItemSchema, inputs)])
    onInputDataChange([...inputData, getSelectedInput(input, newItemSchema, inputs)])
  }

  const arrayErrorMessage = errors !== undefined &&
    `Error with elements ${errors.map(({ dataPath }) => dataPath.split('/', 2)[1]).toString()}`

  return (
    <>
      <tr>
        <td>
          {arrayErrorMessage === false
            ? <ValidationNoErrors rootProps={rootProps} />
            : <ValidationErrors rootProps={rootProps} message={arrayErrorMessage} />}
        </td>
        <InputName rootProps={rootProps} name={name} />
        <td />
        <td>{children}</td>
        <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
      </tr>
      {value.map((element, i) => {
        const selectedInput = inputData[i]
        const itemSchema = i < itemSchemas.length ? itemSchemas[i] : newItemSchema
        const elementErrors = errors
          ?.filter(error => error.dataPath.startsWith(`/${i}`))
          .map(error => ({ ...error, dataPath: error.dataPath.slice(`/${i}`.length) }))

        const handleChange: ControlledPropsOnChange = newValue => {
          onChange([...value.slice(0, i), newValue, ...value.slice(i + 1)])
        }

        const handleDelete: RowPropsWithoutChildrenOnDelete | undefined = value.length > minItems
          ? () => {
            if (items instanceof Array) {
              const valueMap = (value: any, j: number): any => {
                const itemSchema = itemSchemas[i + j]
                const input = getValidInput(inputs, itemSchema)
                return input.to(value, itemSchema, inputs)
              }
              const inputDataMap = (inputData: SelectedInput<any>, j: number): SelectedInput<any> => {
                const itemSchema = itemSchemas[i + j]
                const input = getValidInput(inputs, itemSchema)
                console.log(inputData, {
                  name: input.name,
                  data: input.getInitialInputData(itemSchema, inputs)
                })
                return {
                  name: input.name,
                  data: input.getInitialInputData(itemSchema, inputs)
                }
              }
              const shiftEnd = items.length + 1
              console.log(shiftEnd)
              onChange([
                ...value.slice(0, i),
                ...value.slice(i + 1, shiftEnd).map(valueMap),
                ...value.slice(shiftEnd)
              ])
              onInputDataChange([
                ...inputData.slice(0, i),
                ...inputData.slice(i + 1, shiftEnd).map(inputDataMap),
                ...inputData.slice(shiftEnd)
              ])
            } else {
              onChange([...value.slice(0, i), ...value.slice(i + 1)])
              onInputDataChange([...inputData.slice(0, i), ...inputData.slice(i + 1)])
            }
          }
          : undefined

        const handleSelectedInputChange: OnSelectedInputChange<any> = newSelectedInput => {
          onInputDataChange([...inputData.slice(0, i), newSelectedInput, ...inputData.slice(i + 1)])
        }

        return (
          <InputChooser
            key={i}
            rootProps={rootProps}
            name={getElementName(name, i, nameStyle)}
            schema={itemSchema}
            value={element}
            onChange={handleChange}
            onDelete={handleDelete}
            selectedInput={selectedInput}
            onSelectedInputChange={handleSelectedInputChange}
            errors={elementErrors}
          />
        )
      })}
      {canAddNewItem && (
        <tr>
          <td></td>
          <InputName rootProps={rootProps} name={getElementName(name, '+', nameStyle)} />
          <td>
            <button onClick={handleNewElement}>New Element</button>
          </td>
        </tr>
      )}
    </>
  )
}

const arrayInput: Input<any[], Array<SelectedInput<any>>> = {
  name: 'array',
  Component: ArrayInputComponent,
  isType: value => value instanceof Array,
  isValid: schema => schema.type === undefined || schema.type === 'array',
  to: (value, schema, inputs) => arraySchema(schema)
    .map((itemSchema, i) => valueFromSchema(value?.[i], inputs, itemSchema)),
  getInitialInputData: (schema, inputs) => arraySchema(schema)
    .map(itemSchema => getSelectedInput(getValidInput(inputs, itemSchema), itemSchema, inputs))
}

export default arrayInput
