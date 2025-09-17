import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import NoteDetails from './pages/NoteDetails'
import CreatePage from './pages/CreatePage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/notes/:id' element={<NoteDetails />} />
      </Routes>
    </div>
  )
}

export default App