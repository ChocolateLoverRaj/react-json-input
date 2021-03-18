import arrayInput from './inputs/array'
import booleanInput from './inputs/boolean'
import nullInput from './inputs/null'
import numberInput from './inputs/number'
import stringInput from './inputs/string'
import enumInput from './inputs/enum'
import objectInput from './inputs/object'
import anyOfInput from './inputs/anyOf'

const defaultInputs = [
  stringInput,
  numberInput,
  booleanInput,
  nullInput,
  arrayInput,
  enumInput,
  objectInput,
  anyOfInput
]

export default defaultInputs
