import React from 'react'
import { ContainerComponent } from './props'

const Container: ContainerComponent<any> = props => {
  const { schema } = props
  const title = schema.title ?? 'root'
  return (
    <table>
      <tbody>
        <tr>
          <th>{title}</th>
          <td>Value coming soon</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Container
