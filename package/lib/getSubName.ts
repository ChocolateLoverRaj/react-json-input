import { NameStyle } from './nameStyle'

const getSubName = (name: string, subName: string | number, nameStyle: NameStyle): string => (
  nameStyle.style === 'path'
    ? `${name}${subName}`
    : `${name.slice(0, name.length - name.trimLeft().length)}${name === '' ? '' : ' '.repeat(nameStyle.spaces)}${subName}`
)

export default getSubName
