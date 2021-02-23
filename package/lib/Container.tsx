import React from 'react'
import { ContainerComponent } from './props'

const Container: ContainerComponent = props => {
  const { rootProps } = props
  const { schema, Row, value, onChange } = rootProps

  return (
    <table>
      <tbody>
        <Row
          rootProps={rootProps}
          schema={schema}
          name=''
          value={value}
          onChange={onChange}
        />
      </tbody>
    </table>
  )
}

export default Container
