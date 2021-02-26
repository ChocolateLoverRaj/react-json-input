import { ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { FunctionComponent, ReactNode } from 'react'

export type OnChange<T> = (newValue: T) => void

export interface ContainerProps<T> {
  rootProps: ControlledProps<any>
  errors?: ErrorObject[]
  selectedInput: SelectedInput<T>
  onSelectedInputChange: OnSelectedInputChange<T>
}

export type ContainerComponent<T> = FunctionComponent<ContainerProps<T>>

export type IsValid = (schema: JSONSchema7) => boolean

export type IsType = (value: any) => boolean

export type OnInputDataChange<T> = (newInputData: T) => void

export interface InputProps<Value, InputData> {
  rootProps: ControlledProps<any>
  value: Value
  onChange: (neValue: Value) => void
  schema: JSONSchema7
  children: ReactNode
  errors?: ErrorObject[]
  name: string
  onDelete?: () => void
  inputData: InputData
  onInputDataChange: OnInputDataChange<InputData>
}

export type InputComponent<Value = any, InputData = undefined> = FunctionComponent<InputProps<Value, InputData>>

export interface Input<Value = any, InputData = undefined> {
  name: string
  isValid: IsValid
  isType: IsType
  to: (value: any) => Value
  Component: InputComponent<Value, InputData>
  getInitialInputData: () => InputData
}

export type ControlledPropsOnChange = (newValue: any) => void

export interface SelectedInput<T> {
  name: string
  data: T
}

export type OnSelectedInputChange<T> = (newSelectedInput: SelectedInput<T>) => void

export interface InputChooserProps {
  rootProps: ControlledProps<any>
  schema: JSONSchema7
  name: string
  value: any
  onChange: ControlledPropsOnChange
  errors?: ErrorObject[]
  onDelete?: RowPropsWithoutChildrenOnDelete
  selectedInput: SelectedInput<any>
  onSelectedInputChange: OnSelectedInputChange<any>
}

export type InputChooserComponent = FunctionComponent<InputChooserProps>

export type InputSelectorPropsOnchange = (newValue: string) => void

export interface InputSelectorProps {
  rootProps: ControlledProps<any>
  inputs: Input[]
  value: string
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

export interface BaseProps {
  Container: ContainerComponent<any>
  InputChooser: InputChooserComponent
  InputSelector: InputSelectorComponent
  Validation: ValidationComponent
  ValidationNoErrors: ValidationNoErrorsComponent
  ValidationErrors: ValidationErrorsComponent
  Row: RowComponent
  schema: JSONSchema7
  inputs: Array<Input<any, any>>
  readOnly: boolean
  disabled: boolean
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
