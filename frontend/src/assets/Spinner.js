import { ProgressSpinner } from 'primereact/progressspinner'
import React from 'react'

const Spinner = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-content-evenly align-content-center'>
      <ProgressSpinner className='my-auto' style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
  )
}

export default Spinner
