import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import Spinner from '../../assets/Spinner';
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import InviteCard from './InviteCard';

const InvitePage = () => {
    const [loaded, setLoaded] = useState(false)
    const [userList, setUserList] = useState({ results: [] });
    

    useEffect(() => {
      const handleMount = async () => {
          try {
            const [{ data: userList }] = await Promise.all([
              axiosReq.get(`/api/profiles/invite/`),
            ]);
            setUserList(userList)
            setLoaded(true)
            console.log(userList)
          } catch (err) {
          }
        };
        handleMount();
  }, []);

    const pageContent = (
      <>
      <Divider align="left">
        <div className="inline-flex align-items-center">
          <i className="pi pi-envelope mr-2"></i>
          <b>Invite Users</b>
        </div>
      </Divider>
      <ScrollPanel style={{ width: "100%", height: "40vh" }}>
        <div className="flex justify-content-start flex-wrap">
          {userList.results.length ? (
            userList.results.map((object) => (
              <InviteCard key={object.id} url='/api/invite/' id={object.id} title={'User:'} count={object.owner} message={''} icon={object.avatar} display={true}/>
            ))
          )
          : <InviteCard title='0' count='Workstreams' message='Available' icon='pi pi-folder' display={true}/>
          }
          
        </div>
      </ScrollPanel>
      </>
    )

  return (
    <div className="card h-screen">
      {loaded 
      ? pageContent
      : (
        <Spinner />
      )
      }
  </div>
  )
}

export default InvitePage
