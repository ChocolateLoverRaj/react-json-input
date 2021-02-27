export interface IndentStyle {
  style: 'indent'
  spaces: number
}

export interface PathStyle {
  style: 'path'
}

export type NameStyle = PathStyle | IndentStyle
