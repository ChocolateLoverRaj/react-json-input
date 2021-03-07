import React from 'react'
import { InputNameComponent } from './props'
import styles from './InputName.module.scss'

const InputName: InputNameComponent = props => {
  const { name } = props

  return (
    <th className={styles.inputName}>{name}</th>
  )
}

export default InputName
