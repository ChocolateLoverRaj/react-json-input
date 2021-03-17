import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

const DeleteButton: FC<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>> = props => (
  <span {...props}>{'\u2717'}</span>
)

export default DeleteButton
