import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { AvatarGroup } from 'primereact/avatargroup';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Chip } from 'primereact/chip';
import { Message } from 'primereact/message';
import { ScrollPanel } from 'primereact/scrollpanel';

const ActiveWorkstream = () => {
    const { id }  = useParams()
    const [workstream , setWorkstream] = useState({results: []})
    const [category, setCategory] = useState({results: []})
    const [project, setProject] = useState({results: []})
    const [task, setTask] = useState({results: []})
    const [visibleCat, setVisibleCat] = useState(false);
    const [visible, setVisible] = useState(false);
    const [errors, setErrors] = useState({});

    const [inputData, setInputData] = useState({
        name: "",
    });
    const { name } = inputData;

    const [projectData, setProjectData] = useState({
        title: "",
    });
    const { title } = projectData;

    const handleChange = (event) => {
        {event.target.name === 'name' 
        ? (
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value,
                })
        ) : (
            setProjectData({
                ...projectData,
                [event.target.name]: event.target.value,
                })
        )
        }
        ;
    };

    const newBtn = (
        <>
            <span className="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center pi pi-plus"></span>
            <span className="ml-2 font-medium">New</span>
        </>
    );

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: workstream }, { data: category }, { data: project }, { data: task }] = await Promise.all([
              axiosReq.get(`/api/workstream/${id}`),
              axiosReq.get(`/api/category/`),
              axiosReq.get(`/api/project/`),
              axiosReq.get(`/api/task/`),
            ]);
            setWorkstream({ results: [workstream] });
            setCategory(category);
            setProject(project);
            setTask(task)
            console.log(workstream, category, project, task)
          } catch (err) {
            setErrors(err.response?.data);
            console.log(errors)
          }
        };
    
        handleMount();
    }, [id]);

    const handleCreateCat = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axiosReq.post("/api/category/", inputData);
          setCategory((prevCategory) => ({
            ...prevCategory,
            results: [data, ...prevCategory.results],
          }));
          console.log(data)
        } catch (err) {
            setErrors(err.response?.data);
            console.log('cat error')
            console.log(errors)
        }
        setVisibleCat(false)
    }

    const handleCreateProj = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axiosReq.post("/api/project/", projectData);
          setProject((prevProject) => ({
            ...prevProject,
            results: [data, ...prevProject.results],
          }));
          console.log(data)
        } catch (err) {
            setErrors(err.response?.data);
            console.log('project error')
            console.log(errors)
        }
        setVisible(false)
    }
    
    return (
        <>
        { workstream.results.length ? (
            workstream.results.map((object, idx) => (
            <Fieldset className='h-screen' key={idx} legend={object.name} pt={{ legend: { className: "bg-surface p-1 text-md" }, content: { className: "p-0" }}}>
                <ScrollPanel className='p-2' style={{ width: '100%', height: '90vh' }}>
                <TabView>
                        <TabPanel header="Participants" pt={{ headerAction: { className: "py-1" }}}>
                        <div className="card flex justify-content-start">
                            <AvatarGroup>
                                {object.users?.map((user, idx) => (
                                    <Avatar image={user?.profile_avatar} size="large" shape="circle" key={idx}/>
                                ))}
                                <Avatar label="+" shape="circle" size="large"/>
                            </AvatarGroup>
                        </div>
                        </TabPanel>
                    </TabView>
                    <TabView>
                        <TabPanel header="Categories" pt={{ headerAction: { className: "py-1" }}}>
                            <div className="card flex flex-wrap gap-2">
                                { category.results.length ? (
                                    category.results.map((object, idx) => (
                                        <Chip label={object.name} key={idx}/>
                                    ))
                                    ) : (
                                    <Message className='py-0 px-1' severity="warn" text="Category Required" />
                                )}
                                <Chip className="pl-0 pr-3" template={newBtn} onClick={() => setVisibleCat(true)}/>
                            </div>
                        </TabPanel>
                        <TabPanel header="Projects" pt={{ headerAction: { className: "py-1" }}}>
                            <div className="card flex flex-wrap gap-2">
                                { project.results.length ? (
                                    project.results.map((object, idx) => (
                                        <Chip label={object.title} key={idx}/>
                                    ))
                                    ) : (
                                    null
                                )}
                                <Chip className="pl-0 pr-3" template={newBtn} onClick={() => setVisible(true)}/>
                            </div>
                        </TabPanel>
                    </TabView>
                    <TabView pt={{ panelContainer: {className: "py-2"}}}>
                        <TabPanel header="Available Tasks" pt={{ headerAction: { className: "py-1" }}}>
                            <div className="card flex flex-column flex-wrap gap-2">
                                { task.results.length ? (
                                    task.results.map((object, idx) => (
                                        object.is_completed === false
                                        ? <Chip label={object.name} image={object.owner?.profile_avatar} key={idx}/>
                                        : null
                                    ))
                                    ) : (
                                    null
                                )}
                                <Chip label="Amy Elsner" image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" />
                                <Chip label="Asiya Javayant" image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" />
                                <Chip label="Onyama Limba" image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" />
                                <Chip label="Xuxue Feng" image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" />
                                <Chip label="Amy Elsner" image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" />
                                <Chip label="Asiya Javayant" image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" />
                                <Chip label="Onyama Limba" image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" />
                                <Chip label="Xuxue Feng" image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" />
                            </div>
                        </TabPanel>
                        <TabPanel header="Assigned Tasks" pt={{ headerAction: { className: "py-1" }}}>
                        <div className="card flex flex-column flex-wrap gap-2">
                                { task.results.length ? (
                                    task.results.map((object, idx) => (
                                        object.is_completed === true
                                        ? <Chip label={object.name} image={object.owner?.profile_avatar} key={idx}/>
                                        : null
                                    ))
                                    ) : (
                                    null
                                )}
                                <Chip label="Amy Elsner" image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" />
                                <Chip label="Asiya Javayant" image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" />
                                <Chip label="Onyama Limba" image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" />
                                <Chip label="Xuxue Feng" image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" />
                                <Chip label="Amy Elsner" image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" />
                                <Chip label="Asiya Javayant" image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" />
                                <Chip label="Onyama Limba" image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" />
                                <Chip label="Xuxue Feng" image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png" />
                            </div>
                        </TabPanel>
                    </TabView>
                </ScrollPanel>
            </Fieldset>
              ))
        ) : null
        }
        <Dialog
                visible={visibleCat}
                modal
                onHide={() => {if (!visibleCat) return; setVisibleCat(false); 
                    setInputData({
                    name: ""
                  }); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="name" className="text-primary-50 font-semibold">
                                Category Name
                            </label>
                            <InputText value={name} onChange={handleChange} id="name" label="name" name='name' className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Submit" onClick={handleCreateCat} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
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
                            <label htmlFor="title" className="text-primary-50 font-semibold">
                                Project Title
                            </label>
                            <InputText value={title} onChange={handleChange} id="title" label="title" name='title' className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Submit" onClick={handleCreateProj} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </>
    )
}

export default ActiveWorkstream
