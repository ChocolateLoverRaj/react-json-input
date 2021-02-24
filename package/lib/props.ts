import { ErrorObject } from 'ajv'
import { JSONSchema7 } from 'json-schema'
import { FunctionComponent, ReactNode } from 'react'

export type OnChange<T> = (newValue: T) => void

export interface ContainerProps {
  rootProps: ControlledProps<any>
  errors?: ErrorObject[]
}

export type ContainerComponent = FunctionComponent<ContainerProps>

export type IsValid = (schema: JSONSchema7) => boolean

export type IsType = (value: any) => boolean

export interface InputProps<T> {
  rootProps: ControlledProps<any>
  value: T
  onChange: (neValue: T) => void
  schema: JSONSchema7
  children: ReactNode
  errors?: ErrorObject[]
  name: string
  onDelete?: () => void
}

export type InputComponent<T = any> = FunctionComponent<InputProps<T>>

export interface Input<T = any> {
  name: string
  isValid: IsValid
  isType: IsType
  to: (value: any) => T
  Component: InputComponent<T>
}

export type ControlledPropsOnChange = (newValue: any) => void

export interface InputChooserProps {
  rootProps: ControlledProps<any>
  schema: JSONSchema7
  name: string
  value: any
  onChange: ControlledPropsOnChange
  errors?: ErrorObject[]
  onDelete?: RowPropsWithoutChildrenOnDelete
}

export type InputChooserComponent = FunctionComponent<InputChooserProps>

export type InputSelectorPropsOnchange = (newValue: number) => void

export interface InputSelectorProps {
  rootProps: ControlledProps<any>
  inputs: Input[]
  value: number
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

export interface BaseProps {
  Container: ContainerComponent
  InputChooser: InputChooserComponent
  InputSelector: InputSelectorComponent
  Validation: ValidationComponent
  Row: RowComponent
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
