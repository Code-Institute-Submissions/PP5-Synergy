import React from 'react'
import DashMenu from '../../components/DashMenu'

function Dashboard() {
  return (
    <div className='grid grid-nogutter'>
      <div className='hidden sm:block col-fixed p-0 md:w-15rem'>
        <DashMenu />
      </div>
      <div className="col surface-ground p-0">
        Content
      </div>
    </div>
  )
}

export default Dashboard
