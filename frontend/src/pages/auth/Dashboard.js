import React from 'react'
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import Profile from '../profile/Profile';

const Dashboard = () => {
  return (
    <>
    <Divider align="right">
        <div className="inline-flex align-items-center">
          <i className="pi pi-home mr-2"></i>
          <b>Dashboard</b>
        </div>
      </Divider>
      <ScrollPanel style={{ width: "100%", height: "40vh" }}>
        <div className="flex justify-content-start flex-wrap">
          <Profile />
        </div>
      </ScrollPanel>
    </>
  )
}

export default Dashboard
