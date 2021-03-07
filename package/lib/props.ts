import { ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { FunctionComponent, ReactNode } from 'react'
import { NameStyle } from './nameStyle'

export type OnChange<T> = (newValue: T) => void

export interface ContainerProps {
  rootProps: ControlledProps<any>
  errors?: ErrorObject[]
  selectedInput: SelectedInput
  onSelectedInputChange: OnSelectedInputChange
}

export type ContainerComponent = FunctionComponent<ContainerProps>

export type IsValid = (schema: JSONSchema7) => boolean

export type IsType = (value: any) => boolean

export type OnInputStateChange<T> = (newInputData: T) => void

export interface InputProps<Value, State> {
  rootProps: ControlledProps<any>
  value: Value
  onChange: (neValue: Value) => void
  schema: JSONSchema7
  children: ReactNode
  errors?: ErrorObject[]
  name: string
  onDelete?: () => void
  inputState: State
  onInputStateChange: OnInputStateChange<State>
}

export type InputComponent<Value = any, InputData = undefined> = FunctionComponent<InputProps<Value, InputData>>

export interface Initial<Value = any, State = any> {
  value: Value
  state: State
}

export interface Input<Value = any, State = any> {
  name: string
  isValid: IsValid
  isType: IsType
  to: (value: any, state: State, schema: JSONSchema7, inputs: Array<Input<any, any>>) => Initial<Value, State>
  Component: InputComponent<Value, State>
}

export type ControlledPropsOnChange = (newValue: any) => void

export interface SelectedInput<Value = any, State = any> {
  input: Input<Value, State>
  state: State
}

export type OnSelectedInputChange<Value = any, State = any> = (newSelectedInput: SelectedInput<Value, State>) => void

export interface InputChooserProps {
  rootProps: ControlledProps<any>
  schema: JSONSchema7
  name: string
  value: any
  onChange: ControlledPropsOnChange
  errors?: ErrorObject[]
  onDelete?: RowPropsWithoutChildrenOnDelete
  selectedInput: SelectedInput<any, any>
  onSelectedInputChange: OnSelectedInputChange<any, any>
}

export type InputChooserComponent = FunctionComponent<InputChooserProps>

export type InputSelectorPropsOnchange = (newInput: Input) => void

export interface InputSelectorProps {
  rootProps: ControlledProps<any>
  inputs: Input[]
  value: Input
  onChange: InputSelectorPropsOnchange
}

export type InputSelectorComponent = FunctionComponent<InputSelectorProps>

export interface ValidationProps {
  rootProps: ControlledProps<any>
  errors?: ErrorObject[]
}

export type ValidationComponent = FunctionComponent<ValidationProps>

export type RowPropsWithoutChildrenOnDelete = () => void

export interface RowPropsWithoutChildren {
  rootProps: ControlledProps<any>
  errors?: ErrorObject[]
  name: string
  inputSelector: ReactNode
  onDelete?: RowPropsWithoutChildrenOnDelete
}

export interface RowProps extends RowPropsWithoutChildren {
  children: ReactNode
}

export type RowComponent = FunctionComponent<RowProps>

export interface PropsWithRootProps {
  rootProps: ControlledProps<any>
}

export type ValidationNoErrorsComponent = FunctionComponent<PropsWithRootProps>

export interface ValidationErrorsProps extends PropsWithRootProps {
  message: string
}

export type ValidationErrorsComponent = FunctionComponent<ValidationErrorsProps>

export interface InputNameProps extends PropsWithRootProps {
  name: string
}

export type InputNameComponent = FunctionComponent<InputNameProps>

export interface BaseProps {
  Container: ContainerComponent
  InputChooser: InputChooserComponent
  InputSelector: InputSelectorComponent
  Validation: ValidationComponent
  ValidationNoErrors: ValidationNoErrorsComponent
  ValidationErrors: ValidationErrorsComponent
  Row: RowComponent
  InputName: InputNameComponent
  schema: JSONSchema7
  inputs: Array<Input<any, any>>
  readOnly: boolean
  disabled: boolean
  nameStyle: NameStyle
}

export interface DefaultValueProps<T> {
  defaultValue: T
}

export interface ControlProps<T> {
  value: T
  onChange: OnChange<T>
}

export type UncontrolledProps<T> = BaseProps & Partial<ControlProps<T>> & Partial<DefaultValueProps<T>>

export type ControlledProps<T> = BaseProps & ControlProps<T> & Partial<DefaultValueProps<T>>

export type Props<T> = UncontrolledProps<T> | ControlledProps<T>
