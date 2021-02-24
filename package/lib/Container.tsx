import React from 'react'
import { ContainerComponent } from './props'

const Container: ContainerComponent = props => {
  const { rootProps, errors } = props
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
        />
      </tbody>
    </table>
  )
}

export default Container
