import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-screen flex flex-row justify-content-center align-content-center'>
        <div className='w-full sm:w-6 m-auto flex flex-column'>
            <span className="pi pi-search text-center m-auto" style={{ fontSize: '3rem' }}></span>
            <p className="mt-4 text-center">Sorry, the page you're looking for doesn't exist</p>
        </div>
    </div>
  )
}

export default NotFound
