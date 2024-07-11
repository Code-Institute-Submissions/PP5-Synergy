import React, { useEffect, useState, useRef } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Chip } from 'primereact/chip';
import { Message } from 'primereact/message';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import WorkstreamTask from '../../components/WorkstreamTask';
import DialogForm from '../../components/DialogForm';
import { useNavigate } from 'react-router-dom';

const ActiveWorkstream = () => {
    const [workstream , setWorkstream] = useState({results: []})
    const [workstreamID, setWorkstreamID] = useState(0)
    const [workstreamName, setWorkstreamName] = useState('')
    const [category, setCategory] = useState({results: []})
    const [project, setProject] = useState({results: []})
    const [taskO, setTaskO] = useState({results: []})
    const [taskA, setTaskA] = useState({results: []})
    const [visibleCat, setVisibleCat] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [visibleEditCat, setVisibleEditCat] = useState(false);
    const [editCatID, setEditCatID] = useState(0)
    const [visibleEditProj, setVisibleEditProj] = useState(false);
    const [editProjID, setEditProjID] = useState(0)



    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const [inputData, setInputData] = useState({
        name: "",
    });
    const { name } = inputData;

    const [projectData, setProjectData] = useState({
        title: "",
    });
    const { title } = projectData;

    const menuRight = useRef(null);
    const items = [
        {
            label: 'Edit',
            icon: 'pi pi-refresh',
            command: () => {
                setVisibleEdit(true)
                setInputData({name: workstreamName})
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                confirm1()
                setWorkstreamName(workstream.results[0].workstream.name)
            }
        }
    ];

    const newBtn = (
        <>
            <span className="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center pi pi-plus"></span>
            <span className="ml-2 font-medium">New</span>
        </>
    );

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want to proceed?',
            header: 'Delete Workstream:',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
        });
    };

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: workstream }, { data: category }, { data: project }, { data: taskO }, { data: taskA }] = await Promise.all([
              axiosReq.get(`/api/workstream/active/`),
              axiosReq.get(`/api/category/`),
              axiosReq.get(`/api/project/`),
              axiosReq.get(`/api/task/open/`),
              axiosReq.get(`/api/task/assigned/`),
            ]);
            setWorkstream(workstream);
            setWorkstreamID(workstream.results[0].workstream.id)
            setWorkstreamName(workstream.results[0].workstream.name)
            setCategory(category);
            setProject(project);
            setTaskO(taskO);
            setTaskA(taskA)
            console.log(workstream, category, project, taskO, taskA)
          } catch (err) {
            setErrors(err.response?.data);
            console.log(errors)
          }
        };
        handleMount();
    }, []);

    const legendTemplate = (
        <>
        { workstream.results.length ? (
            workstream.results.map((object, idx) => (
                <div key={idx} className="flex align-items-center gap-2 px-2">
                    <span className='pi pi-folder'/>
                    <span className="font-bold">{workstreamName}</span>
                    <Menu model={items} popup ref={menuRight} id="popup_menu"/>
                    { object.workstream.is_owner
                        ? (<Button icon="pi pi-ellipsis-v" text severity="secondary" aria-label="admin workstream menu" size='small' className="p-1" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />)
                        : null
                    }
                </div>
              ))
        ) : null
        }
        </>
    );
    
    return (
        <>
        { workstream.results.length ? (
            workstream.results.map((object, idx) => (
            <Fieldset className='h-screen' key={idx} legend={legendTemplate} pt={{ legend: { className: "bg-surface p-1 text-md" }, content: { className: "p-0" }}}>
                <ScrollPanel className='p-2' style={{ width: '100%', height: '90vh' }}>
                <TabView>
                        <TabPanel header="Participants" pt={{ headerAction: { className: "py-1" }}}>
                        <div className="card flex justify-content-start">
                            <AvatarGroup>
                                {object.workstream.users?.map((user, idx) => (
                                    <Avatar image={user?.profile_avatar} size="large" shape="circle" key={idx}/>
                                ))}
                                { object.workstream.is_owner
                                ? (<Avatar label="+" shape="circle" size="large"/>)
                                : null
                                }
                            </AvatarGroup>
                        </div>
                        </TabPanel>
                    </TabView>
                    <TabView>
                        <TabPanel header="Categories" pt={{ headerAction: { className: "py-1" }}}>
                            <div className="card flex flex-wrap gap-2">
                                { category.results.length ? (
                                    category.results.map((object, idx) => (
                                        object.is_owner
                                        ? (<Chip key={idx} className="pl-0 pr-3" template={
                                        <>
                                            <span className="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center pi pi-pen-to-square"></span>
                                            <span className="ml-2 font-medium">{object.name}</span>
                                        </>
                                        } onClick={() => {setVisibleEditCat(true); setEditCatID(object.id); setInputData({name: object.name})}}/>)
                                        : (<Chip label={object.name} key={idx}/>)
                                        
                                    ))
                                    ) : (
                                    <Message className='py-0 px-1' severity="warn" text="Category Required" />
                                )}
                                { object.is_staff
                                ? (<Chip className="pl-0 pr-3" template={newBtn} onClick={() => {setVisibleCat(true); setInputData({name: ''})}}/>)
                                : null
                                }
                            </div>
                        </TabPanel>
                        <TabPanel header="Projects" pt={{ headerAction: { className: "py-1" }}}>
                            <div className="card flex flex-wrap gap-2">
                                { project.results.length ? (
                                    project.results.map((object, idx) => (
                                        object.is_owner
                                        ? (<Chip key={idx} className="pl-0 pr-3" template={
                                        <>
                                            <span className="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center pi pi-pen-to-square"></span>
                                            <span className="ml-2 font-medium">{object.title}</span>
                                        </>
                                        } onClick={() => {setVisibleEditProj(true); setEditProjID(object.id); setProjectData({title: object.title})}}/>)
                                        : (<Chip label={object.title} key={idx}/>)
                                    ))
                                    ) : (
                                    null
                                )}
                                { object.is_staff
                                ? (<Chip className="pl-0 pr-3" template={newBtn} onClick={() => {setVisible(true); setProjectData({title: ''})}}/>)
                                : null
                                }
                                
                            </div>
                        </TabPanel>
                    </TabView>
                    <TabView pt={{ panelContainer: {className: "py-2"}}}>
                        <TabPanel header="Available Tasks" pt={{ headerAction: { className: "py-1" }}}>
                            <ul className="card flex flex-column flex-wrap gap-2 list-none px-0">
                                { taskO.results.length ? (
                                    taskO.results.map((object) => (
                                        object.owner === null
                                        ? <li className='flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border' key={object.id}><WorkstreamTask {...object}/></li>
                                        : null
                                    ))
                                    ) : (
                                    null
                                )}
                            </ul>
                        </TabPanel>
                        <TabPanel header="Assigned Tasks" pt={{ headerAction: { className: "py-1" }}}>
                            <ul className="card flex flex-column flex-wrap gap-2 list-none px-0">
                                { taskA.results.length ? (
                                    taskA.results.map((object) => (
                                        object.owner !== null
                                        ? <li className='flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border' key={object.id}><WorkstreamTask {...object}/></li>
                                        : null
                                    ))
                                    ) : (
                                    null
                                )}
                            </ul>
                        </TabPanel>
                    </TabView>
                </ScrollPanel>
            </Fieldset>
              ))
        ) : null
        }
        <DialogForm url={`/api/workstream/${workstreamID}/`} title='Edit Workstream' inputData={inputData} setInputData={setInputData} visible={visibleEdit} setVisible={setVisibleEdit} setAttribute={setWorkstreamName} edit={true}/>
        <DialogForm url='/api/category/' title='Create Category' inputData={inputData} setInputData={setInputData} visible={visibleCat} setVisible={setVisibleCat} setAttribute={setCategory} edit={false}/>
        <DialogForm url='/api/project/' title='Create Project' inputData={projectData} setInputData={setProjectData} visible={visible} setVisible={setVisible} setAttribute={setProject} edit={false}/>
        <DialogForm url={`/api/category/${editCatID}/`} title='Edit Category' inputData={inputData} setInputData={setInputData} visible={visibleEditCat} setVisible={setVisibleEditCat} resource={category} setResource={setCategory} edit={true}/>
        <DialogForm url={`/api/project/${editProjID}/`} title='Edit Project' inputData={projectData} setInputData={setProjectData} visible={visibleEditProj} setVisible={setVisibleEditProj} resource={project} setResource={setProject} edit={true}/>
        <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                            <i className="pi pi-exclamation-triangle text-5xl"></i>
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                            {message.header +" "+ workstreamName }
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                            <Button
                                label="Submit"
                                onClick={ async (event) => {
                                    hide(event);
                                    event.preventDefault();
                                    try {
                                        const { data } = await axiosReq.delete(`api/workstream/${workstreamID}/`);
                                    } catch (err) {
                                        setErrors(err.response?.data);
                                    }
                                    navigate('/workstream')
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
}

export default ActiveWorkstream
