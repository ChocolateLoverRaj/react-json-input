[![Netlify Status](https://api.netlify.com/api/v1/badges/5a958436-bfb6-4440-ab15-fc6e1512172f/deploy-status)](https://app.netlify.com/sites/react-json-input/deploys)

# react-json-input
A React component that is like a complex input element.

## Installing
This project uses [GitHub Packages](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package).

Create a `.npmrc` file with the contents:
```
@chocolateloverraj:registry=https://npm.pkg.github.com
```
Then do
```bash
npm i @chocolateloverraj/react-json-input
```
to install the package.

## Usage
```js
import { JsonInput, valueFromSchema }  from '@chocolateloverraj/react-json-input'
import { useState } from 'react'

// This is the main editor. Detailed docs will be in future
<JsonInput />

// This is helpful if you want a controlled value but want to get an initial value based on the schema
const [value, setValue] = useState(valueFromSchema(mySchema))

<JsonInput value={value} onChange={setValue} />
<OtherComponent magicProp={value}>
```