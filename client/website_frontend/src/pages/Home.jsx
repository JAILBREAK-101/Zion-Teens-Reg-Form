import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './sections/Hero'
import Welcome from './sections/Welcome'

export const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Welcome />
    </div>
  )
}

