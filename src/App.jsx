import { useState } from 'react'
import './styles/app.scss'
import { Home } from './Pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App
