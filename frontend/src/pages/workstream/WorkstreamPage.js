import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Fieldset } from 'primereact/fieldset';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from 'primereact/inputtext';
import { axiosReq } from '../../api/axiosDefaults';
import Workstream from './Workstream';
import WorkstreamList from './WorkstreamList';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../assets/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';

const WorkstreamPage = () => {
    const currentUser = useCurrentUser();
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState({});

    const [workstream , setWorkstream] = useState({ results: [] })
    const [workstreamList , setWorkstreamList] = useState({ results: [] })

    const legendTemplate = (
      <div className="flex align-items-center gap-2 px-2">
          <span className="font-bold">Switchable</span>
          <span className='pi pi-sync text-xl'/>
      </div>
  );

  useEffect(() => {
    const handleMount = async () => {
      try {
          const [{ data: workstreamList },{ data: workstream }] = await Promise.all([
            axiosReq.get(`api/workstream/`),
            axiosReq.get(`api/workstream/active/`),
          ]);
          if(workstream.results.length > 0) {
            setWorkstream({ results: [workstream.results[0]?.workstream] });
          }
          setWorkstreamList(workstreamList);
          setLoaded(true)
      } catch (err) {
      }
    };

    handleMount();
  }, []);

    const [visible, setVisible] = useState(false);
    
    const [inputData, setInputData] = useState({name: ""});
    const { name } = inputData;


    const handleChange = (event) => {
        setInputData({
          ...inputData,
          [event.target.name]: event.target.value,
        });
    };

    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axiosReq.post("/api/workstream/", inputData);
      } catch (err) {
          setErrors(err.response?.data);
      }
      setVisible(false)
      navigate('/workstream/active')
    }

    const btnGroup = (
      <div className={workstream.results.length ? "flex justify-content-center align-items-center gap-2 -my-3" : "flex justify-content-center align-items-center gap-2 -mb-3 mt-1"}>
          <Button icon="pi pi-plus" label={workstream.results.length ? null: 'Create'} rounded severity="primary" aria-label="Create Workstream" onClick={() => setVisible(true)}/>
          <Button icon="pi pi-send" label={workstream.results.length ? null: 'Join'} rounded severity="primary" aria-label="Send Workstream Join request" />
      </div>
    );

    const pageContent = (
      <>
      {workstream.results.length ? (
        workstream.results.map((object, idx) => (
          object !== undefined
          ?
          <Workstream {...object} key={idx}/>
          :
          null
        ))
      ) : (
        null
      )}
      {btnGroup}
      <Fieldset style={{height: "70vh"}} className='mx-2 mt-2 text-sm' legend={legendTemplate} pt={{ legend: { className: "bg-surface p-1 text-md" }, toggler: { className: "p-0" }}}>
        <ScrollPanel style={{ width: '100%', height: '60vh' }}>
          { workstreamList.results.length ? (
            <InfiniteScroll
            children={workstreamList.results.map((ws, idx) => (
              ws.id === workstream.results[0]?.id
              ? null
              : (<WorkstreamList {...ws} key={idx}/>)
            ))}
            dataLength={workstreamList.results.length}
            loader={<Spinner />}
            hasMore={!!workstreamList.next}
            next={() => fetchMoreData(workstreamList, setWorkstreamList)}
            />
          ) : <p>No available workstreams Create or Join another</p>
          }
        </ScrollPanel>
      </Fieldset>
      </>
    )
    
    return (
        <>
        {loaded
        ? pageContent
        : <Spinner />
        }
        <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); 
                    setInputData({
                    name: ""
                  }); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="name" className="text-primary-50 font-semibold">
                                Name
                            </label>
                            <InputText value={name} onChange={handleChange} id="name" label="name" name='name' className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Submit" onClick={handleCreate} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </>
    )
}

export default WorkstreamPage
