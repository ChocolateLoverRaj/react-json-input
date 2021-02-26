import React from 'react'
import { ValidationErrorsComponent } from './props'

const ValidationErrors: ValidationErrorsComponent = props => {
  const { message } = props

  return (
    <span title={message}>
      {'\u2717'}
    </span>
  )
}

export default ValidationErrors
