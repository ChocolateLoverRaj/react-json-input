interface IndentStyle {
  style: 'indent'
  spaces: number
}

interface PathStyle {
  style: 'path'
}

export type NameStyle = PathStyle | IndentStyle
