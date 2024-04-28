import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { RoutesConfig } from './routes/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <RoutesConfig />
      </Routes>
    </BrowserRouter>
  )
}

export default App
