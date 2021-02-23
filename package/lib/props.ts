import { JSONSchema7 } from 'json-schema'
import { FunctionComponent } from 'react'

export type OnChange<T> = (newValue: T) => void

export type ContainerComponent<T> = FunctionComponent<ControlledProps<T>>

export interface BaseProps<T> {
  Container: ContainerComponent<T>
  schema: JSONSchema7
}

export interface DefaultValueProps<T> {
  defaultValue: T
}

export interface ControlProps<T> {
  value: T
  onChange: OnChange<T>
}

export type UncontrolledProps<T> = BaseProps<T> & Partial<ControlProps<T>> & Partial<DefaultValueProps<T>>

export type ControlledProps<T> = BaseProps<T> & ControlProps<T> & Partial<DefaultValueProps<T>>

export type Props<T> = UncontrolledProps<T> | ControlledProps<T>
