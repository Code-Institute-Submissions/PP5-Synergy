import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import Spinner from '../../assets/Spinner';
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import InviteCard from './InviteCard';

const JoinPage = () => {
    const [loaded, setLoaded] = useState(false)
    const [workstreamList, setWorkstreamList] = useState({ results: [] });
    

    useEffect(() => {
        const handleMount = async () => {
            try {
              const [{ data: workstreamList }] = await Promise.all([
                axiosReq.get(`/api/workstream/join/`),
              ]);
              setWorkstreamList(workstreamList)
              setLoaded(true)
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
          <b>Workstream Join Requests</b>
        </div>
      </Divider>
      <ScrollPanel style={{ width: "100%", height: "40vh" }}>
        <div className="flex justify-content-start flex-wrap">
          {workstreamList.results.length ? (
            workstreamList.results.map((object) => (
              <InviteCard key={object.id} url='/api/join/' id={object.id} title={object.owner.username} count={object.name} message={'Users :' + object.users.length} icon={object.owner.profile_avatar} display={true}/>
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

export default JoinPage
