import { NameStyle } from './nameStyle'

const getElementName = (name: string, index: string | number, nameStyle: NameStyle): string => (
  nameStyle.style === 'path'
    ? `${name}[${index}]`
    : `${name.slice(0, name.length - name.trimLeft().length)}${name === '' ? '' : ' '.repeat(nameStyle.spaces)}[${index}]`
)

export default getElementName
