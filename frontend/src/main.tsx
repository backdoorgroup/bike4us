import React from 'react'
import ReactDOM from 'react-dom/client'

const rootEl = document.getElementById('root')!
const root =  ReactDOM.createRoot(rootEl)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
