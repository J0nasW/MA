import React from 'react'
import { render } from 'react-dom'
import App from './App'

console.warn = console.error = () => {};

render(<App />, document.getElementById('root'))
