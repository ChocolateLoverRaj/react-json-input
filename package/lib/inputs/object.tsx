import { JSONSchema7Definition } from 'json-schema'
import never from 'never'
import React, { ChangeEventHandler, useContext } from 'react'
import definitionToSchema from '../definitionToSchema'
import DeleteButton from '../DeleteButton'
import getSubName from '../getSubName'
import getValidInput from '../getValidInput'
import isAnyOf from '../isAnyOf'
import isEnum from '../isEnum'
import { ControlledPropsOnChange, Input, InputComponent, OnSelectedInputChange, RowPropsWithoutChildrenOnDelete, SelectedInput } from '../props'
import RootContext from '../RootContext'

type ObjectInputData = Map<string, SelectedInput>

const ObjectInputComponent: InputComponent<object, ObjectInputData> = props => {
  const {
    name,
    children,
    onDelete,
    schema,
    value,
    onChange,
    inputState,
    onInputStateChange,
    errors
  } = props

  const {
    ValidationNoErrors,
    InputName,
    nameStyle,
    inputs,
    InputChooser,
    ValidationErrors,
    disabled,
    readOnly
  } = useContext(RootContext)

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

  const objectErrorMessage = errors !== undefined &&
    `Error with entries: ${errors.map(({ dataPath }) => dataPath.split('/', 2)[1]).toString()}`

  return (
    <>
      <tr>
        <td>
          {objectErrorMessage === false
            ? <ValidationNoErrors />
            : <ValidationErrors message={objectErrorMessage} />}
        </td>
        <InputName name={name} />
        <td />
        <td>{children}</td>
        <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
      </tr>
      {Object.keys(value).map(key => {
        const itemSchema = definitionToSchema(properties[key])

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

        const entryErrors = errors
          ?.filter(error => error.dataPath.startsWith(`/${key}`))
          .map(error => ({ ...error, dataPath: error.dataPath.slice(`/${key}`.length) }))

        return (
          <InputChooser
            key={key}

            name={getSubName(name, `.${key}`, nameStyle)}
            schema={itemSchema}
            value={value[key]}
            onChange={handleChange}
            selectedInput={inputState.get(key) ?? never(`No selected input for key: '${key}'`)}
            onSelectedInputChange={handleSelectedInputChange}
            onDelete={handleDelete}
            errors={entryErrors}
          />
        )
      })}
      {addableProperties.length > 0 && (
        <tr>
          <td />
          <InputName name={getSubName(name, '.+', nameStyle)} />
          <td>
            <select value='' onChange={handleNewKey} disabled={disabled || readOnly}>
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
  isValid: schema => !isEnum(schema) && !isAnyOf(schema) && (schema.type === undefined || schema.type === 'object'),
  to: (value, state, schema, inputs) => {
    // Additional properties not supported
    if (schema.additionalProperties !== undefined) {
      console.warn('Additional properties not supported yet')
    }

    const required = new Set(schema.required)
    const properties = schema.properties ?? {}
    const newValue: object = objectInput.isType(value) ? { ...value } : {}
    const newState: ObjectInputData = state instanceof Map ? state : new Map()

    // Add or modify a key
    const modifyKey = (key: string, itemDefinition: JSONSchema7Definition): void => {
      const itemSchema = definitionToSchema(itemDefinition)
      const input = getValidInput(inputs, itemSchema, newValue[key])
      const {
        value,
        state
      } = input.to(newValue[key], newState.get(key), itemSchema, inputs)
      newValue[key] = value
      newState.set(key, { input, state })
    }

    Object.keys(newValue).forEach(key => {
      // Remove properties in newValue that are not in schema
      // We are using an object with dynamic keys because we are editing a json object
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      if (properties[key] === undefined) delete newValue[key]
      else {
        const itemDefinition = properties[key]
        // Remove properties not in schema or are invalid
        if (typeof key !== 'string' || itemDefinition === undefined) newState.delete(key)
        else {
        // Make sure their state and value matches
          modifyKey(key, itemDefinition)
          // Remove it from required, because the next step can skip this key
          required.delete(key)
        }
      }
    })

    // Add on missing required keys
    required.forEach(key => {
      modifyKey(key, properties[key])
    })
    return {
      value: newValue,
      state: newState
    }
  }
}

export default objectInput
