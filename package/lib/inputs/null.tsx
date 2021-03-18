import React, { useContext } from 'react'
import isEnum from '../isEnum'
import { Input, InputComponent } from '../props'
import RootContext from '../RootContext'
import rowProps from '../rowProps'

const NullInputComponent: InputComponent<null> = props => {
  const { Row } = useContext(RootContext)

  return (
    <Row {...rowProps(props)}>null</Row>
  )
}

const nullInput: Input<null, undefined> = {
  name: 'null',
  Component: NullInputComponent,
  isType: value => value === null,
  isValid: schema => !isEnum(schema) && (schema.type === undefined || schema.type === 'null'),
  to: () => ({
    value: null,
    state: undefined
  })
}

export default nullInput
