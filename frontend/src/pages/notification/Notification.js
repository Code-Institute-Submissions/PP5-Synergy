import React, { useEffect, useRef, useState } from "react";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { axiosReq } from "../../api/axiosDefaults";
import EmptyInvite from "./EmptyInvite";
import Invite from "./Invite";

const Notification = () => {
  const [invite, setInvite] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false)
  const [join, setJoin] = useState({ results: [] });
  const [rerun, setRerun] = useState(false);
  const [errors, setErrors] = useState({});
  const [url, setUrl] = useState('');
  const [id, setID] = useState(null);
  const toast = useRef(null);

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

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "Request has been Deleted",
      life: 3000,
    });
  };

  const confirm1 = (url) => {
    confirmDialog({
      group: "headless",
      message: url,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
    });
  };

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
              object.is_owner && <Invite key={object.id} rerun={rerun} setRerun={setRerun} setUrl={setUrl} confirmDialog={confirm1} props={object} admin={true} setID={setID} url={`api/invite/${object.id}/`}/>
              
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
              object.is_owner && <Invite key={object.id} rerun={rerun} setRerun={setRerun} setUrl={setUrl} confirmDialog={confirm1} props={object} setID={setID} url={`api/join/${object.id}/`} admin={false}/>
              
            ))
          ) : (
            <EmptyInvite title='Send' count='New' message='Join' icon='pi pi-send'/>
          )}
        </div>
      </ScrollPanel>
      <Toast ref={toast} />
      <ConfirmDialog
          group="headless"
          content={({ headerRef, contentRef, footerRef, hide, message }) => (
            <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
              <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                <i className="pi pi-question text-5xl"></i>
              </div>
              <span
                className="font-bold text-2xl block mb-2 mt-4"
                ref={headerRef}
              >
                {message.header}
              </span>
              <p className="mb-0" ref={contentRef}>
                {message.message}
              </p>
              <div
                className="flex align-items-center gap-2 mt-4"
                ref={footerRef}
              >
                <Button
                  label="Delete"
                  onClick={async (event) => {
                    hide(event);
                    event.preventDefault();
                    try {
                      const { data } = await axiosReq.delete(url);
                      let inviteArray = invite.results.filter((item) => item.id !== id);
                      setInvite((prevState) => ({
                        ...prevState,
                        results: inviteArray,
                      }));
                      let joinArray = join.results.filter((item) => item.id !== id);
                      setJoin((prevState) => ({
                        ...prevState,
                        results: joinArray,
                      }));
                    } catch (err) {
                      setErrors(err.response?.data);
                    }
                    accept()
                  }}
                  className="w-8rem"
                ></Button>
                <Button
                  label="Cancel"
                  outlined
                  onClick={(event) => {
                    hide(event);
                  }}
                  className="w-8rem"
                ></Button>
              </div>
            </div>
          )}
        />
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
