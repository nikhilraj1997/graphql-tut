import React from "react"
import ReactDOM from "react-dom"
import { defaults } from "react-chartjs-2"

import "normalize.css"
import "./index.css"

import App from "./App"

defaults.global.defaultFontFamily = "Jost"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
