import { JSONSchema7 } from 'json-schema'
import { FunctionComponent } from 'react'

export type OnChange<T> = (newValue: T) => void

export interface ContainerProps {
  rootProps: ControlledProps<any>
}

export type ContainerComponent = FunctionComponent<ContainerProps>

export type IsValid = (schema: JSONSchema7) => boolean

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

export interface BaseProps {
  Container: ContainerComponent
  Row: RowComponent
  InputSelector: InputSelectorComponent
  schema: JSONSchema7
  inputs: Input[]
  readonly: boolean
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
