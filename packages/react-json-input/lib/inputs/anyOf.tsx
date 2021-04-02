import never from 'never'
import { ChangeEventHandler, useCallback, useContext } from 'react'
import definitionToSchema from '../definitionToSchema'
import getSubName from '../getSubName'
import getValidInput from '../getValidInput'
import isAnyOf from '../isAnyOf'
import { Input, InputComponent, SelectedInput, Initial, OnSelectedInputChange } from '../props'
import RootContext from '../RootContext'

// We need the 'export' otherwise there will be ts(4023)
// eslint-disable-next-line import/no-unused-modules
export interface InputData {
  index: number
  selectedInput: SelectedInput
}

const AnyOfInputComponent: InputComponent<any, InputData> = props => {
  const {
    inputState,
    schema,
    onInputStateChange,
    onChange,
    value,
    name,
    onDelete,
    errors,
    children
  } = props
  const { selectedInput, index } = inputState

  const {
    disabled,
    readOnly,
    inputs,
    InputChooser,
    nameStyle,
    DeleteButton,
    ValidationErrors,
    ValidationNoErrors,
    InputName
  } = useContext(RootContext)

  const anyOf = (schema.anyOf ?? never('No anyOf')).map(definition => definitionToSchema(definition))

  const handleChangeOption = useCallback<ChangeEventHandler<HTMLSelectElement>>(e => {
    const index = parseInt(e.target.value)
    const optionSchema = anyOf[index]
    const input = getValidInput(inputs, optionSchema)
    const {
      state,
      value: newValue
    } = input.to(value, selectedInput.state, optionSchema, inputs)
    onChange(newValue)
    onInputStateChange({
      index: index,
      selectedInput: { input, state }
    })
  }, [anyOf, selectedInput.state, inputs, onChange, onInputStateChange, value])

  const handleChangeSelectedInput = useCallback<OnSelectedInputChange>(selectedInput => {
    onInputStateChange({ index, selectedInput })
  }, [index, onInputStateChange])

  const optionSchema = anyOf[index]

  // FIXME: Currently an option with the wrong value can make this valid, even though the selected value is not
  const optionErrors = errors
    .filter(({ schemaPath }) => schemaPath.startsWith(`#/anyOf/${index}`))
    .map(error => ({
      ...error,
      schemaPath: `#${error.schemaPath.slice(`#/anyOf/${index}`.length)}`
    }))

  return (
    <>
      <tr>
        <td>
          {optionErrors.length === 0
            ? <ValidationNoErrors />
            : <ValidationErrors message='Error with selected option' />}
        </td>
        <InputName name={name} />
        <td>
          <select value={index} onChange={handleChangeOption} disabled={disabled || readOnly}>
            {anyOf.map((schema, index) => <option key={index} value={index}>Option {index}</option>)}
          </select>
        </td>
        <td>{children}</td>
        <td>{onDelete !== undefined && <DeleteButton onClick={onDelete} />}</td>
      </tr>
      <InputChooser
        name={getSubName(name, `<${index}>`, nameStyle)}
        onChange={onChange}
        value={value}
        schema={optionSchema}
        onSelectedInputChange={handleChangeSelectedInput}
        selectedInput={selectedInput}
        onDelete={onDelete}
        errors={optionErrors}
      />
    </>
  )
}

const anyOfInput: Input<any, InputData> = {
  Component: AnyOfInputComponent,
  name: 'anyOf',
  isType: () => true,
  isValid: isAnyOf,
  to: (value, state, schema, inputs) => {
    const getInitialForOption = (index: number): Initial<any, InputData> => {
      const optionSchema = definitionToSchema(options[index])
      const input = getValidInput(inputs, optionSchema, value)
      const { state, value: optionValue } = input.to(value, undefined, optionSchema, inputs)
      return {
        state: {
          index: 0,
          selectedInput: { input, state }
        },
        value: optionValue
      }
    }

    const options = schema.anyOf ?? never('No anyOf in schema')
    if (state !== undefined) {
      const { selectedInput, index } = state
      const preferredOption = options[index]
      const optionSchema = definitionToSchema(preferredOption)
      if (selectedInput.input.isValid(optionSchema)) {
        const {
          state: optionState,
          value: optionValue
        } = selectedInput.input.to(value, selectedInput.state, optionSchema, inputs)
        return {
          value: optionValue,
          state: {
            ...state,
            selectedInput: {
              ...selectedInput,
              state: optionState
            }
          }
        }
      } else {
        return getInitialForOption(index)
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        const optionSchema = definitionToSchema(options[i])
        const input = inputs
          .filter(({ isValid }) => isValid(optionSchema))
          .find(({ isType }) => isType(value, optionSchema, inputs))
        if (input === undefined) continue
        const { state, value: optionValue } = input.to(value, undefined, optionSchema, inputs)
        console.log('using option', i)
        return {
          state: {
            index: i,
            selectedInput: { input, state }
          },
          value: optionValue
        }
      }
      throw new Error('No options match the value')
    }
  }
}

export default anyOfInput
