import React, { useContext } from 'react'
import { ContainerComponent } from './props'
import RootContext from './RootContext'

const Container: ContainerComponent = props => {
  const { errors, selectedInput, onSelectedInputChange } = props

  const { schema, InputChooser, value, onChange } = useContext(RootContext)

  return (
    <table>
      <tbody>
        <InputChooser
          schema={schema}
          name=''
          value={value}
          onChange={onChange}
          errors={errors}
          selectedInput={selectedInput}
          onSelectedInputChange={onSelectedInputChange}
        />
      </tbody>
    </table>
  )
}

export default Container
