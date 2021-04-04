import { AppProps } from 'next/app'
import { FC } from 'react'
import '@chocolateloverraj/react-json-input/dist/index.css'

const App: FC<AppProps> = props => {
  const { Component, pageProps } = props
  return <Component {...pageProps} />
}

export default App
