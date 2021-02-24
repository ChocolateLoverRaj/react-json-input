import React from 'react'
import { Input, InputComponent } from '../props'
import rowProps from '../rowProps'

const NullInputComponent: InputComponent<null> = props => {
  const { rootProps: { Row } } = props

  return (
    <Row {...rowProps(props)}>null</Row>
  )
}

const nullInput: Input<null> = {
  name: 'null',
  Component: NullInputComponent,
  isType: value => value === null,
  isValid: schema => schema.type === undefined || schema.type === 'null',
  to: () => null
}

export default nullInput
