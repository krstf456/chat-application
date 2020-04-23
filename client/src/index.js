import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import { deepMerge } from "grommet/utils";
import { grommet } from 'grommet/themes';

import { Grommet } from 'grommet'

export const theme = deepMerge(grommet, {
  global: {
    font: {
      family:  "'Roboto', sans-serif;",
    },
    colors: {
      brand: "neutral-4",
    },
    heading: {
      extend: "font-family: 'Lora', serif;",
    },
  }
})

ReactDOM.render(
  (
    <Grommet theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Grommet>
  )
  , document.getElementById('root'))