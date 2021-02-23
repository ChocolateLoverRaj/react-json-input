import { ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { FunctionComponent } from 'react'

export type OnChange<T> = (newValue: T) => void

export interface ContainerProps {
  rootProps: ControlledProps<any>
}

export type ContainerComponent = FunctionComponent<ContainerProps>

export type IsValid = (schema: JSONSchema7) => boolean

export type IsType = (value: any) => boolean

export interface InputProps<T> {
  rootProps: ControlledProps<any>
  value: T
  onChange: (neValue: T) => void
  schema: JSONSchema7
}

export type InputComponent<T = any> = FunctionComponent<InputProps<T>>

export interface Input {
  name: string
  isValid: IsValid
  isType: IsType
  Component: InputComponent
}

export interface RowProps {
  rootProps: ControlledProps<any>
  schema: JSONSchema7
  name: string
  value: any
  onChange: (newValue: any) => void
}

export type RowComponent = FunctionComponent<RowProps>

export interface InputSelectorProps {
  rootProps: ControlledProps<any>
  inputs: Input[]
  value: number
  onChange: (newValue: number) => void
}

export type InputSelectorComponent = FunctionComponent<InputSelectorProps>

export interface ValidationProps {
  rootProps: ControlledProps<any>
  errors?: ErrorObject[]
}

export type ValidationComponent = FunctionComponent<ValidationProps>

export interface BaseProps {
  Container: ContainerComponent
  Row: RowComponent
  InputSelector: InputSelectorComponent
  Validation: ValidationComponent
  schema: JSONSchema7
  inputs: Input[]
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
