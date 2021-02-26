import { Input, SelectedInput } from './props'

const getSelectedInput = (input: Input): SelectedInput<any> => {
  const { name, getInitialInputData } = input
  return {
    name: name,
    data: getInitialInputData()
  }
}

export default getSelectedInput
