import React from 'react'
import { ContainerComponent } from './props'

const Container: ContainerComponent<any> = props => {
  const { rootProps, errors, selectedInput, onSelectedInputChange } = props
  const { schema, InputChooser, value, onChange } = rootProps

  return (
    <table>
      <tbody>
        <InputChooser
          rootProps={rootProps}
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
