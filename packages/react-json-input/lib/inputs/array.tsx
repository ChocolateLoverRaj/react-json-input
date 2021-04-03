import React, { MouseEventHandler, useContext } from 'react'
import arraySchema from '../arraySchema'
import DeleteButton from '../DeleteButton'
import getSubName from '../getSubName'
import getValidInput from '../getValidInput'
import { Input, InputComponent, ControlledPropsOnChange, RowPropsWithoutChildrenOnDelete, OnSelectedInputChange, SelectedInput } from '../props'
import isEnum from '../isEnum'
import RootContext from '../RootContext'
import isAnyOf from '../isAnyOf'

const ArrayInputComponent: InputComponent<any[], Array<SelectedInput<any>>> = props => {
  const {
    schema,
    name,
    children,
    value,
    onChange,
    inputState: inputData,
    onInputStateChange: onInputDataChange,
    onDelete,
    errors
  } = props
  const { items } = schema

  const {
    InputChooser,
    inputs,
    ValidationNoErrors,
    ValidationErrors,
    InputName,
    nameStyle,
    disabled,
    readOnly
  } = useContext(RootContext)

  // itemSchemas, including the newItemSchema
  const fullItemSchemas = [...arraySchema(schema, value.length + 1)]
  const itemSchemas = fullItemSchemas.slice(0, -1)
  const minItems = schema.minItems ?? 0
  const [newItemSchema] = fullItemSchemas.slice(value.length)
  const canAddNewItem = newItemSchema !== undefined

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
            ? <ValidationNoErrors />
            : <ValidationErrors message={arrayErrorMessage} />}
        </td>
        <InputName name={name} />
        <td />
        <td>{children}</td>
        <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
      </tr>
      {value.map((element, i) => {
        const selectedInput = inputData[i]
        const itemSchema = itemSchemas[i]
        const elementErrors = errors
          .filter(error => error.dataPath.startsWith(`/${i}`))
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

            name={getSubName(name, `[${i}]`, nameStyle)}
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
          <InputName name={getSubName(name, '[+]', nameStyle)} />
          <td>
            <button onClick={handleNewElement} disabled={disabled || readOnly}>New Element</button>
          </td>
        </tr>
      )}
    </>
  )
}

const arrayInput: Input<any[], SelectedInput[]> = {
  name: 'array',
  Component: ArrayInputComponent,
  isType: (value, schema, inputs) => {
    if (!(value instanceof Array)) return false
    const itemSchemas = [...arraySchema(schema, value.length)]
    console.log(itemSchemas)
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const itemSchema = itemSchemas[i]
      if (inputs
        .filter(({ isValid }) => isValid(itemSchema))
        .find(({ isType }) => isType(item, itemSchema, inputs)) === undefined
      ) return false
    }
    return true
  },
  isValid: schema => !isEnum(schema) && !isAnyOf(schema) && (schema.type === undefined || schema.type === 'array'),
  to: (value, state, schema, inputs) => {
    const itemSchemas = [...arraySchema(schema, value instanceof Array ? value.length : 0)]
    const newValue: any[] = []
    const newState: SelectedInput[] = []
    for (let i = 0; i < itemSchemas.length; i++) {
      const itemSchema = itemSchemas[i]
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
