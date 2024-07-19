import React from 'react'
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import Profile from './Profile';

const Dashboard = () => {
  return (
    <>
    <Divider align="right">
        <div className="inline-flex align-items-center">
          <i className="pi pi-home mr-2"></i>
          <b>Dashboard</b>
        </div>
      </Divider>
      <ScrollPanel className='p-0 m-0' style={{ width: "100%", height: "89vh" }}>
        <div className="flex justify-content-start flex-wrap">
          <Profile />
        </div>
      </ScrollPanel>
    </>
  )
}

export default Dashboard
