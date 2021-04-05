import { ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { ComponentType, DetailsHTMLAttributes, ReactNode } from 'react'
import { NameStyle } from './nameStyle'

export type OnChange<T> = (newValue: T) => void

interface ContainerProps {
  errors: ErrorObject[]
  selectedInput: SelectedInput
  onSelectedInputChange: OnSelectedInputChange
}

export type ContainerComponent = ComponentType<ContainerProps>

type IsValid = (schema: JSONSchema7) => boolean

type IsType = (value: any, schema: JSONSchema7, inputs: Input[]) => boolean

export type OnInputStateChange<T> = (newInputData: T) => void

export interface InputProps<Value, State> {
  value: Value
  onChange: (newValue: Value) => void
  schema: JSONSchema7
  children: ReactNode
  errors: ErrorObject[]
  name: string
  onDelete?: () => void
  inputState: State
  onInputStateChange: OnInputStateChange<State>
}

export type InputComponent<Value = any, InputData = undefined> = ComponentType<InputProps<Value, InputData>>

export interface Initial<Value = any, State = any> {
  value: Value
  state: State
}

export interface Input<Value = any, State = any> {
  name: string
  isValid: IsValid
  isType: IsType
  to: (value: any, state: State | undefined, schema: JSONSchema7, inputs: Array<Input<any, any>>) => Initial<Value, State>
  Component: InputComponent<Value, State>
}

export type ControlledPropsOnChange = (newValue: any) => void

export interface SelectedInput<Value = any, State = any> {
  input: Input<Value, State>
  state: State
}

export type OnSelectedInputChange<Value = any, State = any> = (newSelectedInput: SelectedInput<Value, State>) => void

interface InputChooserProps {
  schema: JSONSchema7
  name: string
  value: any
  onChange: ControlledPropsOnChange
  errors: ErrorObject[]
  onDelete?: RowPropsWithoutChildrenOnDelete
  selectedInput: SelectedInput<any, any>
  onSelectedInputChange: OnSelectedInputChange<any, any>
}

export type InputChooserComponent = ComponentType<InputChooserProps>

export type InputSelectorPropsOnchange = (newInput: Input) => void

interface InputSelectorProps {
  inputs: Input[]
  value: Input
  onChange: InputSelectorPropsOnchange
}

export type InputSelectorComponent = ComponentType<InputSelectorProps>

interface ValidationProps {
  errors?: ErrorObject[]
}

export type ValidationComponent = ComponentType<ValidationProps>

export type RowPropsWithoutChildrenOnDelete = () => void

export interface RowPropsWithoutChildren {
  errors?: ErrorObject[]
  name: string
  inputSelector: ReactNode
  onDelete?: RowPropsWithoutChildrenOnDelete
}

interface RowProps extends RowPropsWithoutChildren {
  children: ReactNode
}

export type RowComponent = ComponentType<RowProps>

export type ValidationNoErrorsComponent = ComponentType

interface ValidationErrorsProps {
  message: string
}

export type ValidationErrorsComponent = ComponentType<ValidationErrorsProps>

interface InputNameProps {
  name: string
}

export type InputNameComponent = ComponentType<InputNameProps>

interface DeleteButtonProps {
  onClick: DetailsHTMLAttributes<HTMLSpanElement>['onClick']
}

export type DeleteButtonComponent = ComponentType<DeleteButtonProps>

export type SelectPropsOnChange = (newValue: string | number) => void

export interface SelectProps {
  value: string | number
  onChange: SelectPropsOnChange
  disabled: boolean
  children: ReactNode
}

export type SelectComponent = ComponentType<SelectProps>

export interface OptionProps {
  value: string | number
}

export type OptionComponent = ComponentType<OptionProps>

export interface BaseProps {
  Container: ContainerComponent
  InputChooser: InputChooserComponent
  InputSelector: InputSelectorComponent
  Validation: ValidationComponent
  ValidationNoErrors: ValidationNoErrorsComponent
  ValidationErrors: ValidationErrorsComponent
  Row: RowComponent
  InputName: InputNameComponent
  DeleteButton: DeleteButtonComponent
  Select: SelectComponent
  Option: OptionComponent
  schema: JSONSchema7
  inputs: Array<Input<any, any>>
  readOnly: boolean
  disabled: boolean
  nameStyle: NameStyle
}

interface DefaultValueProps<T> {
  defaultValue: T
}

interface ControlProps<T> {
  value: T
  onChange: OnChange<T>
}

type UncontrolledProps<T> = BaseProps & Partial<ControlProps<T>> & Partial<DefaultValueProps<T>>

export type ControlledProps<T = any> = BaseProps & ControlProps<T> & Partial<DefaultValueProps<T>>

export type Props<T> = UncontrolledProps<T> | ControlledProps<T>
