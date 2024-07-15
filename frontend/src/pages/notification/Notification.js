import React, { useEffect, useState } from "react";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import { ProgressSpinner } from 'primereact/progressspinner';
import { axiosReq } from "../../api/axiosDefaults";
import EmptyInvite from "./EmptyInvite";
import Invite from "./Invite";

const Notification = () => {
  const [invite, setInvite] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false)
  const [join, setJoin] = useState({ results: [] });
  const [rerun, setRerun] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: invite }, { data: join }] = await Promise.all([
          axiosReq.get(`/api/invite/`),
          axiosReq.get(`/api/join/`),
        ]);
        setInvite(invite);
        setJoin(join);
        setLoaded(true)
        console.log(invite, join);
      } catch (err) {
        setErrors(err.response?.data);
        console.log(errors);
      }
    };
    fetchData();
  }, [rerun]);


  const pageContent = (
    <>
    <Divider align="left">
        <div className="inline-flex align-items-center">
          <i className="pi pi-envelope mr-2"></i>
          <b>Workstream Invites</b>
        </div>
      </Divider>
      <ScrollPanel style={{ width: "100%", height: "40vh" }}>
        <div className="flex justify-content-start flex-wrap">
          {invite.results.length ? (
            <EmptyInvite title='User' count='Invite' message='New' icon='pi pi-user-plus'/>
          )
          : null
          }
          {invite.results.length ? (
            invite.results.map((object) => (
              object.is_owner && <Invite props={object} admin={true}/>
              
            ))
          ) : (
            <EmptyInvite title='Add' count='New' message='Invite' icon='pi pi-user-plus'/>
          )}
          
        </div>
      </ScrollPanel>
      <Divider align="left">
        <div className="inline-flex align-items-center">
          <i className="pi pi-folder mr-2"></i>
          <b>My Join Request</b>
        </div>
      </Divider>
      <ScrollPanel style={{ width: "100%", height: "40vh" }}>
      <div className="flex justify-content-start flex-wrap">
          {join.results.length ? (
            <EmptyInvite title='Workstream' count='Join' message='New' icon='pi pi-send'/>
          )
          : null
          }
          {join.results.length ? (
            join.results.map((object) => (
              object.is_owner && <Invite props={object} admin={false}/>
              
            ))
          ) : (
            <EmptyInvite title='Send' count='New' message='Join' icon='pi pi-send'/>
          )}
        </div>
      </ScrollPanel>
      </>
  )

  return (
    <div className="card">
      {loaded 
      ? pageContent
      : (
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      )
      }
    </div>
  );
};

export default Notification;
