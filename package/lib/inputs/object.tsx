import { JSONSchema7Definition } from 'json-schema'
import never from 'never'
import React, { ChangeEventHandler } from 'react'
import definitionToSchema from '../definitionToSchema'
import DeleteButton from '../deleteButton'
import getSubName from '../getSubName'
import getValidInput from '../getValidInput'
import isEnum from '../isEnum'
import { ControlledPropsOnChange, Input, InputComponent, OnSelectedInputChange, RowPropsWithoutChildrenOnDelete, SelectedInput } from '../props'

type ObjectInputData = Map<string, SelectedInput>

const ObjectInputComponent: InputComponent<object, ObjectInputData> = props => {
  const {
    rootProps,
    name,
    children,
    onDelete,
    schema,
    value,
    onChange,
    inputState,
    onInputStateChange
  } = props
  const {
    ValidationNoErrors,
    InputName,
    nameStyle,
    inputs,
    InputChooser
  } = rootProps

  const required = schema.required ?? []
  const properties = schema.properties ?? {}
  const addableProperties = Object.keys(properties).filter(key => value[key] === undefined)

  const handleNewKey: ChangeEventHandler<HTMLSelectElement> = e => {
    const key = e.target.value
    const itemSchema = definitionToSchema(properties[key])
    const input = getValidInput(inputs, itemSchema)
    const {
      value: newEntryValue,
      state
    } = input.to(undefined, undefined, itemSchema, inputs)
    onChange({
      ...value,
      [key]: newEntryValue
    })
    onInputStateChange(new Map([
      ...inputState,
      [key, { input, state }]
    ]))
  }

  return (
    <>
      <tr>
        <td><ValidationNoErrors rootProps={rootProps} /></td>
        <InputName rootProps={rootProps} name={name} />
        <td />
        <td>{children}</td>
        <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
      </tr>
      {Object.entries(value).map(([key, definition]) => {
        const itemSchema = definitionToSchema(definition)

        const handleChange: ControlledPropsOnChange = newValue => {
          onChange({
            ...value,
            [key]: newValue
          })
        }

        const handleSelectedInputChange: OnSelectedInputChange = newSelectedInput => {
          onInputStateChange(new Map([
            ...inputState,
            [key, newSelectedInput]
          ]))
        }

        const handleDelete: RowPropsWithoutChildrenOnDelete | undefined = !required.includes(key)
          ? () => {
            const filterFn = ([currentKey]: [string, ...unknown[]]): boolean => currentKey !== key
            onChange(Object.fromEntries(Object.entries(value).filter(filterFn)))
            onInputStateChange(new Map([...inputState].filter(filterFn)))
          }
          : undefined

        return (
          <InputChooser
            key={key}
            rootProps={rootProps}
            name={getSubName(name, `.${key}`, nameStyle)}
            schema={itemSchema}
            value={value[key]}
            onChange={handleChange}
            selectedInput={inputState.get(key) ?? never(`No selected input for key: '${key}'`)}
            onSelectedInputChange={handleSelectedInputChange}
            onDelete={handleDelete}
          />
        )
      })}
      {addableProperties.length > 0 && (
        <tr>
          <td />
          <InputName rootProps={rootProps} name={getSubName(name, '.+', nameStyle)} />
          <td>
            <select value='' onChange={handleNewKey}>
              <option value=''>New Key</option>
              {addableProperties.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </td>
        </tr>
      )}
    </>
  )
}

const objectInput: Input<object, ObjectInputData> = {
  name: 'object',
  Component: ObjectInputComponent,
  isType: value => typeof value === 'object' && !(value instanceof Array),
  isValid: schema => !isEnum(schema) && (schema.type === undefined || schema.type === 'object'),
  to: (value, state, schema, inputs) => {
    // Additional properties not supported
    if (schema.additionalProperties !== undefined) {
      console.warn('Additional properties not supported yet')
    }

    const required = new Set(schema.required)
    const properties = schema.properties ?? {}
    const newValue: object = objectInput.isType(value) ? value : {}
    const newState: ObjectInputData = state instanceof Map ? state : new Map()
    // Remove properties in newValue that are not in schema
    Object.keys(newValue).forEach(key => {
      // We are using an object with dynamic keys because we are editing a json object
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      if (typeof key !== 'string' || properties[key] === undefined) delete newValue[key]
    })

    // Add or modify a key
    const modifyKey = (key: string, itemDefinition: JSONSchema7Definition, currentState: any): void => {
      const itemSchema = definitionToSchema(itemDefinition)
      const input = getValidInput(inputs, itemSchema)
      const {
        value,
        state
      } = input.to(newValue[key], currentState, itemSchema, inputs)
      newValue[key] = value
      newState.set(key, { input, state })
    }

    newState.forEach((currentState, key) => {
      const itemDefinition = properties[key]
      // Remove properties not in schema or are invalid
      if (typeof key !== 'string' || itemDefinition === undefined) newState.delete(key)
      // Make sure their state and value matches
      modifyKey(key, itemDefinition, currentState)
      // Remove it from required, because the next step can skip this key
      required.delete(key)
    })
    // Add on missing required keys
    required.forEach(key => {
      modifyKey(key, properties[key], undefined)
    })
    return {
      value: newValue,
      state: newState
    }
  }
}

export default objectInput