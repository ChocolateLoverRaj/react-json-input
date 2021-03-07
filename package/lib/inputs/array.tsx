import React, { MouseEventHandler } from 'react'
import arraySchema from '../arraySchema'
import DeleteButton from '../deleteButton'
import getElementName from '../getElementName'
import getValidInput from '../getValidInput'
import { Input, InputComponent, ControlledPropsOnChange, RowPropsWithoutChildrenOnDelete, OnSelectedInputChange, SelectedInput } from '../props'
import definitionToSchema from '../definitionToSchema'

const ArrayInputComponent: InputComponent<any[], Array<SelectedInput<any>>> = props => {
  const {
    schema,
    name,
    rootProps,
    children,
    value,
    onChange,
    inputState: inputData,
    onInputStateChange: onInputDataChange,
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
    const {
      value: newElementValue,
      state
    } = input.to(undefined, undefined, newItemSchema, inputs)
    onChange([...value, newElementValue])
    onInputDataChange([...inputData, { input, state }])
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
              const shiftEnd = items.length + 1
              const shiftedValues: any[] = []
              const shiftedSelectedInputs: SelectedInput[] = []
              for (let j = i; j < Math.min(shiftEnd, value.length - 1); j++) {
                // Grab schema from current element
                const itemSchema = itemSchemas[j]
                // Grab value from next element
                const itemValue = value[j + 1]
                console.log(inputData, j)
                // Grab input and state from current element
                const { input, state } = inputData[j]
                const {
                  value: newValue,
                  state: newState
                } = input.to(itemValue, state, itemSchema, inputs)
                shiftedValues.push(newValue)
                shiftedSelectedInputs.push({
                  input: input,
                  state: newState
                })
              }
              const notShiftedIndex = Math.max(shiftEnd + 1, i + 1)
              onChange([
                ...value.slice(0, i),
                ...shiftedValues,
                ...value.slice(notShiftedIndex)
              ])
              onInputDataChange([
                ...inputData.slice(0, i),
                ...shiftedSelectedInputs,
                ...inputData.slice(notShiftedIndex)
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

const arrayInput: Input<any[], SelectedInput[]> = {
  name: 'array',
  Component: ArrayInputComponent,
  isType: value => value instanceof Array,
  isValid: schema => schema.type === undefined || schema.type === 'array',
  to: (value, state, schema, inputs) => {
    const { items, minItems, maxItems, additionalItems } = schema
    const additionalItemSchema = definitionToSchema(additionalItems)
    const itemSchemas = arraySchema(schema)
    const newValue: any[] = []
    const newState: SelectedInput[] = []
    const maxLength = items instanceof Array
      ? minItems ?? items.length
      : value instanceof Array
        ? Math.min(value.length, maxItems ?? Infinity)
        : minItems ?? 0
    for (let i = 0; i < maxLength; i++) {
      const itemSchema = i < itemSchemas.length ? itemSchemas[i] : additionalItemSchema
      const itemValue = value?.[i]
      const itemState = state?.[i]
      const input = getValidInput(inputs, itemSchema)
      const {
        value: newItemValue,
        state: newItemState
      } = input.to(itemValue, itemState, itemSchema, inputs)
      newValue.push(newItemValue)
      newState.push({ input: input, state: newItemState })
    }
    return {
      value: newValue,
      state: newState
    }
  }
}

export default arrayInput
