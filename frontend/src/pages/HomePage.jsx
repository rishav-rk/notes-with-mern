import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Foreground from '../components/Foreground'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'

const HomePage = () => {

  return (
    <div className='min-h-screen'>
      <Background />
      <Foreground />
    </div>
  )
}

export default HomePage